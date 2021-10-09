export default () => {
  const clearInputEle = ".input-clear";
  if ($(clearInputEle).length === 0) {
    return;
  }
  for (let index = 0; index < $(clearInputEle).length; index++) {
    const parent = $($(clearInputEle)[index]);
    const clearInput = parent.find('.btn-input-clear');
    const input = parent.find("input");
    if (input.val() == "") {
      clearInput.hide();
    } else {
      clearInput.show();
    }

    input.on('change', e => {
      if ($(e.currentTarget).val() == "") {
        clearInput.hide();
      } else {
        clearInput.show();
      }
    });
  
    $(clearInput).on("click", e => {
      input.val('');
      input.trigger('change');
    });
  }
};