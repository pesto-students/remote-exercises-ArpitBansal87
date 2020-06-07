import { aperture } from './aperture';

describe('aperture', () => {
  const sevenLs = [1, 2, 3, 4, 5, 6, 7];
  it('creates a list of n-tuples from a list', () => {
    expect(aperture(1, sevenLs)).toEqual([[1], [2], [3], [4], [5], [6], [7]]);
    expect(aperture(2, sevenLs)).toEqual([
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7],
    ]);
    expect(aperture(3, sevenLs)).toEqual([
      [1, 2, 3],
      [2, 3, 4],
      [3, 4, 5],
      [4, 5, 6],
      [5, 6, 7],
    ]);
    expect(aperture(4, [1, 2, 3, 4])).toEqual([[1, 2, 3, 4]]);
  });

  it('returns an empty list when `n` > `list.length`', () => {
    expect(aperture(6, [1, 2, 3])).toEqual([]);
    expect(aperture(1, [])).toEqual([]);
  });

  it('acts as a trasnducer when a transformer is given in the list position', () => {
    function evenNumberFilter(array) {
      return array.filter((ele) => ele % 2 === 0);
    }
    expect(aperture(3, evenNumberFilter(sevenLs))).toEqual([[2, 4, 6]]);
  });

  it('throws an error if incorrect argument type is passed', () => {
    expect(() => {
      aperture('a', [1, 2, 3]);
    }).toThrow(TypeError);
  });
});
