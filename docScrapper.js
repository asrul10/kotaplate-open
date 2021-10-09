const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");
const listScrap = [
  {
    title: "Buttons",
    store: "./src/data/buttons.json",
    link: "https://getbootstrap.com/docs/5.1/components/buttons/",
    route: "/components/buttons",
    content: [],
  },
  {
    title: "Button group",
    store: "./src/data/button-group.json",
    link: "https://getbootstrap.com/docs/5.1/components/button-group/",
    route: "/components/button-group",
    content: [],
  },
  {
    title: "Breadcrumb",
    store: "./src/data/breadcrumb.json",
    link: "https://getbootstrap.com/docs/5.1/components/breadcrumb/",
    route: "/components/breadcrumb",
    content: [],
  },
  {
    title: "Dropdowns",
    store: "./src/data/dropdowns.json",
    link: "https://getbootstrap.com/docs/5.1/components/dropdowns/",
    route: "/components/dropdowns",
    content: [],
  },
  {
    title: "Typography",
    store: "./src/data/typography.json",
    link: "https://getbootstrap.com/docs/5.1/content/typography/",
    route: "/components/typography",
    content: [],
  },
  {
    title: "Pagination",
    store: "./src/data/pagination.json",
    link: "https://getbootstrap.com/docs/5.1/components/pagination/",
    route: "/components/pagination",
    content: [],
  },
  {
    title: "Pagination",
    store: "./src/data/pagination.json",
    link: "https://getbootstrap.com/docs/5.1/components/pagination/",
    route: "/components/pagination",
    content: [],
  },
  {
    title: "Forms",
    store: "./src/data/forms.json",
    link: "https://getbootstrap.com/docs/5.1/forms/form-control/",
    route: "/components/form-control",
    content: [],
  },
  {
    title: "Select",
    store: "./src/data/select.json",
    link: "https://getbootstrap.com/docs/5.1/forms/select/",
    route: "/components/select",
    content: [],
  },
  {
    title: "Checks & Radios",
    store: "./src/data/checks-radios.json",
    link: "https://getbootstrap.com/docs/5.1/forms/checks-radios/",
    route: "/components/checks-radios",
    content: [],
  },
  {
    title: "Range",
    store: "./src/data/range.json",
    link: "https://getbootstrap.com/docs/5.1/forms/range/",
    route: "/components/range",
    content: [],
  },
  {
    title: "Input Group",
    store: "./src/data/input-group.json",
    link: "https://getbootstrap.com/docs/5.1/forms/input-group/",
    route: "/components/input-group",
    content: [],
  },
  {
    title: "Floating Labels",
    store: "./src/data/floating-labels.json",
    link: "https://getbootstrap.com/docs/5.1/forms/floating-labels/",
    route: "/components/floating-labels",
    content: [],
  },
  {
    title: "Layout",
    store: "./src/data/layout.json",
    link: "https://getbootstrap.com/docs/5.1/forms/layout/",
    route: "/components/layout",
    content: [],
  },
  {
    title: "Validation",
    store: "./src/data/validation.json",
    link: "https://getbootstrap.com/docs/5.1/forms/validation/",
    route: "/components/validation",
    content: [],
  },
  {
    title: "Badge",
    store: "./src/data/badge.json",
    route: "/components/badge",
    link: "https://getbootstrap.com/docs/5.1/components/badge/",
    content: [],
  },
  {
    title: "Card",
    store: "./src/data/card.json",
    route: "/components/card",
    link: "https://getbootstrap.com/docs/5.1/components/card/",
    content: [],
  },
  {
    title: "Carousel",
    store: "./src/data/carousel.json",
    route: "/components/carousel",
    link: "https://getbootstrap.com/docs/5.1/components/carousel/",
    content: [],
  },
  {
    title: "Collapse",
    store: "./src/data/collapse.json",
    route: "/components/collapse",
    link: "https://getbootstrap.com/docs/5.1/components/collapse/",
    content: [],
  },
  {
    title: "Navs",
    store: "./src/data/navs.json",
    route: "/components/navs",
    link: "https://getbootstrap.com/docs/5.1/components/navs-tabs/",
    content: [],
  },
  {
    title: "Popovers",
    store: "./src/data/popovers.json",
    route: "/components/popovers",
    link: "https://getbootstrap.com/docs/5.1/components/popovers/",
    content: [],
  },
  {
    title: "Tooltips",
    store: "./src/data/tooltips.json",
    route: "/components/tooltips",
    link: "https://getbootstrap.com/docs/5.1/components/tooltips/",
    content: [],
  },
  {
    title: "List group",
    store: "./src/data/list-group.json",
    route: "/components/list-group",
    link: "https://getbootstrap.com/docs/5.1/components/list-group/",
    content: [],
  },
  {
    title: "Accordion",
    store: "./src/data/accordion.json",
    route: "/components/accordion",
    link: "https://getbootstrap.com/docs/5.1/components/accordion/",
    content: [],
  },
  {
    title: "Alerts",
    store: "./src/data/alerts.json",
    route: "/components/alerts",
    link: "https://getbootstrap.com/docs/5.1/components/alerts/",
    content: [],
  },
  {
    title: "Modal",
    store: "./src/data/modal.json",
    route: "/components/modal",
    link: "https://getbootstrap.com/docs/5.1/components/modal/",
    content: [],
  },
  {
    title: "Progress",
    store: "./src/data/progress.json",
    route: "/components/progress",
    link: "https://getbootstrap.com/docs/5.1/components/progress/",
    content: [],
  },
  {
    title: "Spinners",
    store: "./src/data/spinners.json",
    route: "/components/spinners",
    link: "https://getbootstrap.com/docs/5.1/components/spinners/",
    content: [],
  },
  {
    title: "Toasts",
    store: "./src/data/toasts.json",
    route: "/components/toasts",
    link: "https://getbootstrap.com/docs/5.1/components/toasts/",
    content: [],
  },
  {
    title: "Placeholders",
    store: "./src/data/placeholders.json",
    route: "/components/placeholders",
    link: "https://getbootstrap.com/docs/5.1/components/placeholders/",
    content: [],
  },
];

