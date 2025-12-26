import { useState, useRef } from 'react';
import './MultiFileUpload.css';

const MultiFileUpload = ({ 
  title, 
  description, 
  maxFiles, 
  onFilesSelect, 
  onProcessOCR, 
  isLoading,
  results 
}) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    handleFiles(newFiles);
  };

  const handleFiles = (newFiles) => {
    // Validate file count
    const totalFiles = selectedFiles.length + newFiles.length;
    if (totalFiles > maxFiles) {
      alert(`Maximum ${maxFiles} file(s) allowed. You tried to upload ${totalFiles} files.`);
      return;
    }

    // Validate file types
    const validFiles = newFiles.filter(file => file.type.startsWith('image/'));
    if (validFiles.length !== newFiles.length) {
      alert('Some files were not images and were skipped.');
    }

    if (validFiles.length === 0) return;

    // Create previews
    const newPreviews = [];
    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push({
          file,
          preview: reader.result,
          name: file.name
        });
        
        if (newPreviews.length === validFiles.length) {
          const updatedFiles = [...selectedFiles, ...validFiles];
          const updatedPreviews = [...previews, ...newPreviews];
          setSelectedFiles(updatedFiles);
          setPreviews(updatedPreviews);
          onFilesSelect(updatedFiles);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const newFiles = Array.from(e.dataTransfer.files);
    handleFiles(newFiles);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleRemove = (index) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    const updatedPreviews = previews.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
    setPreviews(updatedPreviews);
    onFilesSelect(updatedFiles);
  };

  const handleRemoveAll = () => {
    setSelectedFiles([]);
    setPreviews([]);
    onFilesSelect([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const canUploadMore = selectedFiles.length < maxFiles;

  return (
    <div className="multi-file-upload-container">
      <div className="upload-header">
        <h3 className="upload-title">{title}</h3>
        <p className="upload-description">{description}</p>
        <div className="file-limit-badge">
          {selectedFiles.length} / {maxFiles} files
        </div>
      </div>

      {previews.length === 0 ? (
        <div
          className="upload-area"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div className="upload-placeholder">
            <div className="upload-icon">📁</div>
            <p className="upload-text">
              Drag and drop {maxFiles === 2 ? 'up to 2' : 'up to 5'} image{maxFiles > 1 ? 's' : ''} here, or{' '}
              <button
                type="button"
                className="browse-button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
              >
                browse
              </button>
            </p>
            <p className="upload-hint">Supports: JPG, PNG, WEBP, etc. (Max {maxFiles} file{maxFiles > 1 ? 's' : ''})</p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="file-input"
            disabled={isLoading || !canUploadMore}
          />
        </div>
      ) : (
        <div className="files-container">
          <div className="files-grid">
            {previews.map((item, index) => (
              <div key={index} className="file-preview-card">
                <img src={item.preview} alt={item.name} className="preview-thumbnail" />
                <div className="file-info">
                  <p className="file-name" title={item.name}>
                    {item.name.length > 20 ? `${item.name.substring(0, 20)}...` : item.name}
                  </p>
                </div>
                <button
                  type="button"
                  className="remove-file-button"
                  onClick={() => handleRemove(index)}
                  disabled={isLoading}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {canUploadMore && (
            <div
              className="add-more-area"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <button
                type="button"
                className="add-more-button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
              >
                + Add More Files ({maxFiles - selectedFiles.length} remaining)
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="file-input"
                disabled={isLoading}
              />
            </div>
          )}

          <div className="files-actions">
            <button
              type="button"
              className="remove-all-button"
              onClick={handleRemoveAll}
              disabled={isLoading}
            >
              Remove All
            </button>
            {onProcessOCR && (
              <button
                type="button"
                className="process-button"
                onClick={() => onProcessOCR(selectedFiles)}
                disabled={isLoading || selectedFiles.length === 0}
              >
                {isLoading ? '⏳ Processing...' : '🔍 Extract Text with OCR'}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiFileUpload;

