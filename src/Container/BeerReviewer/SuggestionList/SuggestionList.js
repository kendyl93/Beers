import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actionsCreator from '../../../store/actions/index';
import Thumbnail from '../../../Components/Thumbnail/Thumbnail';
import LoadingOrError from '../../ErrorBoundary/LoadingOrError';
import { axiosBeerApi } from '../../../api';
import { statusHandler, itemErrorChecker } from '../../../ErrorHandler';

import './SuggestionList.scss';


class SuggestionList extends Component {
  state = {
    isItemFetching: false,
    pending: false,
    error: false,
    quantity: 3,
    fetchedItems: [],
    items: [],
    loadingItem: null
  };

  //download random items
	randomItem = index => {
		const { fetchedItems } = this.state;
    //we provide index to know a place to put a new item
		this.setState(
			{
				isItemFetching: true,
				error: false
			},
			async () => {
				const query = '/random';
	  
				try {
					const response = await axiosBeerApi.get(query);
	  
					const maybeError = statusHandler(response);
					if (maybeError) {
						throw statusHandler(response);
					}
	  
					const { data } = response;
	  
					const dataExist = itemErrorChecker(data);
					if (dataExist) {
						return;
					}

					const item = data.shift();
					
					const { fetchedItems } = this.state;
					const downloadItems = [...fetchedItems];
					// here is we test what to do with new item,
					// to splice it or push into the array
	  
					if (index) {
						downloadItems.splice(index, 0, item);
					} else {
						downloadItems.push(item);
					}
					
					this.setState({
						isItemFetching: false,
						fetchedItems: downloadItems
					})
			  
				} catch (error) {
					console.error(error)
				}
			}
		);
  };
  // download and store items
  downloadedItems = id => {
    // in this test we find specified id in the fetched items and remove it
    // allowing to download new one
    let alreadyFetched = [],
      index;
    if (id) {
      alreadyFetched = [...this.state.fetchedItems];
      index = alreadyFetched.findIndex(e => e.id === id);
      alreadyFetched.splice(index, 1);
    }
    // here is we download new items
    this.setState(
      {
        pending: true,
        fetchedItems: alreadyFetched
        // items: []
      },
      () => {
        // deside how many items to be downloaded
        let i = this.state.quantity - alreadyFetched.length;
        while (i--) {
          this.randomItem(index);
        }
      }
    );
  };

  renderedBeers = () => {
    //verification whether the loading is finished and items need to be rendered
    const { fetchedItems, pending, quantity } = this.state;
    if (fetchedItems.length === quantity && pending) {
      const fetched = [...fetchedItems];
      this.setState({
        pending: false,
        items: fetched
      });
    }
  };

  componentDidMount = () => {
    this.downloadedItems();
  };

  render() {
    const { pending, items, error } = this.state;
    const loading = pending && <LoadingOrError error={error} />;
    this.renderedBeers();
    return (
      <div className="SuggestionList">
        <h4 className="title">With this beer people also like next:</h4>
        {loading}
        {!pending && (
          <ul className="list">
            {items.map(item => (
              <li className="item" key={item.id}>
                <Link
                  to={`/beer/:${item.id}`}
                  onClick={() => {
                    this.downloadedItems(item.id);
                    this.props.itemStoreHandler(item);
                  }}
                >
                  <Thumbnail item={item} />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    getBeer: state.beerDetails.beer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    itemStoreHandler: beer => dispatch(actionsCreator.getBeer(beer))
  };
};

SuggestionList.propTypes = {
  isItemFetching: PropTypes.bool,
  pending: PropTypes.bool,
  error: PropTypes.bool,
  quantity: PropTypes.number,
  fetchedItems: PropTypes.array,
  items: PropTypes.array
};

export default connect(mapStateToProps, mapDispatchToProps)(SuggestionList);
