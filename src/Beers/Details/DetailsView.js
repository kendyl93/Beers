import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import EmptyView from '../../UI/EmptyView';
import { getBeers } from '../model/selectors';
import Details from './Details';
import WithSimilar from '../../HOC/WithSimilar';

const BEER_ID_INDEX = 0;
const STANDARD_DEVIATION_VALUE_INDEX = 1;

const byId = sourceId => ({ id }) => id === sourceId;

const ascending = index => (a, b) => a[index] - b[index];

const calculateDifference = sourceValue => value => sourceValue - value;

const calculateSourceDifference = source => source.map(calculateDifference);

const add = (sum, value) => sum + value;

const average = data => {
  const sum = data.reduce(add);

  return sum / data.length;
};

const squareDifference = data => average =>
  data.map(value => (value - average) ** 2);

const standardDeviation = data => {
  const averageData = average(data);
  const dataSquareDifference = squareDifference(data)(averageData);
  const averageSquareDifference = average(dataSquareDifference);
  const roundedStandardDeviation = parseFloat(
    Math.sqrt(averageSquareDifference).toFixed(2)
  );

  return roundedStandardDeviation;
};
const getSimilarIds = sourceBeer => beers => {
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

const DetailsView = ({ beers }) => {
  const { id: currentBeerId } = useParams();
  const byCurrentBeerId = byId(Number(currentBeerId));
  const beer = beers && beers.find(byCurrentBeerId);
  const getSimilarIdsToCurrentBeer = beer && getSimilarIds(beer);
  const similar = beers && getSimilarIdsToCurrentBeer(beers);
  const DetailsWithSimilarBeers = WithSimilar(similar)(Details);

  return beer ? <DetailsWithSimilarBeers beer={beer} /> : <EmptyView />;
};

DetailsView.propTypes = {
  beers: PropTypes.array
};

const mapStateToProps = ({ beersReducer }) => ({
  beers: getBeers(beersReducer)
});

export default connect(mapStateToProps)(DetailsView);
