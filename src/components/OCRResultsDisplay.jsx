import { useState, useEffect } from 'react';
import './OCRResultsDisplay.css';

const OCRResultsDisplay = ({ data, isLoading, type, editedText, onTextChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localText, setLocalText] = useState('');

  // Get the current combined text (edited or original from response)
  // Priority: editedText > data.combined_text > empty string
  const combinedText = editedText !== undefined && editedText !== null 
    ? editedText 
    : (data?.combined_text || '');

  // Sync localText with combinedText when not editing or when data changes
  useEffect(() => {
    if (!isEditing) {
      setLocalText(combinedText);
    }
  }, [combinedText, isEditing]);

  if (isLoading) {
    return (
      <div className="ocr-results-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Processing {type} with OCR...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const handleEdit = () => {
    setIsEditing(true);
    setLocalText(combinedText);
  };

  const handleSave = () => {
    if (onTextChange) {
      onTextChange(localText);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setLocalText(combinedText);
    setIsEditing(false);
  };

  return (
    <div className="ocr-results-container">
      <div className="results-header">
        <h3 className="results-title">{type} OCR Results</h3>
        <div className="results-stats">
          <span className="stat-item">
            📄 {data.total_files || 0} file{data.total_files !== 1 ? 's' : ''}
          </span>
          {data.average_confidence && (
            <span className="stat-item">
              ✓ {(data.average_confidence * 100).toFixed(1)}% confidence
            </span>
          )}
        </div>
      </div>

      {data.individual_results && data.individual_results.length > 0 && (
        <div className="individual-results">
          <h4 className="subsection-title">Individual File Results</h4>
          <div className="results-list">
            {data.individual_results.map((result, index) => (
              <div key={index} className="result-item">
                <div className="result-item-header">
                  <span className="file-name-badge">{result.filename}</span>
                  {result.confidence && (
                    <span className="confidence-badge">
                      {(result.confidence * 100).toFixed(1)}%
                    </span>
                  )}
                </div>
                <div className="result-text-content">
                  <pre className="extracted-text">{result.text}</pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.combined_text && (
        <div className="combined-result">
          <div className="combined-result-header">
            <h4 className="subsection-title">Combined Text</h4>
            {!isEditing ? (
              <button
                type="button"
                className="edit-text-button"
                onClick={handleEdit}
                title="Edit combined text"
              >
                ✏️ Edit
              </button>
            ) : (
              <div className="edit-actions">
                <button
                  type="button"
                  className="save-text-button"
                  onClick={handleSave}
                  title="Save changes"
                >
                  💾 Save
                </button>
                <button
                  type="button"
                  className="cancel-text-button"
                  onClick={handleCancel}
                  title="Cancel editing"
                >
                  ✕ Cancel
                </button>
              </div>
            )}
          </div>
          <div className="combined-text-content">
            {isEditing ? (
              <textarea
                className="editable-text"
                value={localText}
                onChange={(e) => setLocalText(e.target.value)}
                placeholder="Enter or edit the combined text..."
              />
            ) : (
              <pre className="extracted-text">{combinedText}</pre>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OCRResultsDisplay;

