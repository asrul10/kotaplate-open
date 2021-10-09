export default () => {
  const pagewrapEle = ".page-wrapper";
  const sidepageEle = ".sidepage-wrapper";
  const sidepageContentEle = ".sidepage-content";
  if ($(pagewrapEle).length === 0) {
    return;
  }
  $(pagewrapEle).append(
    "<div class='sidepage-wrapper' style='display: none'></div>"
  );
  new PerfectScrollbar(".sidepage-wrapper");

  $("body").on("click", ".side-close", (e) => {
    e.preventDefault();
    const sidePage = $(sidepageEle);
    const viewSidepage = sidePage.children(sidepageContentEle);
    const sourceSidepage = viewSidepage.attr("data-source");
    sidePage.hide();
    viewSidepage.appendTo(`#${sourceSidepage}`);
  });

  $("body").on("click", ".side-open", (e) => {
    e.preventDefault();
    const sidePage = $(sidepageEle);
    const targetSidepage = $(e.currentTarget).attr("data-target");
    const selectorSidepage = $(`#${targetSidepage}`);
    selectorSidepage
      .children(sidepageContentEle)
      .attr("data-source", targetSidepage)
      .appendTo(".sidepage-wrapper");
    sidePage.show();
  });
};