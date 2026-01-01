import './EvaluationResult.css';

const EvaluationResult = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="evaluation-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Evaluating your answer...</p>
        </div>
      </div>
    );
  }

  if (!data || !data.data) {
    return null;
  }

  const evaluationData = data.data;

  // Calculate percentage
  const percentage = evaluationData.total_marks > 0
    ? ((evaluationData.marks_awarded / evaluationData.total_marks) * 100).toFixed(1)
    : 0;

  // Get verdict color class
  const getVerdictClass = (verdict) => {
    const verdictLower = verdict?.toLowerCase() || '';
    if (verdictLower.includes('excellent') || verdictLower.includes('outstanding')) {
      return 'verdict-excellent';
    } else if (verdictLower.includes('good') || verdictLower.includes('very good')) {
      return 'verdict-good';
    } else if (verdictLower.includes('average') || verdictLower.includes('satisfactory')) {
      return 'verdict-average';
    } else {
      return 'verdict-poor';
    }
  };

  return (
    <div className="evaluation-container">
      <div className="evaluation-header">
        <h3 className="evaluation-title">📊 Evaluation Results</h3>
      </div>

      {/* Score Summary */}
      <div className="score-summary">
        <div className="score-card">
          <div className="score-label">Marks Awarded</div>
          <div className="score-value">
            {evaluationData.marks_awarded} / {evaluationData.total_marks}
          </div>
          <div className="score-percentage">{percentage}%</div>
        </div>
        <div className={`verdict-badge ${getVerdictClass(evaluationData.verdict)}`}>
          <span className="verdict-label">Verdict</span>
          <span className="verdict-value">{evaluationData.verdict}</span>
        </div>
      </div>

      {/* Conceptual Accuracy */}
      {evaluationData.conceptual_accuracy && (
        <div className="evaluation-section">
          <h4 className="section-title">
            <span className="section-icon">🎯</span>
            Conceptual Accuracy
          </h4>
          <div className="section-content">
            <p>{evaluationData.conceptual_accuracy}</p>
          </div>
        </div>
      )}

      {/* Key Points Covered */}
      {evaluationData.key_points_covered && evaluationData.key_points_covered.length > 0 && (
        <div className="evaluation-section">
          <h4 className="section-title">
            <span className="section-icon">✅</span>
            Key Points Covered
          </h4>
          <div className="section-content">
            <ul className="points-list">
              {evaluationData.key_points_covered.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Missing or Incorrect Points */}
      {evaluationData.missing_or_incorrect_points && 
       evaluationData.missing_or_incorrect_points.length > 0 && (
        <div className="evaluation-section">
          <h4 className="section-title">
            <span className="section-icon">⚠️</span>
            Missing or Incorrect Points
          </h4>
          <div className="section-content">
            <ul className="points-list missing-points">
              {evaluationData.missing_or_incorrect_points.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Presentation Feedback */}
      {evaluationData.presentation_feedback && (
        <div className="evaluation-section">
          <h4 className="section-title">
            <span className="section-icon">📝</span>
            Presentation Feedback
          </h4>
          <div className="section-content">
            <p>{evaluationData.presentation_feedback}</p>
          </div>
        </div>
      )}

      {/* Examiner Remarks */}
      {evaluationData.examiner_remarks && (
        <div className="evaluation-section">
          <h4 className="section-title">
            <span className="section-icon">💬</span>
            Examiner Remarks
          </h4>
          <div className="section-content">
            <p className="examiner-remarks">{evaluationData.examiner_remarks}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EvaluationResult;





