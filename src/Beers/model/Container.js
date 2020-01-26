import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import fetchBeers from './fetchBeers';
import { getBeersError, getBeers, getBeersPending } from './selectors';
import { addPage } from '../Pagination/actions';
import { getPage } from '../Pagination/selectors';
import Beers from '../Components/Beers';

const mapStateToProps = ({ beersReducer, paginationReducer }) => ({
  error: getBeersError(beersReducer),
  beers: getBeers(beersReducer),
  pending: getBeersPending(beersReducer),
  page: getPage(paginationReducer)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchBeers, addPage }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Beers);
