const mapAttribute = (props, key) => {
  let propValue = props[key];
  let value = "";
  let attrString = "";

  if (propValue instanceof Object) {
    value = `{${JSON.stringify(propValue).replace(/['"]+/g, "")}}`;
  } else {
    value = `"${propValue}"`;
  }

  attrString = ` ${key}=${value}`;
  if (value === `"false"`) {
    return "";
  }

  if (value === `"true"`) {
    attrString = ` ${key}`;
  }
  return attrString;
};

const jsxString = (component, counter = 0) => {
  if (typeof component === "string") {
    return component;
  }
  if (Array.isArray(component)) {
    let components = [];
    for (let index = 0; index < component.length; index++) {
      const aComponent = component[index];
      components.push(jsxString(aComponent));
    }
    return components.join("");
  }
  let type = component.type.name || component.type;
  let props = component.props;
  let propsString = "";
  for (let key in props) {
    if (key === "children") {
      continue;
    }
    propsString += mapAttribute(props, key);
  }
  if (props.children) {
    counter += 2;
    let children = jsxString(props.children, counter);
    return `<${type}${propsString}>${Array(counter).join("")}${children}${Array(
      counter
    ).join("")}</${type}>`;
  }
  return `<${type}${propsString} />`;
};

export default jsxString;
