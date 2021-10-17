const format = (node, level) => {
  const indentBefore = new Array(level++ + 1).join("  "),
    indentAfter = new Array(level - 1).join("  ");
  let textNode;

  for (let i = 0; i < node.children.length; i++) {
    textNode = document.createTextNode("\n" + indentBefore);
    node.insertBefore(textNode, node.children[i]);

    format(node.children[i], level);

    if (node.lastElementChild === node.children[i]) {
      textNode = document.createTextNode("\n" + indentAfter);
      node.appendChild(textNode);
    }
  }

  return node;
};

const formatOriginTag = (stringFormatted, originStr) => {
  const matchTagName = originStr.match(/<.+?(\s|>)/gm);
  for (let index = 0; index < matchTagName.length; index++) {
    const element = matchTagName[index];
    const formatEle = element.replace(/\s/g, "");
    stringFormatted = stringFormatted.replace(
      formatEle.toLowerCase(),
      formatEle
    );
  }
  return stringFormatted;
};

const formatOriginAttr = (stringFormatted, originStr) => {
  const matchAttrName = originStr.match(/\s[a-zA-Z0-9]+?=/gm);
  if (!matchAttrName) {
    return stringFormatted;
  }
  for (let index = 0; index < matchAttrName.length; index++) {
    const element = matchAttrName[index];
    const formatEle = element.replace(/\s/g, "");
    stringFormatted = stringFormatted.replace(
      formatEle.toLowerCase(),
      formatEle
    );
  }
  return stringFormatted;
};

const formatSingleEle = (str) => {
  const tmpEle = "</closeele>";
  str = str.replace(/\/>/gm, `singleele>${tmpEle}`);
  const splitStr = str.split("<");
  let formatEle = [];
  let lastElement = "";
  for (let index = 0; index < splitStr.length; index++) {
    if (!splitStr[index]) {
      continue;
    }
    let element = "<" + splitStr[index];
    let tagName = element.match(/<[a-zA-Z]+ /g);
    if (element.match(/br|hr/gm)) {
      splitStr[index + 1] = "";
    }
    if (tagName) {
      tagName = tagName[0].replace(/[<\s]/g, "");
      lastElement = tagName;
    }
    if (element === tmpEle) {
      element = `</${lastElement}>`;
    }
    formatEle.push(element);
  }
  return formatEle.join("");
};

const cleanUpTempAttr = (str) => {
  return str.replace(/ singleele/gm, " /");
};

const toSingleEle = (str) => {
  return str.replace(/singleele><\/[a-zA-Z]+>/gm, "/>");
};

const htmlAutoIndent = (str) => {
  const div = document.createElement("div");
  div.innerHTML = formatSingleEle(str.trim());

  let stringFormatted = format(div, 0).innerHTML;
  stringFormatted = formatOriginTag(stringFormatted, str);
  stringFormatted = formatOriginAttr(stringFormatted, str);
  stringFormatted = stringFormatted.replace(/=""/gm, "");
  stringFormatted = toSingleEle(stringFormatted);
  return cleanUpTempAttr(stringFormatted.trim());
};

export default htmlAutoIndent;
