function negativeIndex(originalObject) {
  if (!Array.isArray(originalObject)) {
    throw new TypeError('Only arrays are supported');
  }
  return new Proxy(originalObject, {
    get(target, property) {
      let returnObj;
      if (property in target) {
        returnObj = target[property];
      } else if (typeof property !== 'symbol') {
        let propValue = Number.parseInt(property, 10);
        if (!Number.isNaN(propValue) && propValue < 0) {
          propValue += target.length;
        } else propValue = property;
        returnObj = target[propValue];
      }

      return returnObj;
    },
    set(obj, prop, value) {
      let propValue = Number.parseInt(prop, 10);
      if (!Number.isNaN(propValue) && propValue < 0) propValue += obj.length;
      else propValue = prop;
      obj[propValue] = value; // eslint-disable-line no-param-reassign
      return true;
    },
  });
}

export { negativeIndex };
