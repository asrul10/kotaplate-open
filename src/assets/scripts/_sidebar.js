export default () => {
  const arrowMenu = "<i class='fas fa-chevron-down menu-link-arrow'></i>";
  const arrowMenuOpen = "<i class='fas fa-chevron-up menu-link-arrow'></i>";
  const menuLinkDropdown = ".menu-link.dropdown:not(.open) > a";
  const menuLinkDropdownOpen = ".menu-link.dropdown.open > a";

  if ($(menuLinkDropdown).length !== 0) {
    $(menuLinkDropdown).append(arrowMenu);
    $("body").on("click", menuLinkDropdown, (e) => {
      e.preventDefault();
      const menuLink = $(e.currentTarget);
      const parentMenuLink = menuLink.parent(".menu-link");
      parentMenuLink.addClass("open");
      menuLink.children(".menu-link-arrow").remove();
      menuLink.append(arrowMenuOpen);
    });
  }

  if ($(menuLinkDropdown).length !== 0) {
    $(menuLinkDropdownOpen).append(arrowMenuOpen);
    $("body").on("click", menuLinkDropdownOpen, (e) => {
      e.preventDefault();
      const menuLink = $(e.currentTarget);
      const parentMenuLink = menuLink.parent(".menu-link");
      parentMenuLink.removeClass("open");
      menuLink.children(".menu-link-arrow").remove();
      menuLink.append(arrowMenu);
    });
  }
};
