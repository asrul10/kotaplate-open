export default () => {
  const cardDemoEle = ".card-demo";
  if ($(cardDemoEle).length === 0) {
    return;
  }
  $(`${cardDemoEle} .show-code`).on("click", (e) => {
    e.preventDefault();
    const parentEle = $(e.currentTarget).parents(cardDemoEle);
    const codeEle = parentEle.find(".highlight");
    codeEle.toggle();
  });
};
