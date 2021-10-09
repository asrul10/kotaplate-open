export default (formSelectEle, popoverEle) => {
  const sidebarSelector = ".sidebar-wrapper";
  const contentSelector = ".content-wrapper";
  $(sidebarSelector)[0].scrollTop = localStorage.getItem("lastScrollTop") || 0;

  let psGeneral = [];
  let psSidebar = sidebarSelector.length
    ? new PerfectScrollbar(sidebarSelector)
    : null;
  let psContent = contentSelector.length
    ? new PerfectScrollbar(contentSelector)
    : null;
  let psModal = null;
  let psModalBody = null;

  $(".perfect-scroll").each((index, e) => {
    psGeneral.push(new PerfectScrollbar(e));
  });

  setTimeout(() => {
    $(".perfect-scroll-delay").each((index, e) => {
      psGeneral.push(new PerfectScrollbar(e));
    });
  }, 100);

  $(".modal").on("shown.bs.modal", (e) => {
    if (psGeneral.length !== 0) {
      psGeneral.forEach((value) => {
        value.destroy();
      });
    }
    if (psSidebar !== null) {
      psSidebar.destroy();
    }
    if (psContent !== null) {
      psContent.destroy();
    }
    psGeneral = [];
    psSidebar = psContent = null;
    const idTarget = `#${e.currentTarget.id}`;
    psModal = new PerfectScrollbar(".modal.show");
    psModalBody = new PerfectScrollbar(`${idTarget} .modal-body`);
  });

  $(".modal").on("hidden.bs.modal", (e) => {
    if (psGeneral === null) {
      psGeneral = new PerfectScrollbar(sidebarSelector);
    }
    if (psSidebar === null) {
      psSidebar = new PerfectScrollbar(sidebarSelector);
    }
    if (psContent === null) {
      psContent = new PerfectScrollbar(contentSelector);
    }
    if (psModal !== null) {
      psModal.destroy();
    }
    if (psModalBody !== null) {
      psModalBody.destroy();
    }
    psModalBody = psModal = null;
  });

  document
    .querySelector(contentSelector)
    .addEventListener("ps-scroll-y", (e) => {
      if ($(formSelectEle).length !== 0) {
        $(formSelectEle).select2("close");
      }
      if ($(popoverEle).length !== 0) {
        $(popoverEle).popover("hide");
      }
    });

  $("body").on("click", ".menu-link", () => {
    const lastScrollTop = $(sidebarSelector).prop("scrollTop");
    localStorage.setItem("lastScrollTop", lastScrollTop);
  });
};
