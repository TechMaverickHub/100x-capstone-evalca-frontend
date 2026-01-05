import { useState } from 'react';
import './MarkingSchemeModal.css';

const MarkingSchemeModal = ({ isOpen, onClose, onSubmit, question, answer }) => {
  const [totalMarks, setTotalMarks] = useState(10);
  const [schemePoints, setSchemePoints] = useState([
    { point_code: '', description: '', max_marks: 0 },
  ]);

  if (!isOpen) return null;

  const handleAddPoint = () => {
    setSchemePoints([...schemePoints, { point_code: '', description: '', max_marks: 0 }]);
  };

  const handleRemovePoint = (index) => {
    if (schemePoints.length > 1) {
      setSchemePoints(schemePoints.filter((_, i) => i !== index));
    }
  };

  const handlePointChange = (index, field, value) => {
    const updated = [...schemePoints];
    updated[index] = { ...updated[index], [field]: value };
    setSchemePoints(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate
    const totalSchemeMarks = schemePoints.reduce((sum, point) => sum + (parseFloat(point.max_marks) || 0), 0);
    
    if (totalSchemeMarks !== parseFloat(totalMarks)) {
      alert(`Total marks in scheme (${totalSchemeMarks}) must equal total marks (${totalMarks})`);
      return;
    }

    if (schemePoints.some(point => !point.point_code || !point.description || !point.max_marks)) {
      alert('Please fill in all fields for all marking scheme points');
      return;
    }

    onSubmit({
      totalMarks: parseFloat(totalMarks),
      markingScheme: schemePoints.map(point => ({
        point_code: point.point_code,
        description: point.description,
        max_marks: parseFloat(point.max_marks),
      })),
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Experimental Evaluation - Marking Scheme</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label className="form-label">
              Total Marks
            </label>
            <input
              type="number"
              className="form-input"
              value={totalMarks}
              onChange={(e) => setTotalMarks(e.target.value)}
              min="1"
              required
            />
          </div>

          <div className="scheme-points-section">
            <div className="scheme-points-header">
              <h3>Marking Scheme Points</h3>
              <button
                type="button"
                className="add-point-button"
                onClick={handleAddPoint}
              >
                + Add Point
              </button>
            </div>

            {schemePoints.map((point, index) => (
              <div key={index} className="scheme-point-card">
                <div className="scheme-point-header">
                  <span className="point-number">Point {index + 1}</span>
                  {schemePoints.length > 1 && (
                    <button
                      type="button"
                      className="remove-point-button"
                      onClick={() => handleRemovePoint(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="scheme-point-fields">
                  <div className="field-group">
                    <label className="field-label">Point Code</label>
                    <input
                      type="text"
                      className="field-input"
                      value={point.point_code}
                      onChange={(e) => handlePointChange(index, 'point_code', e.target.value)}
                      placeholder="e.g., MC_DEF"
                      required
                    />
                  </div>
                  <div className="field-group">
                    <label className="field-label">Description</label>
                    <input
                      type="text"
                      className="field-input"
                      value={point.description}
                      onChange={(e) => handlePointChange(index, 'description', e.target.value)}
                      placeholder="e.g., Meaning / definition of marginal costing"
                      required
                    />
                  </div>
                  <div className="field-group">
                    <label className="field-label">Max Marks</label>
                    <input
                      type="number"
                      className="field-input"
                      value={point.max_marks}
                      onChange={(e) => handlePointChange(index, 'max_marks', e.target.value)}
                      min="0"
                      step="0.5"
                      required
                    />
                  </div>
                </div>
              </div>
            ))}

            <div className="scheme-total">
              <strong>
                Scheme Total: {schemePoints.reduce((sum, point) => sum + (parseFloat(point.max_marks) || 0), 0)} / {totalMarks}
              </strong>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Evaluate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MarkingSchemeModal;

