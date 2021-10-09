export const popoverEle = "[data-bs-toggle='popover']";

export default () => {
  if ($(popoverEle).length === 0) {
    return;
  }
  popoverEle.popover();
};