import './OCRResultsDisplay.css';

const OCRResultsDisplay = ({ data, isLoading, type }) => {
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
          <h4 className="subsection-title">Combined Text</h4>
          <div className="combined-text-content">
            <pre className="extracted-text">{data.combined_text}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default OCRResultsDisplay;

