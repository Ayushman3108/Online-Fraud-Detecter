import React, { useState } from 'react';

const FraudAssessmentModal = ({ isOpen, onClose, onPredictionResult }) => {
  const initialFormState = {
    step: 1,
    Type: 'TRANSFER',
    Amount: '',
    OldbalanceOrg: '',
    NewbalanceOrig: '',
    NewbalanceDest: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [localResult, setLocalResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleClear = () => {
    setFormData(initialFormState);
    setError(null);
    setLocalResult(null);
  };

  const loadSample = (type) => {
    if (type === 'high_risk') {
      setFormData({
        step: 2,
        Type: 'TRANSFER',
        Amount: '250000',
        OldbalanceOrg: '250000',
        NewbalanceOrig: '0',
        NewbalanceDest: '0'
      });
    } else {
      setFormData({
        step: 14,
        Type: 'PAYMENT',
        Amount: '85.50',
        OldbalanceOrg: '2400.00',
        NewbalanceOrig: '2314.50',
        NewbalanceDest: '0'
      });
    }
    setError(null);
    setLocalResult(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setLocalResult(null);

    const payload = {
      step: parseInt(formData.step, 10) || 1,
      Type: formData.Type,
      Amount: parseFloat(formData.Amount) || 0.0,
      OldbalanceOrg: parseFloat(formData.OldbalanceOrg) || 0.0,
      NewbalanceOrig: parseFloat(formData.NewbalanceOrig) || 0.0,
      NewbalanceDest: parseFloat(formData.NewbalanceDest) || 0.0
    };

    const apiBase = import.meta.env.VITE_API_BASE_URL || '';
    const primaryUrl = apiBase ? `${apiBase}/predict` : '/predict';

    try {
      let response;
      try {
        response = await fetch(primaryUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      } catch (networkErr) {
        // If primary URL failed (e.g. CORS or host unreachable), try direct 127.0.0.1:8000 fallback
        if (primaryUrl !== 'http://127.0.0.1:8000/predict') {
          response = await fetch("http://127.0.0.1:8000/predict", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });
        } else {
          throw networkErr;
        }
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const detailMsg = errorData?.detail || `Server status: ${response.status} ${response.statusText}`;
        throw new Error(detailMsg);
      }

      const result = await response.json();
      setLocalResult(result);

      if (onPredictionResult) {
        onPredictionResult(result);
      }
    } catch (err) {
      console.error("Prediction error:", err);
      setError(err.message || "Failed to reach backend server. Please verify FastAPI is running at http://127.0.0.1:8000");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const getRiskClass = (prediction) => {
    if (prediction === 'High Risk') return 'risk-badge risk-high';
    if (prediction === 'Medium Risk') return 'risk-badge risk-medium';
    return 'risk-badge risk-low';
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <div className="modal-header-bar">
          <div>
            <h3>Evaluate Transaction Risk</h3>
            <p className="subtitle">Enter transaction details for machine learning fraud assessment.</p>
          </div>
          <button type="button" className="close-x-btn" onClick={onClose} aria-label="Close">
            &times;
          </button>
        </div>

        <div className="preset-buttons">
          <span>Quick fill:</span>
          <button type="button" className="sample-pill" onClick={() => loadSample('high_risk')}>
            High Risk Sample
          </button>
          <button type="button" className="sample-pill" onClick={() => loadSample('low_risk')}>
            Low Risk Sample
          </button>
        </div>

        {error && (
          <div className="alert-box alert-error">
            <strong>Connection Error:</strong> {error}
          </div>
        )}

        {localResult && (
          <div className="result-display-panel">
            <div className="result-header">
              <div>
                <span className="result-title">Model Assessment:</span>
                <span className={getRiskClass(localResult.Prediction)}>
                  {localResult.Prediction}
                </span>
              </div>
              <div className="risk-score">
                Fraud Probability: <strong>{localResult.Fraud_probability}%</strong>
              </div>
            </div>

            {localResult['Recommendation_Actions to be taken']?.length > 0 && (
              <div className="recommendations-box">
                <span className="rec-title">Recommended Actions:</span>
                <ul>
                  {localResult['Recommendation_Actions to be taken'].map((rec, idx) => (
                    <li key={idx}>{rec}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="assessment-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="step">Time Step (Hour: 1 - 743)</label>
              <input
                id="step"
                type="number"
                name="step"
                min="1"
                max="743"
                value={formData.step}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="Type">Transaction Type</label>
              <select
                id="Type"
                name="Type"
                value={formData.Type}
                onChange={handleChange}
                required
              >
                <option value="TRANSFER">TRANSFER</option>
                <option value="CASH_OUT">CASH_OUT</option>
                <option value="PAYMENT">PAYMENT</option>
                <option value="CASH_IN">CASH_IN</option>
                <option value="DEBIT">DEBIT</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="Amount">Transaction Amount ($)</label>
              <input
                id="Amount"
                type="number"
                step="any"
                min="0"
                name="Amount"
                placeholder="e.g. 150000"
                value={formData.Amount}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="OldbalanceOrg">Origin Initial Balance ($)</label>
              <input
                id="OldbalanceOrg"
                type="number"
                step="any"
                min="0"
                name="OldbalanceOrg"
                placeholder="e.g. 150000"
                value={formData.OldbalanceOrg}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="NewbalanceOrig">Origin New Balance ($)</label>
              <input
                id="NewbalanceOrig"
                type="number"
                step="any"
                min="0"
                name="NewbalanceOrig"
                placeholder="e.g. 0"
                value={formData.NewbalanceOrig}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="NewbalanceDest">Recipient New Balance ($)</label>
              <input
                id="NewbalanceDest"
                type="number"
                step="any"
                min="0"
                name="NewbalanceDest"
                placeholder="e.g. 0"
                value={formData.NewbalanceDest}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" onClick={handleClear} className="btn btn-secondary">
              Clear
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Analyzing..." : "Analyze Transaction"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FraudAssessmentModal;