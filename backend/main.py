import os
import sys
import pickle
import numpy as np
import pandas as pd
from typing import Literal, Annotated
from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, computed_field

# Compatibility shim for scikit-learn unpickling across versions
try:
    import sklearn.compose._column_transformer as ct
    if not hasattr(ct, '_RemainderColsList'):
        class _RemainderColsList(list):
            pass
        ct._RemainderColsList = _RemainderColsList
except Exception:
    pass

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, 'Model.pkl')
PREPROCESSOR_PATH = os.path.join(BASE_DIR, 'Preprocessor.pkl')

with open(MODEL_PATH, 'rb') as f:
    model = pickle.load(f)

with open(PREPROCESSOR_PATH, 'rb') as file:
    preprocessor = pickle.load(file)

scaler = preprocessor.named_transformers_['scaler']
ohe = preprocessor.named_transformers_['OHE']
num_cols = ['step', 'amount', 'oldbalanceOrg', 'newbalanceOrig', 'newbalanceDest', 'orig_balance_error', 'hour']

app = FastAPI(title='Online Fraud Detection API', version='1.0.0')

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserInput(BaseModel):
    step: Annotated[int, Field(..., ge=1, le=743, description='Unit of time (1 Step = 1 hour)')]
    Type: Annotated[Literal['CASH_IN', 'PAYMENT', 'TRANSFER', 'CASH_OUT', 'DEBIT'], Field(..., description='Type of Online Transaction')]
    Amount: Annotated[float, Field(..., ge=0, description='Amount of the Transaction')]
    OldbalanceOrg: Annotated[float, Field(..., ge=0, description='Balance before the Transaction')]
    NewbalanceOrig: Annotated[float, Field(..., ge=0, description='Balance After the Transaction')]
    NewbalanceDest: Annotated[float, Field(..., ge=0, description='New Balance Recipient After the Transaction')]

    @computed_field
    @property
    def orig_balance_error(self) -> float:
        return self.OldbalanceOrg - self.Amount - self.NewbalanceOrig

    @computed_field
    @property
    def hour(self) -> int:
        return self.step % 24

    @computed_field
    @property
    def Is_night(self) -> int:
        return 1 if 0 <= self.hour <= 5 else 0

    @computed_field
    @property
    def amount(self) -> float:
        return float(np.log1p(self.Amount))

    @computed_field
    @property
    def oldbalanceOrg(self) -> float:
        return float(np.log1p(self.OldbalanceOrg))

    @computed_field
    @property
    def newbalanceOrig(self) -> float:
        return float(np.log1p(self.NewbalanceOrig))

    @computed_field
    @property
    def newbalanceDest(self) -> float:
        return float(np.log1p(self.NewbalanceDest))

def get_recommendations(data: UserInput, output: str):
    recommendations = []

    if output in {"High Risk", "Medium Risk"}:
        if data.Type in {"TRANSFER", "CASH_OUT"} and data.Amount > 0 and data.NewbalanceDest == 0:
            recommendations.append('Review destination account activity.')

        if data.step % 24 in {0, 1, 2, 3, 4, 5}:
            recommendations.append('Transaction occurred during late-night hours. Apply enhanced transaction verification.')

        if data.Amount > 200000:
            recommendations.append('Extremely high transaction amount. Verify the transaction amount with the customer.')

        if data.Type in {"TRANSFER", "CASH_OUT"}:
            recommendations.append('Perform additional verification for this transaction type.')

        if not recommendations:
            recommendations.append('Flag the transaction for manual review.')

    else:
        recommendations.append('Transaction appears low risk, continue normal transaction monitoring.')

    return recommendations

@app.get('/')
@app.get('/health')
def health_check():
    return {
        "status": "healthy",
        "service": "Online Fraud Detection API",
        "version": "1.0.0"
    }

@app.post('/predict')
def predict(data: UserInput):
    try:
        df = pd.DataFrame([{
            'step': data.step,
            'type': data.Type,
            'amount': data.amount,
            'oldbalanceOrg': data.oldbalanceOrg,
            'newbalanceOrig': data.newbalanceOrig,
            'newbalanceDest': data.newbalanceDest,
            'orig_balance_error': data.orig_balance_error,
            'hour': data.hour,
            'Is_night': data.Is_night
        }])

        scaled = scaler.transform(df[num_cols])
        encoded = ohe.transform(df[['type']])
        remainder = df[['Is_night']].values

        features = np.hstack([scaled, encoded, remainder])
        feature_df = pd.DataFrame(features, columns=model.feature_names_in_)

        prediction = float(model.predict_proba(feature_df)[0][1])
        fraud_probability = round(prediction * 100, 2)

        output = 'High Risk' if prediction >= 0.70 else 'Medium Risk' if 0.40 <= prediction < 0.70 else 'Low Risk'
        recommendations = get_recommendations(data, output)

        result = {
            "Prediction": output,
            "Fraud_probability": fraud_probability,
            "Recommendation_Actions to be taken": recommendations
        }

        return JSONResponse(status_code=200, content=result)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

if __name__ == '__main__':
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
