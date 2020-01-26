import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import EmptyView from '../../UI/EmptyView';
import { getBeers } from '../model/selectors';
import Details from './Details';
import WithSimilar from '../../HOC/WithSimilar';

const byId = sourceId => ({ id }) => id === sourceId;

const add = (sum, value) => sum + value;

const average = data => {
  const sum = data.reduce(add);

  return sum / data.length;
};

const squareDifference = data =>
  data.map(value => (value - average(data)) ** 2);

const standardDeviation = data => {
  const dataSquareDifference = squareDifference(data);

  return Math.sqrt(average(dataSquareDifference));
};

const DetailsView = ({ beers }) => {
  const { id: currentBeerId } = useParams();
  const byCurrentBeerId = byId(Number(currentBeerId));
  const beer = beers && beers.find(byCurrentBeerId);

  const { ibu: sourceIBU = 0, abv: sourceABV = 0, ebc: sourceEBC = 0 } =
    beer || {};
  const KORR =
    beers &&
    beers.map(({ ibu = 0, abv = 0, ebc = 0 }) => {
      const ibuDifference = sourceIBU - ibu;
      const abvDifference = sourceABV - abv;
      const ebcDifference = sourceEBC - ebc;

      return standardDeviation([ibuDifference, abvDifference, ebcDifference]);
    });
  console.log({ KORR });
  const similar = beers && [beers[0], beers[1], beers[2]]; // TODO

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
