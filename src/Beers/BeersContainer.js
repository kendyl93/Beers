import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import fetchBeers from './fetchBeers';
import { getBeersError, getBeers, getBeersPending } from './reducer';
import Beers from './Components/Beers';

const mapStateToProps = state => ({
  error: getBeersError(state.beersReducer),
  beers: getBeers(state.beersReducer),
  pending: getBeersPending(state.beersReducer)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchBeers }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Beers);
