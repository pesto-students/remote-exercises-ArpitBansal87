import { allSettled } from './allSettled';

describe('allSettled', () => {
  it('should check for promise argument list', async () => {
    const emptyPromieList = [];
    await expect(allSettled(emptyPromieList)).rejects.toThrow();
  });
  it('verify the implementation of all promises', async () => {
    const promise1 = Promise.resolve(3);
    const promise2 = new Promise((resolve, reject) => setTimeout(reject, 100, 'foo'));
    const promises = [promise1, promise2];
    await allSettled(promises).then((data) => {
      expect(data).toEqual([
        { status: 'fulfilled', value: 3 },
        { status: 'rejected', reason: 'foo' },
      ]);
    });
  });
  it('verify the implementation of multiple promises', async () => {
    await allSettled([
      Promise.resolve(33),
      new Promise((resolve) => setTimeout(() => resolve(66), 0)),
      99,
      Promise.reject(new Error('an error')),
    ]).then((data) => {
      expect(data).toEqual([
        { status: 'fulfilled', value: 33 },
        { status: 'fulfilled', value: 66 },
        { status: 'fulfilled', value: 99 },
        { status: 'rejected', reason: 'an error' },
      ]);
    });
  });
});
