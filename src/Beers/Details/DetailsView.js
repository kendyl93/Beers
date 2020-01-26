import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import EmptyView from '../../UI/EmptyView';
import { getBeers } from '../model/selectors';
import Details from './Details';
import WithSimilar from '../../HOC/WithSimilar';

const STANDARD_DEVIATION_VALUE_INDEX = 1;

const byId = sourceId => ({ id }) => id === sourceId;

const ascending = index => (a, b) => a[index] - b[index];

const calculateDifference = sourceValue => value => sourceValue - value;

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

  const calculateIbuDifference = calculateDifference(sourceIbu);
  const calculateAbvDifference = calculateDifference(sourceAbv);
  const calculateEbcDifference = calculateDifference(sourceEbc);

  const ascendingStandardDeviation = ascending(STANDARD_DEVIATION_VALUE_INDEX);

  const withStandardDeviation =
    beers &&
    beers
      .map(({ ibu = 0, abv = 0, ebc = 0, id }) => {
        const ibuDifference = calculateIbuDifference(ibu);
        const abvDifference = calculateAbvDifference(abv);
        const ebcDifference = calculateEbcDifference(ebc);

        return [
          id,
          standardDeviation([ibuDifference, abvDifference, ebcDifference])
        ];
      })
      .sort(ascendingStandardDeviation);

  const similar = withStandardDeviation && [
    withStandardDeviation[0][0],
    withStandardDeviation[1][0],
    withStandardDeviation[2][0]
  ];

  return similar;
};

const DetailsView = ({ beers }) => {
  const { id: currentBeerId } = useParams();
  const byCurrentBeerId = byId(Number(currentBeerId));
  const beer = beers && beers.find(byCurrentBeerId);
  const getSimilarIdsToCurrentBeer = getSimilarIds(beer);
  const similar = getSimilarIdsToCurrentBeer(beers);

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
