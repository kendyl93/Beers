import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import EmptyView from '../../UI/EmptyView';
import { getBeers } from '../model/selectors';
import Details from './Details';
import WithSimilar from '../../HOC/WithSimilar';

const byId = sourceId => ({ id }) => id === sourceId;

const DetailsView = ({ beers }) => {
  const { id: currentBeerId } = useParams();
  const byCurrentBeerId = byId(Number(currentBeerId));
  const beer = beers && beers.find(byCurrentBeerId);
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
