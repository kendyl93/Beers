import { getSimilarIds } from './utils';

describe('utils', () => {
  it('should return similar beers ids', () => {
    const sourceBeer = { id: 1, ibv: 25, abv: 25, ebc: 25 };
    const beersToCompare = [
      { id: 2, ibv: 25, abv: 24, ebc: 24 },
      { id: 3, ibv: 23, abv: 25, ebc: 25 },
      { id: 4, ibv: 23, abv: 25, ebc: 30 },
      { id: 5, ibv: 80, abv: 25, ebc: 4 },
      { id: 6, ibv: 60, abv: 65, ebc: 0 }
    ];

    const allBeers = [sourceBeer, ...beersToCompare];

    const similarIds = getSimilarIds(sourceBeer)(allBeers).sort();

    expect(similarIds).toEqual([2, 3, 4]);
  });
});
