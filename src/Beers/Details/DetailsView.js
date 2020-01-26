import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import EmptyView from '../../UI/EmptyView';
import { getBeers } from '../model/selectors';
import Details from './Details';
import WithSimilar from '../../HOC/WithSimilar';
import { byId } from '../../helpers';
import { getSimilarIds } from './utils';

const DetailsView = ({ beers }) => {
  const { id: currentBeerId } = useParams();
  const byCurrentBeerId = byId(Number(currentBeerId));
  const beer = beers && beers.find(byCurrentBeerId);
  const getSimilarIdsToCurrentBeer = beer && getSimilarIds(beer);
  const similar = beers && getSimilarIdsToCurrentBeer(beers);

  const similarBeers =
    beers && beers.filter(({ id: sourceId }) => similar.includes(sourceId));

  const DetailsWithSimilarBeers = WithSimilar(similarBeers)(Details);

  return beer ? <DetailsWithSimilarBeers beer={beer} /> : <EmptyView />;
};

DetailsView.propTypes = {
  beers: PropTypes.array
};

const mapStateToProps = ({ beersReducer }) => ({
  beers: getBeers(beersReducer)
});

export default connect(mapStateToProps)(DetailsView);
