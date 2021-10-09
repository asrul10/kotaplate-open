export const formSelectEle = ".form-select-searchable";

export default () => {
  const IS_WEBKIT =
    /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  const globalSelectEle = $(formSelectEle);
  if (globalSelectEle.length == 0) {
    return;
  }

  for (let index = 0; index < globalSelectEle.length; index++) {
    const formSelect = $(globalSelectEle[index]);
    formSelect.select2({
      theme: "bootstrap4",
      width: formSelect.data("width")
        ? formSelect.data("width")
        : formSelect.hasClass("w-100")
        ? "100%"
        : "style",
      placeholder: formSelect.attr("placeholder"),
      allowClear: Boolean(formSelect.data("allow-clear")),
    });
  }

  let psSelect = null;
  globalSelectEle.on("select2:open", (e) => {
    if (IS_WEBKIT) {
      $(".select2-search__field").attr("autocomplete", "none");
    }
    setTimeout(() => {
      psSelect = new PerfectScrollbar(".select2-results__options");
    }, 5);
  });
  globalSelectEle.on("select2:closing", (e) => {
    if (psSelect !== null) {
      psSelect.destroy();
      psSelect = null;
    }
  });
};
