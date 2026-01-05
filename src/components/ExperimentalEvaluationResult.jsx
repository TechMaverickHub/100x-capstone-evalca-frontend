import './ExperimentalEvaluationResult.css';

const ExperimentalEvaluationResult = ({ data, isLoading }) => {
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
        <h3 className="evaluation-title">📊 Experimental Evaluation Results</h3>
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

      {/* Marking Breakdown */}
      {evaluationData.marking_breakdown && evaluationData.marking_breakdown.length > 0 && (
        <div className="evaluation-section marking-breakdown-section">
          <h4 className="section-title">
            <span className="section-icon">📋</span>
            Marking Breakdown
          </h4>
          <div className="section-content">
            {/* Reference Legend */}
            <div className="breakdown-reference">
              <h5 className="reference-title">Reference:</h5>
              <div className="reference-items">
                <div className="reference-item">
                  <span className="reference-notation">0 / 0</span>
                  <span className="reference-arrow">→</span>
                  <span className="reference-meaning">Irrelevant (No Match)</span>
                </div>
                <div className="reference-item">
                  <span className="reference-notation">0 / X</span>
                  <span className="reference-arrow">→</span>
                  <span className="reference-meaning">Relevant but not awarded marks</span>
                </div>
                <div className="reference-item">
                  <span className="reference-notation">Status</span>
                  <span className="reference-arrow">→</span>
                  <span className="reference-meaning">
                    <span className="status-indicator attempted">Attempted</span> | 
                    <span className="status-indicator not-awarded"> Not Awarded</span> | 
                    <span className="status-indicator not-attempted"> Not Attempted</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="breakdown-list">
              {evaluationData.marking_breakdown.map((item, index) => {
                const isNoMatch = item.scheme_point === 'no_match';
                const isNotAttempted = item.status === 'not_attempted';
                const isAttemptedButNotAwarded = item.status === 'attempted_but_not_awarded';
                const isAttempted = item.status === 'attempted';
                
                // Get status badge class
                const getStatusClass = () => {
                  if (isNoMatch || isAttemptedButNotAwarded) return 'status-not-awarded';
                  if (isNotAttempted) return 'status-not-attempted';
                  if (isAttempted) return 'status-attempted';
                  return '';
                };

                // Get status text
                const getStatusText = () => {
                  if (isNoMatch) return 'No Match';
                  if (isNotAttempted) return 'Not Attempted';
                  if (isAttemptedButNotAwarded) return 'Not Awarded';
                  if (isAttempted) return 'Attempted';
                  return '';
                };

                return (
                  <div key={index} className={`breakdown-item ${getStatusClass()}`}>
                    <div className="breakdown-header">
                      <div className="breakdown-point-info">
                        <span className={`breakdown-point-code ${isNoMatch ? 'no-match' : ''}`}>
                          {isNoMatch ? 'No Match' : (item.scheme_point || item.point_code || `Point ${index + 1}`)}
                        </span>
                        {item.status && (
                          <span className={`status-badge ${getStatusClass()}`}>
                            {getStatusText()}
                          </span>
                        )}
                      </div>
                      <span className={`breakdown-marks ${isNotAttempted ? 'marks-not-attempted' : ''}`}>
                        {item.marks_awarded} / {item.max_marks}
                      </span>
                    </div>
                    {item.student_point ? (
                      <p className="breakdown-student-point">{item.student_point}</p>
                    ) : isNotAttempted ? (
                      <p className="breakdown-student-point not-attempted-text">
                        This point was not addressed in the answer.
                      </p>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

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
      {evaluationData.key_points_covered && (
        <div className="evaluation-section">
          <h4 className="section-title">
            <span className="section-icon">✅</span>
            Key Points Covered
          </h4>
          <div className="section-content">
            {typeof evaluationData.key_points_covered === 'string' ? (
              <p>{evaluationData.key_points_covered}</p>
            ) : (
              <ul className="points-list">
                {evaluationData.key_points_covered.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* Missing or Incorrect Points */}
      {evaluationData.missing_or_incorrect_points && (
        <div className="evaluation-section">
          <h4 className="section-title">
            <span className="section-icon">⚠️</span>
            Missing or Incorrect Points
          </h4>
          <div className="section-content">
            {Array.isArray(evaluationData.missing_or_incorrect_points) ? (
              <ul className="points-list missing-points">
                {evaluationData.missing_or_incorrect_points.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            ) : (
              <p className="missing-points-text">{evaluationData.missing_or_incorrect_points}</p>
            )}
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

export default ExperimentalEvaluationResult;

