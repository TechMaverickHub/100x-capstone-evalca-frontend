import './ClassifiedResult.css';

const ClassifiedResult = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="classified-result-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Classifying text into question and answer...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="classified-result-container">
      <div className="classified-header">
        <h3 className="section-title">📋 Question & Answer</h3>
        <p className="section-subtitle">Text has been classified into question and answer</p>
      </div>
      <div className="result-grid">
        <div className="result-card question-card">
          <div className="card-header">
            <span className="card-icon">❓</span>
            <h4 className="card-title">Question</h4>
          </div>
          <div className="card-content">
            <p className="result-text">{data.question || 'No question found'}</p>
          </div>
        </div>
        <div className="result-card answer-card">
          <div className="card-header">
            <span className="card-icon">💡</span>
            <h4 className="card-title">Answer</h4>
          </div>
          <div className="card-content">
            <p className="result-text">{data.answer || 'No answer found'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassifiedResult;

