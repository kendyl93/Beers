import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import EmptyView from '../../UI/EmptyView';
import { getBeers } from '../model/selectors';
import Details from './Details';
import WithSimilar from '../../HOC/WithSimilar';
import { byId } from '../../helpers';
import { getSimilarIds } from './utils';
import { getSingleBeer, CONFIG } from '../../api';

const DetailsView = ({ beers }) => {
  const { id: currentBeerId } = useParams();
  const byCurrentBeerId = byId(Number(currentBeerId));
  const beer = beers && beers.find(byCurrentBeerId);

  const [currentBeer, setCurrentBeer] = useState(beer);

  const getSimilarIdsToCurrentBeer = currentBeer && getSimilarIds(currentBeer);
  const similar =
    getSimilarIdsToCurrentBeer && getSimilarIdsToCurrentBeer(beers);

  useEffect(() => {
    if (currentBeer) {
      return;
    }

    const fetchApi = async () => {
      const endpoint = getSingleBeer(currentBeerId);
      const response = await fetch(endpoint, CONFIG);
      const data = await response.json();
      const beer = data.find(byCurrentBeerId);

      setCurrentBeer(beer);
    };

    fetchApi();
  }, [byCurrentBeerId, currentBeer, currentBeerId]);

  const similarBeers =
    similar && beers.filter(({ id: sourceId }) => similar.includes(sourceId));

  const DetailsWithSimilarBeers =
    similarBeers && WithSimilar(similarBeers)(Details);

  return currentBeer ? (
    <DetailsWithSimilarBeers beer={beer || currentBeer} />
  ) : (
    <EmptyView />
  );
};

DetailsView.propTypes = {
  beers: PropTypes.array
};

const mapStateToProps = ({ beersReducer }) => ({
  beers: getBeers(beersReducer)
});

export default connect(mapStateToProps)(DetailsView);
