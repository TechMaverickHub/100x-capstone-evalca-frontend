import { useState } from 'react';
import MultiFileUpload from '../components/MultiFileUpload';
import OCRResultsDisplay from '../components/OCRResultsDisplay';
import EvaluationResult from '../components/EvaluationResult';
import ExperimentalEvaluationResult from '../components/ExperimentalEvaluationResult';
import DirectTextInput from '../components/DirectTextInput';
import MarkingSchemeModal from '../components/MarkingSchemeModal';
import { performQuestionOCR, performAnswerOCR, evaluateAnswer, evaluateAnswerExperimental } from '../services/api';
import { useAuth } from '../context/AuthContext';
import '../App.css';

function TeacherDashboard() {
  // Input mode: 'upload' or 'type'
  const [inputMode, setInputMode] = useState('upload');

  // Step navigation state
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  // Question state
  const [questionFiles, setQuestionFiles] = useState([]);
  const [questionOCRData, setQuestionOCRData] = useState(null);
  const [isQuestionLoading, setIsQuestionLoading] = useState(false);
  const [editedQuestionText, setEditedQuestionText] = useState(null);
  const [directQuestionText, setDirectQuestionText] = useState('');

  // Answer state
  const [answerFiles, setAnswerFiles] = useState([]);
  const [answerOCRData, setAnswerOCRData] = useState(null);
  const [isAnswerLoading, setIsAnswerLoading] = useState(false);
  const [editedAnswerText, setEditedAnswerText] = useState(null);
  const [directAnswerText, setDirectAnswerText] = useState('');

  // Evaluation state
  const [evaluationData, setEvaluationData] = useState(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [experimentalEvaluationData, setExperimentalEvaluationData] = useState(null);
  const [isExperimentalEvaluating, setIsExperimentalEvaluating] = useState(false);
  const [showMarkingSchemeModal, setShowMarkingSchemeModal] = useState(false);

  const [error, setError] = useState(null);
  const { user, logout } = useAuth();

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
        // Prefill with combined text from response, but keep it editable
        setEditedQuestionText(response.data.combined_text || null);
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
        // Prefill with combined text from response, but keep it editable
        setEditedAnswerText(response.data.combined_text || null);
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

  // Handle mode change
  const handleModeChange = (mode) => {
    setInputMode(mode);
    // Reset states when switching modes
    setCurrentStep(1);
    setError(null);
    setEvaluationData(null);
    setExperimentalEvaluationData(null);
    if (mode === 'type') {
      setDirectQuestionText('');
      setDirectAnswerText('');
    } else {
      setQuestionFiles([]);
      setAnswerFiles([]);
      setQuestionOCRData(null);
      setAnswerOCRData(null);
      setEditedQuestionText(null);
      setEditedAnswerText(null);
    }
  };

  // Handle experimental evaluation
  const handleExperimentalEvaluate = async (markingSchemeData) => {
    let questionText = '';
    let answerText = '';

    if (inputMode === 'type') {
      questionText = directQuestionText.trim();
      answerText = directAnswerText.trim();
    } else {
      questionText = editedQuestionText !== null && editedQuestionText !== undefined
        ? editedQuestionText
        : (questionOCRData?.combined_text || '');
      
      answerText = editedAnswerText !== null && editedAnswerText !== undefined
        ? editedAnswerText
        : (answerOCRData?.combined_text || '');
    }

    if (!questionText.trim()) {
      setError('Please provide a question before evaluating.');
      setShowMarkingSchemeModal(false);
      return;
    }

    if (!answerText.trim()) {
      setError('Please provide an answer before evaluating.');
      setShowMarkingSchemeModal(false);
      return;
    }

    try {
      setIsExperimentalEvaluating(true);
      setError(null);
      setExperimentalEvaluationData(null);
      setEvaluationData(null); // Clear standard evaluation data when running experimental evaluation
      setShowMarkingSchemeModal(false);

      const response = await evaluateAnswerExperimental(
        questionText,
        answerText,
        markingSchemeData.totalMarks,
        markingSchemeData.markingScheme
      );
      
      if (response.status_code === 200 && response.data) {
        setExperimentalEvaluationData(response);
        setCurrentStep(3); // Navigate to evaluation step
      } else {
        throw new Error('Experimental evaluation failed: Invalid response format');
      }
    } catch (err) {
      console.error('Experimental Evaluation Error:', err);
      const errorMessage = err.response?.data?.data?.detail || 
                          err.response?.data?.message || 
                          err.message || 
                          'Failed to evaluate answer. Please check if the backend server is running at http://localhost:8000';
      setError(errorMessage);
    } finally {
      setIsExperimentalEvaluating(false);
    }
  };

  // Handle evaluation
  const handleEvaluate = async () => {
    let questionText = '';
    let answerText = '';

    if (inputMode === 'type') {
      // Direct text input mode
      questionText = directQuestionText.trim();
      answerText = directAnswerText.trim();
    } else {
      // Upload/OCR mode - Get the current question and answer text (edited or original)
      questionText = editedQuestionText !== null && editedQuestionText !== undefined
        ? editedQuestionText
        : (questionOCRData?.combined_text || '');
      
      answerText = editedAnswerText !== null && editedAnswerText !== undefined
        ? editedAnswerText
        : (answerOCRData?.combined_text || '');
    }

    if (!questionText.trim()) {
      setError('Please provide a question before evaluating.');
      return;
    }

    if (!answerText.trim()) {
      setError('Please provide an answer before evaluating.');
      return;
    }

    try {
      setIsEvaluating(true);
      setError(null);
      setEvaluationData(null);
      setExperimentalEvaluationData(null); // Clear experimental data when running standard evaluation

      const response = await evaluateAnswer(questionText, answerText);
      
      if (response.status_code === 200 && response.data) {
        setEvaluationData(response);
        setCurrentStep(3); // Navigate to evaluation step
      } else {
        throw new Error('Evaluation failed: Invalid response format');
      }
    } catch (err) {
      console.error('Evaluation Error:', err);
      const errorMessage = err.response?.data?.data?.detail || 
                          err.response?.data?.message || 
                          err.message || 
                          'Failed to evaluate answer. Please check if the backend server is running at http://localhost:8000';
      setError(errorMessage);
    } finally {
      setIsEvaluating(false);
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
          <div className="header-content">
            <div>
              <h1 className="app-title">Lekha</h1>
              <p className="app-subtitle">AI-Powered CA Learning Platform</p>
            </div>
            <div className="header-actions">
              <span className="user-name">{user?.first_name} {user?.last_name}</span>
              <button className="logout-button" onClick={logout}>
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Mode Toggle */}
        <div className="mode-toggle-container">
          <div className="mode-toggle">
            <button
              type="button"
              className={`mode-button ${inputMode === 'upload' ? 'active' : ''}`}
              onClick={() => handleModeChange('upload')}
            >
              📷 Upload Images
            </button>
            <button
              type="button"
              className={`mode-button ${inputMode === 'type' ? 'active' : ''}`}
              onClick={() => handleModeChange('type')}
            >
              ⌨️ Type Directly
            </button>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="step-indicator">
          <div className="step-indicator-container">
            {[1, 2, 3].map((step) => (
              <div key={step} className="step-indicator-item">
                <div
                  className={`step-circle ${currentStep === step ? 'active' : ''} ${currentStep > step ? 'completed' : ''}`}
                >
                  {currentStep > step ? '✓' : step}
                </div>
                <div className={`step-label ${currentStep === step ? 'active' : ''}`}>
                  {step === 1 ? 'Question' : step === 2 ? 'Answer' : 'Evaluation'}
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
              {inputMode === 'upload' ? (
                <>
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
                      editedText={editedQuestionText}
                      onTextChange={setEditedQuestionText}
                    />
                  )}
                </>
              ) : (
                <DirectTextInput
                  title="📝 Type Question"
                  description="Enter the question text directly"
                  value={directQuestionText}
                  onChange={setDirectQuestionText}
                  placeholder="Enter the question here..."
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
              {inputMode === 'upload' ? (
                <>
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
                      editedText={editedAnswerText}
                      onTextChange={setEditedAnswerText}
                    />
                  )}
                  {/* Evaluate Buttons - Upload Mode */}
                  {answerOCRData && questionOCRData && (
                    <div className="evaluate-button-container">
                      <button
                        type="button"
                        className="evaluate-button"
                        onClick={handleEvaluate}
                        disabled={isEvaluating || isExperimentalEvaluating}
                      >
                        {isEvaluating ? '⏳ Evaluating...' : '📊 Evaluate Answer'}
                      </button>
                      <button
                        type="button"
                        className="experimental-eval-button"
                        onClick={() => setShowMarkingSchemeModal(true)}
                        disabled={isEvaluating || isExperimentalEvaluating}
                      >
                        {isExperimentalEvaluating ? '⏳ Evaluating...' : '🧪 Experimental Evaluate'}
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <DirectTextInput
                    title="💡 Type Answer"
                    description="Enter the answer text directly"
                    value={directAnswerText}
                    onChange={setDirectAnswerText}
                    placeholder="Enter the answer here..."
                  />
                  {/* Evaluate Buttons - Direct Type Mode */}
                  {directQuestionText.trim() && directAnswerText.trim() && (
                    <div className="evaluate-button-container">
                      <button
                        type="button"
                        className="evaluate-button"
                        onClick={handleEvaluate}
                        disabled={isEvaluating || isExperimentalEvaluating}
                      >
                        {isEvaluating ? '⏳ Evaluating...' : '📊 Evaluate Answer'}
                      </button>
                      <button
                        type="button"
                        className="experimental-eval-button"
                        onClick={() => setShowMarkingSchemeModal(true)}
                        disabled={isEvaluating || isExperimentalEvaluating}
                      >
                        {isExperimentalEvaluating ? '⏳ Evaluating...' : '🧪 Experimental Evaluate'}
                      </button>
                    </div>
                  )}
                </>
              )}
            </section>
          )}

          {/* Step 3: Evaluation Section */}
          {currentStep === 3 && (
            <section className="upload-section evaluation-section">
              <div className="section-divider">
                <div className="section-number">3</div>
                <div className="section-line"></div>
              </div>

              {/* Standard Evaluation Results */}
              {evaluationData && !experimentalEvaluationData && (
                <EvaluationResult
                  data={evaluationData}
                  isLoading={isEvaluating}
                />
              )}

              {/* Experimental Evaluation Results */}
              {experimentalEvaluationData && (
                <ExperimentalEvaluationResult
                  data={experimentalEvaluationData}
                  isLoading={isExperimentalEvaluating}
                />
              )}

              {/* No Results Message */}
              {!evaluationData && !experimentalEvaluationData && (
                <div className="no-evaluation-message">
                  <p>No evaluation results available. Please go back to Step 2 and click "Evaluate Answer" or "Experimental Evaluate".</p>
                </div>
              )}
            </section>
          )}

          {/* Marking Scheme Modal */}
          <MarkingSchemeModal
            isOpen={showMarkingSchemeModal}
            onClose={() => setShowMarkingSchemeModal(false)}
            onSubmit={handleExperimentalEvaluate}
            question={inputMode === 'type' ? directQuestionText : (editedQuestionText || questionOCRData?.combined_text || '')}
            answer={inputMode === 'type' ? directAnswerText : (editedAnswerText || answerOCRData?.combined_text || '')}
          />

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
            {currentStep < 3 && (
              <button
                type="button"
                className="nav-button next-button"
                onClick={handleNext}
                disabled={currentStep === totalSteps}
              >
                Next →
              </button>
            )}
          </div>
        </main>

        <footer className="app-footer">
          <p>© 2024 Lekha. AI-Powered Learning Platform for CA Students.</p>
        </footer>
      </div>
    </div>
  );
}

export default TeacherDashboard;


