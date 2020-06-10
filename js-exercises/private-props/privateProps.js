function privateProps(obj, isPrivate) {
  return new Proxy(obj, {
    has(target, key) {
      if (isPrivate(key)) {
        return false;
      }
      return key in target;
    },
    ownKeys(target) {
      return Object.keys(target).filter((key) => !isPrivate(key));
    },
    get(target, property) {
      if (typeof target[property] === 'function') {
        return function () {
          return target[property].apply(this);
        };
      }
      return target[property];
    },
    set(target, property, value) {
      if (isPrivate(property)) {
        throw new TypeError('Can\'t set property "_private"');
      } else {
        target[property] = value; // eslint-disable-line no-param-reassign
        return true;
      }
    },
    getOwnPropertyDescriptor(target, propkey) {
      return { configurable: true, enumerable: true, value: target[propkey] };
    },
  });
}

export { privateProps };
