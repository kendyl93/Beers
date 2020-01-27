import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchBeers, loadMoreBeers } from './fetchBeers';
import {
  getBeersError,
  getBeers,
  getBeersPending,
  getMoreBeers,
  getMoreMoreBeersLoading
} from './selectors';
import { getPage } from '../Pagination/selectors';
import Beers from '../Components/Beers';

const mapStateToProps = ({ beersReducer, paginationReducer }) => ({
  error: getBeersError(beersReducer),
  beers: getBeers(beersReducer),
  pending: getBeersPending(beersReducer),
  moreBeers: getMoreBeers(beersReducer),
  page: getPage(paginationReducer),
  loading: getMoreMoreBeersLoading(beersReducer)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchBeers, loadMoreBeers }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Beers);
