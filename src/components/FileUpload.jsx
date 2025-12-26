import { useState, useRef } from 'react';
import './FileUpload.css';

const FileUpload = ({ onFileSelect, selectedFile, isLoading, onCropClick, onProcessOCR }) => {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);

      onFileSelect(file, reader.result);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      onFileSelect(file, reader.result);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleRemove = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onFileSelect(null, null);
  };

  return (
    <div className="file-upload-container">
      <div
        className={`file-upload-area ${preview ? 'has-file' : ''} ${isLoading ? 'loading' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {preview ? (
          <div className="preview-container">
            <img src={preview} alt="Preview" className="preview-image" />
            <div className="preview-actions">
              <button
                type="button"
                className="crop-button-preview"
                onClick={onCropClick}
                disabled={isLoading}
              >
                ✂️ Crop Image
              </button>
              <button
                type="button"
                className="remove-button"
                onClick={handleRemove}
                disabled={isLoading}
              >
                Remove
              </button>
            </div>
            {onProcessOCR && (
              <div className="ocr-action-section">
                <button
                  type="button"
                  className="extract-text-button"
                  onClick={onProcessOCR}
                  disabled={isLoading}
                >
                  {isLoading ? '⏳ Processing...' : '🔍 Extract Text with OCR'}
                </button>
                <p className="ocr-hint-text">Click to extract text from the image</p>
              </div>
            )}
          </div>
        ) : (
          <div className="upload-placeholder">
            <div className="upload-icon">📷</div>
            <p className="upload-text">
              Drag and drop an image here, or{' '}
              <button
                type="button"
                className="browse-button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
              >
                browse
              </button>
            </p>
            <p className="upload-hint">Supports: JPG, PNG, WEBP, etc.</p>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="file-input"
          disabled={isLoading}
        />
      </div>
    </div>
  );
};

export default FileUpload;

