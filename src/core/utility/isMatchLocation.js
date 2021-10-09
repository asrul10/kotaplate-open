const isMatchLocation = (location, targetLocation) => {
  const splitLocation = location.split("/");
  const splitTargetLocation = targetLocation.split("/");
  let isMatch = true;
  for (let index = 0; index < splitLocation.length; index++) {
    const path = splitLocation[index];
    const targetPath = splitTargetLocation[index];
    if (path !== targetPath) {
      isMatch = false;
      break;
    }
  }
  return isMatch;
};

export default isMatchLocation;
