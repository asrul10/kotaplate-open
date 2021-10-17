const KotaDesktop = ({ children, ...props }) => (
  <div className="d-none d-lg-block" {...props}>
    {children}
  </div>
);

export default KotaDesktop;
