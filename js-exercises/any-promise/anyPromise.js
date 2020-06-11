function anyPromise(promiseList) {
  return new Promise((resolve, reject) => {
    for (const promise of promiseList) {
      promise()
        .then((value) => resolve(value))
        .catch((value) => reject(value));
    }
    if (promiseList.length === 0) resolve(promiseList);
  });
}

export { anyPromise };
