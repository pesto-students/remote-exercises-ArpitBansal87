async function allSettled(listOfPromises) {
  return new Promise((resolveObj, rejectObj) => {
    if (!Array.isArray(listOfPromises) || listOfPromises.length === 0) {
      rejectObj(new Error('Error in the argument list'));
    }
    const returnObj = new Array(listOfPromises.length);
    let promisesCompleted = 0;
    listOfPromises.forEach((element, key) => {
      const promiseElement = element;

      const indexValue = key;
      if (promiseElement instanceof Promise) {
        promiseElement
          .then((value) => {
            promisesCompleted += 1;
            returnObj[indexValue] = {
              status: 'fulfilled',
              value,
            };
            if (promisesCompleted === listOfPromises.length) {
              resolveObj(returnObj);
            }
          })
          .catch((reason) => {
            promisesCompleted += 1;
            returnObj[indexValue] = {
              status: 'rejected',
              reason: reason.message ? reason.message : reason,
            };
            if (promisesCompleted === listOfPromises.length) {
              resolveObj(returnObj);
            }
          });
      } else {
        promisesCompleted += 1;
        returnObj[indexValue] = {
          status: 'fulfilled',
          value: promiseElement,
        };
        if (promisesCompleted === listOfPromises.length) {
          resolveObj(returnObj);
        }
      }
    });
  });
}

export { allSettled };
