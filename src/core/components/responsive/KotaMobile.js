const KotaMobile = ({ children, ...props }) => (
  <div className="d-lg-none" {...props}>
    {children}
  </div>
);

export default KotaMobile;
