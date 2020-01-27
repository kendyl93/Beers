import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Thumbnail from '../../../Components/Thumbnail/Thumbnail';
import LoadingSpinner from '../../../Components/UI/LoadingSpinner/LoadingSpinner';
import {axios_beerApi} from '../../../api';
import { itemErrorChecker, statusHandler } from '../../../ErrorHandler';
import * as actionsCreator from '../../../store/actions/index';

import './List.scss';

class List extends Component {
  state = {
    items: [],
    page: null,
    per_page: 20,
    isInfiniteScrollON: true,
    isLoadingContent: false,
    isError: false,
    isEndOfList: false
  };

  nextBeersDownloader = () => {
    const { per_page } = this.state;
    let storedItems = [...this.state.items];
    let page = this.state.page + 1;
    this.setState({
      isLoadingContent: true,
      isError: false
    });
    const api = 'https://api.punkapi.com/v2/beers';
    const query = `${api}?page=${page}&per_page=${per_page}`;
    axios_beerApi
      .get(query)
      .then(res => {
        console.log(res);
        if (statusHandler(res)) throw statusHandler(res);

        return res.data;
      })
      .then(data => {
        return data;
      })
      .then(items => {
        if (itemErrorChecker(items)) return;
        if (items.length !== 0) storedItems = storedItems.concat(items);
        // if the queries reached the end of list
        if (items.length === 0) {
          page--;
          this.setState({ isEndOfList: true });
        }
        this.setState({
          items: storedItems,
          page,
          isLoadingContent: false
        });
      });
  };

  handleScroll = e => {
    const { isEndOfList } = this.state;
    if (isEndOfList)
      return window.removeEventListener('scroll', this.handleScroll);
    const scrolled = window.innerHeight + window.scrollY;
    const preBottom = window.document.body.offsetHeight;
    const { items } = this.state;
    const isAlreadyLoading = this.state.isLoadingContent;
    console.log({ AAA: document.body.offsetHeight });
    if (scrolled >= preBottom && items.length && !isAlreadyLoading)
      this.nextBeersDownloader();
  };

  componentDidMount = () => {
    const { isEndOfList, isInfiniteScrollON } = this.state;
    console.log({ isInfiniteScrollON });
    this.nextBeersDownloader();
    if (!isEndOfList && isInfiniteScrollON)
      window.addEventListener('scroll', this.handleScroll);
  };

  componentWillUnmount = () => {
    return window.removeEventListener('scroll', this.handleScroll);
  };

  render() {
    const { items, isLoadingContent, isError, isEndOfList } = this.state;
    const errorMessage = <p>An error occured getting data</p>;
    const itemList = (
      <ul className="item-list">
        {items.map(item => (
          <li
            className="item"
            key={item.id}
            onClick={() => {
              this.props.openModalHandler();
              console.log(item, 'hello from sending item from list');
              this.props.itemStoreHandler(item);
            }}
          >
            <Link to={`/beer/:${item.id}`}>
              <Thumbnail item={item} />
            </Link>
          </li>
        ))}
      </ul>
    );
    const listEnd = isEndOfList && <p>That's all beers</p>;
    const loading = isLoadingContent && <LoadingSpinner />;
    const content = !isError ? itemList : errorMessage;
    if (!this.state.isInfiniteScrollON && this.props.isModalOpened)
      window.removeEventListener('scroll', this.handleScroll);
    // handling errors while fetching contents
    return (
      <div className="List">
        {content}
        {loading}
        {listEnd}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    beerDetails: state.beerDetails.beer,
    isModalOpened: state.modalWithDetails.isOpened
  };
};

const mapDispatchToProps = dispatch => {
  return {
    itemStoreHandler: beer => dispatch(actionsCreator.getBeer(beer)),
    openModalHandler: () => dispatch(actionsCreator.openModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
