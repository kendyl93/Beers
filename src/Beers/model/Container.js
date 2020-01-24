import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import fetchBeers from './fetchBeers';
import { getBeersError, getBeers, getBeersPending } from './selectors';
import Beers from '../Components/Beers';

const mapStateToProps = ({ beersReducer }) => ({
  error: getBeersError(beersReducer),
  beers: getBeers(beersReducer),
  pending: getBeersPending(beersReducer)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchBeers }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Beers);
