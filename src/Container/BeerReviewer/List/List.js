import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import Thumbnail from '../../../Components/Thumbnail/Thumbnail';
import LoadingOrError from '../../ErrorBoundary/LoadingOrError';
import { axiosBeerApi, ENDPOINT } from '../../../api';
import { itemErrorChecker, statusHandler } from '../../../ErrorHandler';
import { getBeer, openModal } from '../../../store/actions/index';
import { getBeerDetails, getModalOpen } from '../../../store/actions/selectors';

import './List.scss';

class List extends Component {
  state = {
    items: [],
    page: null,
    beersPerPage: 20,
    allowInfiniteScroll: true,
    pending: false,
    maybeError: false,
    maybeEndOfListReached: false
  };

  nextBeersDownloader = async () => {
    const { beersPerPage, items, page: sourcePage } = this.state;
    let storedItems = [...items];
    const page = sourcePage + 1;

    this.setState({
      pending: true,
      maybeError: false
    });

    const query = `${ENDPOINT}?page=${page}&beersPerPage=${beersPerPage}`;

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

      const anyData = data.length !== 0;
      if (anyData) {
        storedItems = [...storedItems, ...data];
      }

      const maybeEndOfList = data.length === 0;
      if (maybeEndOfList) {
        page - 1;
        this.setState({ maybeEndOfListReached: true });
      }
      this.setState({
        items: storedItems,
        page,
        pending: false
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  handleScroll = e => {
    const { maybeEndOfListReached, items, pending } = this.state;

    if (maybeEndOfListReached) {
      window.removeEventListener('scroll', this.handleScroll);
    }

    const { innerHeight, scrollY } = window;
    const scrolled = innerHeight + scrollY;
    const bodyOffsetHeight = window.document.body.offsetHeight;
    const countItems = items.length;
    const canBeLoadedMoreItems =
      scrolled >= bodyOffsetHeight && countItems && !pending;

    if (canBeLoadedMoreItems) {
      this.nextBeersDownloader();
    }
  };

  componentDidMount = () => {
    const { maybeEndOfListReached, allowInfiniteScroll } = this.state;

    this.nextBeersDownloader();

    const canBeLoadedMrore = !maybeEndOfListReached && allowInfiniteScroll;

    if (canBeLoadedMrore) {
      window.addEventListener('scroll', this.handleScroll);
    }
  };

  componentWillUnmount = () => {
    return window.removeEventListener('scroll', this.handleScroll);
  };

  render() {
    const { items, pending, maybeError, maybeEndOfListReached } = this.state;
    const { openModalHandler, beersStoreHandler } = this.props;

    const errorMessage = <p>An error occured getting data</p>;

    const itemList = (
      <ul className="item-list">
        {items.map(item => (
          <li
            className="item"
            key={item.id}
            onClick={() => {
              openModalHandler();
              beersStoreHandler(item);
            }}
          >
            <Link to={`/beer/:${item.id}`}>
              <Thumbnail item={item} />
            </Link>
          </li>
        ))}
      </ul>
    );

    const endOfListMessage = maybeEndOfListReached && <p>THE END</p>;
    const loadingView = pending && <LoadingOrError error={maybeError} />;
    const body = !maybeError ? itemList : errorMessage;

    return (
      <div className="List">
        {body}
        {loadingView}
        {endOfListMessage}
      </div>
    );
  }
}

List.propTypes = {
  openModalHandler: PropTypes.func,
  beersStoreHandler: PropTypes.func
};

const mapStateToProps = (beerDetails, modalWithDetails) => ({
  beerDetails: getBeerDetails(beerDetails),
  isModalOpened: getModalOpen(modalWithDetails)
});

const mapDispatchToProps = dispatch => ({
  beersStoreHandler: beer => dispatch(getBeer(beer)),
  openModalHandler: () => dispatch(openModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