const getContentChild = (childContent, $) => {
  const content = {
    title: "",
    contents: [],
  };

  for (let index = 0; index < childContent.length; index++) {
    const $element = $(childContent[index]);
    if ($element.hasClass("bd-example")) {
      content.contents.push({ type: "code", element: $element.html() });
      continue;
    }
    if ($element.prop("tagName") === "P") {
      content.contents.push({ type: "desc", element: $element.html() });
      continue;
    }
    if ($element.prop("tagName") === "H2") {
      content.title = $element.text();
    }
  }
  return content;
};

const getContent = (content) => {
  const $ = cheerio.load(content);
  const $content = $(".bd-content")
    .html()
    .replace(/\r?\n|\r/gm, "");
  const split = $content.split("<h2");
  const listContent = [];
  for (let index = 0; index < split.length; index++) {
    const element = split[index];
    const $childContent = cheerio.load(`<div id="parent"><h2 ${element}</div>`);
    const childContent = $childContent("#parent").children();
    const objContent = getContentChild(childContent, $childContent);
    listContent.push(objContent);
  }
  return listContent.filter((val) => val.contents.length);
};

const indexContent = () => {
  const stringRequire = [];
  for (let index = 0; index < listScrap.length; index++) {
    const element = listScrap[index];
    const path = element.store.replace("src/data/", "");
    stringRequire.push(`require("${path}")`);
  }
  const writeContent = `const data = [${stringRequire.join(
    ","
  )}];export default data;`;

  fs.writeFile("./src/data/data.js", writeContent, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
};

for (let index = 0; index < listScrap.length; index++) {
  const scrap = listScrap[index];
  axios
    .get(scrap.link)
    .then((response) => {
      scrap.content = getContent(response.data);
      const writeContent = scrap;
      fs.writeFile(scrap.store, JSON.stringify(writeContent), (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}

indexContent();
