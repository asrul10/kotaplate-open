export default () => {
  const breadcrumbEle = ".breadcrumb";
  const arrowBreadcrumb =
    "<i class='fas fa-chevron-right breadcrumb-arrow'></i>";
  if ($(breadcrumbEle).length === 0) {
    return;
  }
  $(breadcrumbEle).each((index, ele) => {
    const breadcrumbItems = $(ele).children();
    breadcrumbItems.each((indexItem, eleItem) => {
      if (indexItem === 0) {
        return;
      }
      $(eleItem).prepend(arrowBreadcrumb);
    });
  });
};
