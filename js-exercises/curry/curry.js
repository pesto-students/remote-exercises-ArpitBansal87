function curry(f) {
  return function recursiveCurry(...args) {
    return arguments.length >= f.length
      ? f(...args)
      : recursiveCurry.bind(null, ...args);
  };
}

export { curry };
