export const byId = sourceId => ({ id }) => id === sourceId;

export const ascending = index => (a, b) => a[index] - b[index];

const calculateDifference = sourceValue => value => sourceValue - value;

export const calculateSourceDifference = source =>
  source.map(calculateDifference);

const add = (sum, value) => sum + value;

const average = data => {
  const sum = data.reduce(add);

  return sum / data.length;
};

const squareDifference = data => average =>
  data.map(value => (value - average) ** 2);

export const standardDeviation = data => {
  const averageData = average(data);
  const dataSquareDifference = squareDifference(data)(averageData);
  const averageSquareDifference = average(dataSquareDifference);
  const roundedStandardDeviation = parseFloat(
    Math.sqrt(averageSquareDifference).toFixed(2)
  );

  return roundedStandardDeviation;
};
