/* global expect */
import { commonSort } from '../common.js';

const DESC = 'desc';
const ASC = 'asc';
const NUMBER = 'number';
const STRING = 'string';
const PROTECTION = 'protection';

function setup() {
  const sortArray = [
    { number: 1,
      string: 'a',
      protection: 'Little/none'
    },
    { number: 10,
      string: 'c',
      protection: 'Some'
    },
    { number: 9,
      string: 'b',
      protection: 'Most'
    }
  ];
  return { sortArray };
}

describe('reducers', () => {
  describe('common reducer functions', () => {
    it('should sort numbers', () => {
      const { sortArray } = setup();
      sortArray.sort(commonSort(STRING, ASC));

      expect(sortArray[0][NUMBER]).toEqual(1);
      expect(sortArray[1][NUMBER]).toEqual(9);
      expect(sortArray[2][NUMBER]).toEqual(10);
    });

    it('should sort strings', () => {
      const { sortArray } = setup();
      sortArray.sort(commonSort(STRING, DESC));

      expect(sortArray[0][STRING]).toEqual('c');
      expect(sortArray[1][STRING]).toEqual('b');
      expect(sortArray[2][STRING]).toEqual('a');
    });

    it('should sort protection levels', () => {
      const { sortArray } = setup();
      sortArray.sort(commonSort(PROTECTION, DESC));

      expect(sortArray[2][PROTECTION]).toEqual('Little/none');
      expect(sortArray[1][PROTECTION]).toEqual('Some');
      expect(sortArray[0][PROTECTION]).toEqual('Most');
    });
  });
});
