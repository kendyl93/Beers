import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getBeer } from '../../../store/actions/index';
import Thumbnail from '../../../Components/Thumbnail/Thumbnail';
import LoadingOrError from '../../ErrorBoundary/LoadingOrError';
import { fethByBaseEndpoint } from '../../../api';
import { statusHandler, itemErrorChecker } from '../../../ErrorHandler';

import './Similar.scss';
import { getBeerDetails } from '../../../store/actions/selectors';

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

        const maybeError = statusHandler(response);
        if (maybeError) {
          throw statusHandler(response);
        }

        const data = await response.json();

        const dataExist = itemErrorChecker(data);
        if (dataExist) {
          return;
        }

        const beer = data.shift();

        const { fetchedItems } = this.state;
        const downloadItems = [...fetchedItems];
        // here is we test what to do with new item,
        // to splice it or push into the array

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

  // download and store items
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

    // here is we download new items
    this.setState(
      {
        pending: true,
        fetchedItems: alreadyFetched
      },
      () => fetchByCount()
    );
  };

  renderBeers = () => {
    // verification whether the loading is finished and items need to be rendered
    const { fetchedItems, pending, quantity } = this.state;
    const beersAreReadyForRender = fetchedItems.length === quantity && pending;

    if (beersAreReadyForRender) {
      this.setState({
        pending: false,
        items: fetchedItems
      });
    }
  };

  componentDidMount = () => {
    this.downloadedItems();
  };

  render() {
    const { pending, items, error } = this.state;
    const { itemStoreHandler } = this.props;
    const loading = pending && <LoadingOrError error={error} />;
    const { renderBeers, downloadedItems } = this;

    renderBeers();

    return (
      <div className="SuggestionList">
        <h4 className="title">With this beer people also like next:</h4>
        {loading}
        {!pending && (
          <ul className="list">
            {items.map(item => {
              const { id } = item;

              return (
                <li className="item" key={id}>
                  <Link
                    to={`/beer/${id}`}
                    onClick={() => {
                      downloadedItems(id);
                      itemStoreHandler(item);
                    }}
                  >
                    <Thumbnail item={item} />
                  </Link>
                </li>
              );
            })}
          </ul>
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
