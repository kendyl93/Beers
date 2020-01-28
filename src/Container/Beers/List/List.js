import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import LoadingOrError from '../../ErrorBoundary/LoadingOrError';
import { fethByBaseEndpoint } from '../../../api';
import { itemErrorChecker, statusHandler } from '../../../ErrorHandler';
import { getBeer, openModal } from '../../../store/actions/index';
import { getBeerDetails, getModalOpen } from '../../../store/actions/selectors';
import ListView from '../../../Components/UI/ListView/ListView';

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

    const query = `?page=${page}&beersPerPage=${beersPerPage}`;

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
    const { handleScroll } = this;

    if (maybeEndOfListReached) {
      window.removeEventListener('scroll', handleScroll);
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
    const { handleScroll } = this;
    this.nextBeersDownloader();

    const canBeLoadedMrore = !maybeEndOfListReached && allowInfiniteScroll;

    if (canBeLoadedMrore) {
      window.addEventListener('scroll', handleScroll);
    }
  };

  componentWillUnmount = () => {
    const { handleScroll } = this;

    return window.removeEventListener('scroll', handleScroll);
  };

  render() {
    const { items, pending, maybeError, maybeEndOfListReached } = this.state;
    const { openModalHandler, beersStoreHandler } = this.props;

    const handleItemClick = item => {
      openModalHandler();
      beersStoreHandler(item);
    };

    const errorMessage = <p>An error occured getting data</p>;

    const endOfListMessage = maybeEndOfListReached && <p>THE END</p>;
    const loadingView = pending && <LoadingOrError error={maybeError} />;
    const body = !maybeError ? (
      <ListView items={items} handleItemClick={handleItemClick} />
    ) : (
      errorMessage
    );

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
