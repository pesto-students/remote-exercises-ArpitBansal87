function aperture(tuplesLength, arrayObject) {
  if (typeof tuplesLength !== 'number' || !Array.isArray(arrayObject)) {
    throw new TypeError();
  }
  const returnObject = [];
  for (let itr = 0; itr + tuplesLength <= arrayObject.length; itr += 1) {
    returnObject.push(arrayObject.slice(itr, itr + tuplesLength));
  }
  return returnObject;
}

export { aperture };
