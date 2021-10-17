const KotaDropdown = (props) => {
  const { label, dropdownContent, className, btnClassName } = props;

  return (
    <div className={`dropdown ${className || ""}`}>
      <button
        type="button"
        className={`dropdown-toggle ${btnClassName || ""}`}
        data-bs-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="true"
      >
        {label}
      </button>
      {dropdownContent}
    </div>
  );
};

export default KotaDropdown;
