"use strict";

/**
 * Customize theme
 */
const customizeTheme = () => {
  const btnCustomize = ".btn-customize";
  $('input[name="layoutWidth"]').on("change", (e) => {
    const val = $(e.target).val();
    console.log(val);
  });

  $(".side-close").on("click", (e) => {
    const btn = $(btnCustomize);
    const isHidden = btn.is(":hidden");
    if (isHidden !== true) {
      return;
    }
    btn.show();
  });
};

/**
 * Search menu
 */
const searchMenu = () => {
  const searchMenuInput = $("#demo-input-search-menu");
  const searchMenuResult = $("#demo-result-search-menu");
  const searchMenuClear = $(".search-clear");
  const limitSearchContent = 7;

  const getMenuContents = () => {
    const anchorMenu = $(".menu-link a");
    const listMenu = [];
    for (let index = 0; index < anchorMenu.length; index++) {
      const e = anchorMenu[index];
      const attr = $(e).attr("href");
      const text = $(e).text().replace(/\n/g, "").replace(/  /g, "");
      if (attr === "" || attr === "#") {
        continue;
      }
      listMenu.push({ attr: attr, text: text });
    }
    return listMenu;
  };

  const setMenuContents = () => {
    const listMenu = getMenuContents();
    const htmlFormatted = [];
    for (let index = 0; index < listMenu.length; index++) {
      const element = listMenu[index];
      const isLimited =
        index >= limitSearchContent ? 'style="display: none;"' : "";
      htmlFormatted.push(
        `<a class="dropdown-item searchable-content-menu" ${isLimited} href="${element.attr}">${element.text}</a>`
      );
    }
    searchMenuResult.html(htmlFormatted.join(""));
  };

  const filteringMenu = () => {
    const searchMenuResultList = $("#demo-result-search-menu .dropdown-item");
    const value = $(searchMenuInput).val().toLowerCase();
    searchMenuResultList.filter((i, e) => {
      $(e).toggle($(e).text().toLowerCase().indexOf(value) > -1);
    });
    limitSearch();
  };

  const limitSearch = () => {
    const searchMenuResultList = $(
      "#demo-result-search-menu .dropdown-item:visible"
    );
    for (let index = 0; index < searchMenuResultList.length; index++) {
      const element = searchMenuResultList[index];
      if (index >= limitSearchContent) {
        $(element).hide();
      }
    }
  };

  setMenuContents();
  searchMenuInput.on("keyup", filteringMenu);
  searchMenuClear.on("click", () => {
    setMenuContents();
  });
};

const searchShortcut = () => {
  let keysDown = {};
  window.onkeydown = (e) => {
    keysDown[e.key] = true;

    if (keysDown["Control"] && keysDown["/"]) {
      $("#demo-input-search-menu").trigger("focus").trigger("click");
    }
  };
  window.onkeyup = (e) => {
    keysDown[e.key] = false;
  };
};

/**
 * Search icons
 */
const searchIcons = () => {
  const searchIconInput = $("#demo-input-search-icons");
  const iconCard = $(".demo-icons li");
  const filterIcons = () => {
    const icons = $(".demo-icons li");
    const value = searchIconInput.val().toLowerCase();
    console.log(value);
    icons.filter((i, e) => {
      $(e).toggle($(e).text().toLowerCase().indexOf(value) > -1);
    });
  };

  const changableIcons = (e) => {
    const iconName = $("#changable-icons");
    iconName.text($(e.currentTarget).text().replace(/[ \n]/g, ""));
  };

  iconCard.on("click", changableIcons);
  searchIconInput.on("keyup", filterIcons);
};

// ============ Example Scripts ============ //

/**
 * Example Ajax Select
 */
const ajaxSelect = () => {
  const formSelectAjax = $(".form-select-ajax-demo");
  const formatRepo = (repo) => {
    if (repo.loading) {
      return repo.text;
    }
    const resultHtmlTag = $(
      [
        "<div class='d-flex'>",
        "<div class='avatar-square-xs me-2'><img src='",
        repo.owner.avatar_url,
        "' /></div>",
        "<div>",
        repo.full_name,
        "</div>",
        "<div class='flex-grow-1 text-right ms-2'><i class='fa fa-star'></i> ",
        repo.stargazers_count,
        "</div>",
        "</div>",
      ].join("")
    );
    return resultHtmlTag;
  };

  if (formSelectAjax.length === 0) {
    return;
  }

  formSelectAjax.select2({
    ajax: {
      url: "https://api.github.com/search/repositories",
      dataType: "json",
      delay: 250,
      data: function (params) {
        return {
          q: params.term, // search term
          page: params.page,
        };
      },
      processResults: function (data, params) {
        // parse the results into the format expected by Select2
        // since we are using custom formatting functions we do not need to
        // alter the remote JSON data, except to indicate that infinite
        // scrolling can be used
        params.page = params.page || 1;

        return {
          results: data.items,
          pagination: {
            more: params.page * 30 < data.total_count,
          },
        };
      },
      cache: true,
    },
    theme: "bootstrap4",
    placeholder: "Search for a repository",
    minimumInputLength: 3,
    templateResult: formatRepo,
    templateSelection: (repo) => {
      return repo.full_name || repo.text;
    },
  });
};

