export default () => {
  const searchbarEle = ".navbar .searchbar";
  const searchInputEle = ".navbar .searchbar .search-input";
  const searchClearEle = ".navbar .searchbar .search-clear";
  if ($(searchbarEle).length === 0) {
    return;
  }

  $("body").on("keyup", searchInputEle, (e) => {
    const value = $(e.currentTarget).val();
    if (value !== "") {
      $(".search-clear").show();
      return;
    }
    $(".search-clear").hide();
  });

  $("body").on("click", searchClearEle, (e) => {
    e.preventDefault();
    $(searchInputEle).val("").trigger("change");
    $(e.currentTarget).hide();
  });

  $("body").on("click", ".burger-menu", (e) => {
    e.preventDefault();
    $(".sidebar-wrapper").toggle();
  });
};