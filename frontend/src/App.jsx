import React, { useState, useEffect } from 'react';
import FraudAssessmentModal from './FraudAssessmentModal';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [predictionResult, setPredictionResult] = useState(null);
  const [backendStatus, setBackendStatus] = useState('checking'); // 'connected', 'offline', 'checking'

  const checkBackendHealth = async () => {
    setBackendStatus('checking');
    const apiBase = import.meta.env.VITE_API_BASE_URL || '';
    const healthUrl = apiBase ? `${apiBase}/health` : '/health';

    try {
      let res;
      try {
        res = await fetch(healthUrl);
      } catch {
        // Direct fallback to backend
        res = await fetch('http://127.0.0.1:8000/health');
      }

      if (res.ok) {
        setBackendStatus('connected');
      } else {
        setBackendStatus('offline');
      }
    } catch {
      setBackendStatus('offline');
    }
  };

  useEffect(() => {
    checkBackendHealth();
  }, []);

  const handlePredictionResult = (result) => {
    setPredictionResult(result);
  };

  const getRiskBadgeClass = (pred) => {
    if (pred === 'High Risk') return 'risk-badge risk-high';
    if (pred === 'Medium Risk') return 'risk-badge risk-medium';
    return 'risk-badge risk-low';
  };

  return (
    <div className="app-container">
      <header className="navbar">
        <div className="nav-brand">
          <div className="shield-icon">🛡️</div>
          <div>
            <h1>Sentinel AI</h1>
            <span className="subtitle">Online Fraud Detection Engine</span>
          </div>
        </div>

        <div className="backend-status-indicator">
          <span className={`status-dot ${backendStatus}`}></span>
          <span className="status-label">
            Backend: {backendStatus === 'connected' ? 'Connected (Port 8000)' : backendStatus === 'offline' ? 'Offline (Run backend)' : 'Checking...'}
          </span>
          <button 
            type="button" 
            className="btn-retry" 
            onClick={checkBackendHealth} 
            title="Retry connection"
          >
            ↻
          </button>
        </div>
      </header>

      <main className="main-content">
        <div className="hero-section">
          <div className="hero-text">
            <h2>Real-Time Transaction Risk Evaluation</h2>
            <p>
              Scored using Random Forest ensemble model and automated feature scaling.
            </p>
          </div>
          <button 
            type="button" 
            onClick={() => setIsModalOpen(true)}
            className="btn btn-primary open-modal-btn"
          >
            + New Assessment
          </button>
        </div>

        {predictionResult && (
          <div className="result-card">
            <div className="result-card-header">
              <h3>Latest Assessment Report</h3>
              <span className={getRiskBadgeClass(predictionResult.Prediction)}>
                {predictionResult.Prediction}
              </span>
            </div>

            <div className="result-stats-row">
              <div className="stat-box">
                <span className="stat-label">Risk Category</span>
                <span className="stat-value">{predictionResult.Prediction}</span>
              </div>
              <div className="stat-box">
                <span className="stat-label">Fraud Probability</span>
                <span className="stat-value">{predictionResult.Fraud_probability}%</span>
              </div>
              <div className="stat-box">
                <span className="stat-label">Model Confidence</span>
                <span className="stat-value">
                  {predictionResult.Fraud_probability >= 50
                    ? `${predictionResult.Fraud_probability}% Risk`
                    : `${(100 - predictionResult.Fraud_probability).toFixed(2)}% Safe`}
                </span>
              </div>
            </div>

            <div className="probability-bar-container">
              <div 
                className={`probability-bar ${
                  predictionResult.Prediction === 'High Risk'
                    ? 'bar-high'
                    : predictionResult.Prediction === 'Medium Risk'
                    ? 'bar-medium'
                    : 'bar-low'
                }`}
                style={{ width: `${Math.min(100, Math.max(5, predictionResult.Fraud_probability))}%` }}
              ></div>
            </div>

            {predictionResult['Recommendation_Actions to be taken']?.length > 0 && (
              <div className="recommendations-container">
                <h4>Recommended Security Actions:</h4>
                <ul>
                  {predictionResult['Recommendation_Actions to be taken'].map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <FraudAssessmentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onPredictionResult={handlePredictionResult}
        />
      </main>
    </div>
  );
}

export default App;