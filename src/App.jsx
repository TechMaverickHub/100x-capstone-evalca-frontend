import { useState } from 'react';
import MultiFileUpload from './components/MultiFileUpload';
import OCRResultsDisplay from './components/OCRResultsDisplay';
import { performQuestionOCR, performAnswerOCR } from './services/api';
import './App.css';

function App() {
  // Step navigation state
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 2;

  // Question state
  const [questionFiles, setQuestionFiles] = useState([]);
  const [questionOCRData, setQuestionOCRData] = useState(null);
  const [isQuestionLoading, setIsQuestionLoading] = useState(false);

  // Answer state
  const [answerFiles, setAnswerFiles] = useState([]);
  const [answerOCRData, setAnswerOCRData] = useState(null);
  const [isAnswerLoading, setIsAnswerLoading] = useState(false);

  const [error, setError] = useState(null);

  // Handle question file selection
  const handleQuestionFilesSelect = (files) => {
    setQuestionFiles(files);
    if (files.length === 0) {
      setQuestionOCRData(null);
    }
  };

  // Handle answer file selection
  const handleAnswerFilesSelect = (files) => {
    setAnswerFiles(files);
    if (files.length === 0) {
      setAnswerOCRData(null);
    }
  };

  // Process question OCR
  const handleQuestionOCR = async (files) => {
    if (files.length === 0) {
      setError('Please select at least one file');
      return;
    }

    if (files.length > 2) {
      setError('Maximum 2 files allowed for questions');
      return;
    }

    try {
      setIsQuestionLoading(true);
      setError(null);
      setQuestionOCRData(null);

      const response = await performQuestionOCR(files);
      
      if (response.status_code === 200 && response.data) {
        setQuestionOCRData(response.data);
      } else {
        throw new Error('Question OCR failed: Invalid response format');
      }
    } catch (err) {
      console.error('Question OCR Error:', err);
      const errorMessage = err.response?.data?.data?.detail || 
                          err.response?.data?.message || 
                          err.message || 
                          'Failed to process question images. Please check if the backend server is running at http://localhost:8000';
      setError(errorMessage);
    } finally {
      setIsQuestionLoading(false);
    }
  };

  // Process answer OCR
  const handleAnswerOCR = async (files) => {
    if (files.length === 0) {
      setError('Please select at least one file');
      return;
    }

    if (files.length > 5) {
      setError('Maximum 5 files allowed for answers');
      return;
    }

    try {
      setIsAnswerLoading(true);
      setError(null);
      setAnswerOCRData(null);

      const response = await performAnswerOCR(files);
      
      if (response.status_code === 200 && response.data) {
        setAnswerOCRData(response.data);
      } else {
        throw new Error('Answer OCR failed: Invalid response format');
      }
    } catch (err) {
      console.error('Answer OCR Error:', err);
      const errorMessage = err.response?.data?.data?.detail || 
                          err.response?.data?.message || 
                          err.message || 
                          'Failed to process answer images. Please check if the backend server is running at http://localhost:8000';
      setError(errorMessage);
    } finally {
      setIsAnswerLoading(false);
    }
  };

  // Navigation handlers
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      setError(null);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setError(null);
    }
  };

  return (
    <div className="app">
      <div className="app-container">
        <header className="app-header">
          <h1 className="app-title">EvalCA</h1>
          <p className="app-subtitle">AI-Powered CA Learning Platform</p>
        </header>

        {/* Step Indicator */}
        <div className="step-indicator">
          <div className="step-indicator-container">
            {[1, 2].map((step) => (
              <div key={step} className="step-indicator-item">
                <div
                  className={`step-circle ${currentStep === step ? 'active' : ''} ${currentStep > step ? 'completed' : ''}`}
                >
                  {currentStep > step ? '✓' : step}
                </div>
                <div className={`step-label ${currentStep === step ? 'active' : ''}`}>
                  {step === 1 ? 'Question' : 'Answer'}
                </div>
                {step < totalSteps && (
                  <div className={`step-connector ${currentStep > step ? 'completed' : ''}`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <main className="app-main">
          {/* Step 1: Question Section */}
          {currentStep === 1 && (
            <section className="upload-section question-section">
              <div className="section-divider">
                <div className="section-number">1</div>
                <div className="section-line"></div>
              </div>
              <MultiFileUpload
                title="📝 Upload Question Images"
                description="Upload handwritten question images (Maximum 2 files)"
                maxFiles={2}
                onFilesSelect={handleQuestionFilesSelect}
                onProcessOCR={handleQuestionOCR}
                isLoading={isQuestionLoading}
              />
              {questionOCRData && (
                <OCRResultsDisplay
                  data={questionOCRData}
                  isLoading={isQuestionLoading}
                  type="Question"
                />
              )}
            </section>
          )}

          {/* Step 2: Answer Section */}
          {currentStep === 2 && (
            <section className="upload-section answer-section">
              <div className="section-divider">
                <div className="section-number">2</div>
                <div className="section-line"></div>
              </div>
              <MultiFileUpload
                title="💡 Upload Answer Images"
                description="Upload handwritten answer images (Maximum 5 files)"
                maxFiles={5}
                onFilesSelect={handleAnswerFilesSelect}
                onProcessOCR={handleAnswerOCR}
                isLoading={isAnswerLoading}
              />
              {answerOCRData && (
                <OCRResultsDisplay
                  data={answerOCRData}
                  isLoading={isAnswerLoading}
                  type="Answer"
                />
              )}
            </section>
          )}

          {/* Error Display */}
          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              <p>{error}</p>
              <button
                type="button"
                className="error-close-button"
                onClick={() => setError(null)}
              >
                ✕
              </button>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="step-navigation">
            <button
              type="button"
              className="nav-button prev-button"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              ← Previous
            </button>
            <button
              type="button"
              className="nav-button next-button"
              onClick={handleNext}
              disabled={currentStep === totalSteps}
            >
              Next →
            </button>
          </div>
        </main>

        <footer className="app-footer">
          <p>© 2024 EvalCA. AI-Powered Learning Platform for CA Students.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
