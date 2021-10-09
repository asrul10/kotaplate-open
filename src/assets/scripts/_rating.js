export default () => {
  const titleRatingEle = ".show-title input";
  if ($(titleRatingEle).length === 0) {
    return;
  }
  $(titleRatingEle).on("click", (e) => {
    const parentTitle = $(e.currentTarget).parents(".show-title");
    const title = $(e.currentTarget).attr("data-title");
    const ratingTitle = parentTitle.find(".rating-title");
    console.log(ratingTitle, parentTitle);
    if (!ratingTitle) {
      return;
    }
    ratingTitle.text(title);
  });
};