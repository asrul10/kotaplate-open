const stringToIcon = (stringIcon) => {
  const toCamel = (s) => {
    return s.replace(/([-_][a-z])/gi, ($1) => {
      return $1.toUpperCase().replace("-", "").replace("_", "");
    });
  };
  const objectName = toCamel(`fa-${stringIcon}`);
  return new Promise((resolve, reject) => {
    import("@fortawesome/free-solid-svg-icons").then((icons) => {
      resolve(icons[objectName]);
    });
  });
};

export default stringToIcon;