/**
 * Example Mentions
 */
const mentions = () => {
  const mentionBasic = $("#comment");
  const mentionCustomKey = $("#comment-custom-key");
  const mentionCustomDropdown = $("#comment-custom-dropdown");
  const mentionAsync = $("#comment-async");
  const users = [
    {
      image: "/dist/assets/images/portrait.png",
      username: "lodev09",
      fullname: "Jovanni Lo",
    },
    {
      image: "/dist/assets/images/portrait.png",
      username: "foo",
      fullname: "Foo User",
    },
    {
      image: "/dist/assets/images/portrait.png",
      username: "bar",
      fullname: "Bar User",
    },
    {
      image: "/dist/assets/images/portrait.png",
      username: "twbs",
      fullname: "Twitter Bootstrap",
    },
    {
      image: "/dist/assets/images/portrait.png",
      username: "john",
      fullname: "John Doe",
    },
    {
      image: "/dist/assets/images/portrait.png",
      username: "jane",
      fullname: "Jane Doe",
    },
  ];

  if (mentionBasic.length === 0) {
    return;
  }

  // Basic
  mentionBasic.suggest("@", {
    data: users,
    map: (user) => {
      return {
        value: user.username,
        text: [
          "<strong>",
          user.username,
          "</strong> <small>",
          user.fullname,
          "</small>",
        ].join(""),
      };
    },
  });

  // Custom Key
  mentionCustomKey.suggest("#", {
    data: users,
    map: (user) => {
      return {
        value: user.username,
        text: [
          "<strong>",
          user.username,
          "</strong> <small>",
          user.fullname,
          "</small>",
        ].join(""),
      };
    },
  });

  // Custom Dropdown
  mentionCustomDropdown.suggest("@", {
    data: users,
    map: (user) => {
      return {
        value: user.username,
        text: [
          "<div class='avatar-circle-xs mr-2'>",
          "<img src='" + user.image + "' />",
          "</div>",
          "<strong>",
          user.username,
          "</strong> <small>",
          user.fullname,
          "</small>",
        ].join(""),
      };
    },
  });

  // Async
  mentionAsync.suggest("@", {
    data: (q, provide) => {
      if (q) {
        $.getJSON(
          "https://api.github.com/search/repositories",
          { q: q },
          (data) => {
            provide(data.items);
          }
        );
      }
    },
    map: (repo) => {
      return {
        value: repo.name,
        text: repo.name,
      };
    },
  });
};

/**
 * Example Transfer
 */
const exampleTransfer = () => {
  const data = [
    {
      district: "District 21",
      value: 1,
    },
    {
      district: "District 22",
      value: 2,
    },
    {
      district: "District 23",
      value: 3,
    },
    {
      district: "District 24",
      value: 4,
    },
    {
      district: "District 25",
      value: 5,
    }
  ];
  const config = {
    dataArray: data,
    itemName: "district",
    valueName: "value",
    tabNameText: "District",
    rightTabNameText: "Selected District",
    searchPlaceholderText: "Search",
  };

  // Basic Example
  $(".simple-transfer").transfer(config);

  // Disabled Example
  data[0].disabled = true;
  data[3].disabled = true;
  $(".disabled-transfer").transfer(config);

  // Preselected Transfer
  data[0].disabled = false;
  data[3].disabled = false;
  data[3].selected = true;
  data[1].selected = true;
  $(".preselect-transfer").transfer(config);

  // Group Transfer
  const nightDistrict = [];
  const mistDistrict = [];
  data.forEach(val => {
    val.selected = false;
    val.disabled = false;
    const nightVal = {}, mistVal = {};
    nightVal.district = `N-${val.district}`;
    nightVal.value = val.value;
    mistVal.district = `M-${val.district}`;
    mistVal.value = val.value + 100;
    nightDistrict.push(nightVal);
    mistDistrict.push(mistVal);
  });
  const dataGroup = [
    {
      city: "Night",
      district: nightDistrict
    },
    {
      city: "Mist",
      district: mistDistrict
    },
  ];

  config.dataArray = [];
  config.groupDataArray = dataGroup;
  config.groupItemName = 'city';
  config.groupArrayName = 'district';
  $(".group-transfer").transfer(config);
};

/**
 * Execute
 */
customizeTheme();
searchMenu();
searchShortcut();
searchIcons();
ajaxSelect();
mentions();
exampleTransfer();

// Need to be clean >>>>>>>>>>>>>>>>>>>>>>

// Defining the local dataset autocomplete
var cars = [
  "Audi",
  "BMW",
  "Bugatti",
  "Ferrari",
  "Ford",
  "Lamborghini",
  "Mercedes Benz",
  "Porsche",
  "Rolls-Royce",
  "Volkswagen",
];

// choose card
$(".card-options tr").on("click", (e) => {
  $(e.currentTarget).children("td").children("input").prop("checked", true);
  $(".card-options tr").removeClass("selected");
  $(e.currentTarget).toggleClass("selected");
});
