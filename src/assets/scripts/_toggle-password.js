export default () => {
  const togglePasswordEle = ".toggle-password";
  if ($(togglePasswordEle).length === 0) {
    return;
  }
  $(togglePasswordEle).on("click", (e) => {
    const eye = $(e.currentTarget);
    const parent = eye.parent(".input-password");
    const input = parent.find("input");
    if (input.attr("type") == "password") {
      eye.removeClass("fa-eye");
      eye.addClass("fa-eye-slash");
      input.attr("type", "text");
    } else {
      eye.removeClass("fa-eye-slash");
      eye.addClass("fa-eye");
      input.attr("type", "password");
    }
  });
};