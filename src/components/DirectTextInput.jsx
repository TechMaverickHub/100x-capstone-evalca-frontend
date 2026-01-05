import './DirectTextInput.css';

const DirectTextInput = ({ title, description, value, onChange, placeholder }) => {
  return (
    <div className="direct-text-input-container">
      <div className="direct-text-header">
        <h3 className="direct-text-title">{title}</h3>
        <p className="direct-text-description">{description}</p>
      </div>
      <textarea
        className="direct-text-area"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default DirectTextInput;





