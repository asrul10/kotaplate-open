export default () => {
  const globalDemo = $(".card-demo");
  for (let index = 0; index < globalDemo.length; index++) {
    const element = $(globalDemo[index]);
    const contentEle = element.find(".content-demo");
    const codeContentEle = element.find(".language-html");
    const exampleCode = contentEle
      .html()
      .replace(/ {22}/gm, "")
      .replace(/(^(?:[\t ]*(?:\r?\n|\r))+|\n\s*$(?!\n))/gm, "");
    codeContentEle.text(exampleCode);
  }
  hljs.initHighlightingOnLoad();
};
