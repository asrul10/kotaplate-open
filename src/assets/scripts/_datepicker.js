export default () => {
  const datePickerEle = $(".date-picker");
  if (datePickerEle.length === 0) {
    return;
  }
  for (let index = 0; index < datePickerEle.length; index++) {
    const datePicker = $(datePickerEle[index]);
    const parent = datePicker.parent(".input-group");

    $(datePicker).datepicker({
      todayBtn: "linked",
      keyboardNavigation: false,
      autoclose: true,
      todayHighlight: true,
      container: ".content-wrapper",
    });
    if (parent.length) {
      const btnDate = parent.find(".btn-date-picker");
      btnDate.on("click", (e) => {
        e.preventDefault();
        $(datePicker).datepicker("show");
      });
    }
  }
};
