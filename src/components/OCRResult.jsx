import './OCRResult.css';

const OCRResult = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="ocr-result-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Processing image with OCR...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="ocr-result-container">
      <h3 className="section-title">OCR Result</h3>
      <div className="confidence-badge">
        Confidence: {(data.confidence * 100).toFixed(1)}%
      </div>
      <div className="text-content">
        <pre className="extracted-text">{data.text}</pre>
      </div>
    </div>
  );
};

export default OCRResult;


