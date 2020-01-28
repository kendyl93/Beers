import { getSimilarBeersQuery, randomQuery } from './index';

describe('api', () => {
  it('should return random query', () => {
    const randomOrSimilar = getSimilarBeersQuery();

    expect(randomOrSimilar).toEqual(randomQuery);
  });

  it('should return similar query', () => {
    const features = { abv: 2, ibu: 1, ebc: 1 };
    const randomOrSimilar = getSimilarBeersQuery(features);

    const expectedQuery =
      '?abv_lt=4&abv_gt=1&ibu_lt=3&ibu_gt=1&ebc_lt=3&ebc_gt=1&per_page=1';

    expect(randomOrSimilar).toEqual(expectedQuery);
  });

  it('should return similar query', () => {
    const features = { abv: 3, ibu: 30, ebc: 7.7 };
    const randomOrSimilar = getSimilarBeersQuery(features);

    const expectedQuery =
      '?abv_lt=5&abv_gt=1&ibu_lt=32&ibu_gt=28&ebc_lt=9.7&ebc_gt=5.7&per_page=1';

    expect(randomOrSimilar).toEqual(expectedQuery);
  });

  it('should return random query', () => {
    const features = { abv: 3, ibu: 30, ebc: null };
    const randomOrSimilar = getSimilarBeersQuery(features);

    const expectedQuery = '/random';

    expect(randomOrSimilar).toEqual(expectedQuery);
  });

  it('should return random query', () => {
    const features = { abv: 3, ibu: 0, ebc: 1 };
    const randomOrSimilar = getSimilarBeersQuery(features);

    const expectedQuery = '/random';

    expect(randomOrSimilar).toEqual(expectedQuery);
  });
});
