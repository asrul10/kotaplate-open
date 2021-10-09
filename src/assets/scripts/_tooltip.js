export default () => {
  const tooltipEle = "[data-bs-toggle='tooltip']";
  if ($(tooltipEle).length === 0) {
    return;
  }
  // $(tooltipEle).tooltip({
  //   trigger: "hover",
  // });
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(tooltipTriggerEl => {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
};