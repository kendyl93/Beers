import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import EmptyView from '../../UI/EmptyView';
import { getBeers } from '../model/selectors';
import Details from './Details';

const byId = sourceId => ({ id }) => id === sourceId;

const DetailsView = ({ beers }) => {
  const { id: currentBeerId } = useParams();
  const byCurrentBeerId = byId(Number(currentBeerId));
  const currentBeer = beers && beers.find(byCurrentBeerId);

  return currentBeer ? <Details beer={currentBeer} /> : <EmptyView />;
};

DetailsView.propTypes = {
  beers: PropTypes.array
};

const mapStateToProps = ({ beersReducer }) => ({
  beers: getBeers(beersReducer)
});

export default connect(mapStateToProps)(DetailsView);
