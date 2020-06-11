import { anyPromise } from './anyPromise';

describe('anyPromise', () => {
  test('should handle []', async () => {
    const promises = [];
    await anyPromise(promises).then((value) => {
      expect(value).toStrictEqual([]);
    });
  });
  test('should handle [success, failure]', async () => {
    const promises = [() => Promise.resolve('p1'), () => Promise.resolve('p2')];
    await anyPromise(promises).then((value) => {
      expect(value).toBe('p1');
    });
  });
  test('returns response from only one promise', async () => {
    const pErr = () => new Promise((resolve) => {
      setTimeout(resolve, 2500, 'Done eventually');
    });

    const pSlow = () => new Promise((resolve) => {
      setTimeout(resolve, 500, 'Done eventually');
    });

    const pFast = () => new Promise((resolve) => {
      setTimeout(resolve, 100, 'Done quick');
    });

    const promiseList = [pErr, pSlow, pFast];
    await anyPromise(promiseList).then((value) => {
      expect(value).toBe('Done quick');
    });
  });
});
