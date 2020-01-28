import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getBeer } from '../../../store/actions/index';
import LoadingOrError from '../../ErrorBoundary/LoadingOrError';
import { statusHandler, itemErrorChecker } from '../../../ErrorHandler';
import { fethByBaseEndpoint } from '../../../api';
import { getBeerDetails } from '../../../store/actions/selectors';
import ListView from '../../../Components/UI/ListView/ListView';

import './Similar.scss';

class Similar extends Component {
  state = {
    pending: false,
    error: false,
    quantity: 3,
    fetchedItems: [],
    items: []
  };

  getRandomBeer = async indexOfANewBeer => {
    const setSuggestedBeers = async () => {
      const query = '/random';

      try {
        const response = await fethByBaseEndpoint(query);
        const data = await response.json();
        const beer = data.shift();

        const { fetchedItems } = this.state;
        const downloadItems = fetchedItems;

        if (indexOfANewBeer) {
          downloadItems.splice(indexOfANewBeer, 0, beer);
        } else {
          downloadItems.push(beer);
        }

        this.setState({
          fetchedItems: downloadItems
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };
    this.setState(
      {
        error: false
      },
      await setSuggestedBeers()
    );
  };

  downloadedItems = id => {
    const { fetchedItems } = this.state;
    const alreadyFetched = fetchedItems;
    const bySourceIndex = ({ id: sourceId }) => sourceId === id;
    const index = alreadyFetched.findIndex(bySourceIndex);

    alreadyFetched.splice(index, 1);

    const fetchByCount = () => {
      const { getRandomBeer } = this;
      const { quantity } = this.state;

      let countLeftToFetch = quantity - alreadyFetched.length;
      // eslint-disable-next-line no-plusplus
      while (countLeftToFetch--) {
        getRandomBeer(index);
      }
    };

    this.setState(
      {
        pending: true,
        fetchedItems: alreadyFetched
      },
      () => fetchByCount()
    );
  };

  renderBeers = () => {
    const { fetchedItems, pending, quantity } = this.state;
    const beersAreReadyForRender = fetchedItems.length === quantity && pending;

    if (!beersAreReadyForRender) {
      return;
    }

    this.setState({
      pending: false,
      items: fetchedItems
    });
  };

  componentDidMount = () => {
    this.downloadedItems();
  };

  render() {
    const { pending, items, error } = this.state;
    const { itemStoreHandler } = this.props;
    const { renderBeers, downloadedItems } = this;

    const loading = pending && <LoadingOrError error={error} />;

    const handleItemClick = item => {
      const { id } = item;
      downloadedItems(id);
      itemStoreHandler(item);
    };

    renderBeers();

    return (
      <div className="similar">
        <h4 className="hint">Have you tried one of theese ?</h4>
        {loading}
        {!pending && (
          <ListView items={items} handleItemClick={handleItemClick} />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ beerDetails }) => ({
  getBeer: getBeerDetails(beerDetails)
});

const mapDispatchToProps = dispatch => ({
  itemStoreHandler: beer => dispatch(getBeer(beer))
});

Similar.propTypes = {
  itemStoreHandler: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Similar);
