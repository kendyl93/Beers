import {
  add,
  ascending,
  average,
  averagedStandardDeviation,
  calculateDifference
} from './helpers';

describe('helpers', () => {
  it('should calculate average', () => {
    const data = [20, 10, 25, 25, 20];
    const calculatedAverage = average(data);

    const expectedAverage = 20;

    expect(calculatedAverage).toEqual(expectedAverage);
  });

  it('should calculate averaged standard deviation', () => {
    const data = [20, 10, 25, 25, 20];
    const calculatedAveragedStandardDeviation = averagedStandardDeviation(data);

    const expectedAveragedStandardDeviation = 5.48;

    expect(calculatedAveragedStandardDeviation).toEqual(
      expectedAveragedStandardDeviation
    );
  });

  it('should return the difference value', () => {
    const difference = calculateDifference(10)(7);
    const expectedValue = 3;

    expect(difference).toEqual(expectedValue);
  });

  it('should return sum value', () => {
    const sum = add(10, 7);
    const expectedValue = 17;

    expect(sum).toEqual(expectedValue);
  });

  it('should sort array with ascending values at index 0', () => {
    const sourceData = [
      [5, 3],
      [4, 123],
      [1, 1],
      [8, 3],
      [0, 99]
    ];

    const expectedData = [
      [0, 99],
      [1, 1],
      [4, 123],
      [5, 3],
      [8, 3]
    ];

    const byIndexNo = 0;

    const sortedData = sourceData.sort(ascending(byIndexNo));

    expect(sortedData).toEqual(expectedData);
  });

  it('should sort array with ascending values at index 1', () => {
    const sourceData = [
      [5, 3],
      [4, 123],
      [1, 1],
      [8, 3],
      [0, 99]
    ];

    const expectedData = [
      [1, 1],
      [5, 3],
      [8, 3],
      [0, 99],
      [4, 123]
    ];

    const byIndexNo = 1;

    const sortedData = sourceData.sort(ascending(byIndexNo));

    expect(sortedData).toEqual(expectedData);
  });
});
