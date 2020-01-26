import {
  ascending,
  calculateSourceDifference,
  standardDeviation
} from '../../helpers';

const BEER_ID_INDEX = 0;
const STANDARD_DEVIATION_VALUE_INDEX = 1;

export const getSimilarIds = sourceBeer => beers => {
  const { ibu: sourceIbu = 0, abv: sourceAbv = 0, ebc: sourceEbc = 0 } =
    sourceBeer || {};
  const sourceValues = [sourceIbu, sourceAbv, sourceEbc];

  const [
    calculateIbuDifference,
    calculateAbvDifference,
    calculateEbcDifference
  ] = calculateSourceDifference(sourceValues);

  const ascendingStandardDeviation = ascending(STANDARD_DEVIATION_VALUE_INDEX);

  const withStandardDeviation =
    beers &&
    beers
      .map(({ ibu = 0, abv = 0, ebc = 0, id }) => {
        const ibuDifference = calculateIbuDifference(ibu);
        const abvDifference = calculateAbvDifference(abv);
        const ebcDifference = calculateEbcDifference(ebc);

        const differenceValues = [ibuDifference, abvDifference, ebcDifference];

        const standardDeviationValue = standardDeviation(differenceValues);

        const withId = [id, standardDeviationValue];

        return withId;
      })
      .sort(ascendingStandardDeviation);

  const withoutItself = withStandardDeviation.slice(1, 4);
  const similarIds = withoutItself.map(beer => beer[BEER_ID_INDEX]);

  return similarIds;
};
