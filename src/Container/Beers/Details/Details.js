import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LoadingOrError from '../../ErrorBoundary/LoadingOrError';
import { fethByBaseEndpoint } from '../../../api';
import { statusHandler, itemErrorChecker } from '../../../ErrorHandler';
import { getBeer, openModal } from '../../../store/actions/index';
import { getModalOpen, getBeerDetails } from '../../../store/actions/selectors';
import Thumbnail from '../../../Components/Thumbnail/Thumbnail';
import Body from './Body';

import './Details.scss';

class Details extends Component {
  state = {
    error: false,
    pending: false
  };

  shouldComponentUpdate(nextProps, nextState) {
    const { pending } = this.state;
    const { beer } = this.props;

    return nextProps.beer !== beer || pending;
  }

  // if item is undefined then read its id from location
  beer = sourceBeer => {
    const beer = sourceBeer
      ? null
      : window.location.pathname.match(/[^/beer/:]\d*/)[0];
    const { pending } = this.state;

    if (!pending) {
      this.setState({ pending: true });
    }

    if (typeof beer === 'string') {
      const { singleBeerHandler } = this;
      singleBeerHandler(beer);
    }
  };

  singleBeerHandler = async beerId => {
    this.setState({ error: false });
    const query = `/${beerId}`;

    try {
      const response = await fethByBaseEndpoint(query);
      const maybeError = statusHandler(response);
      if (maybeError) {
        throw statusHandler(response);
      }

      const data = await response.json();
      const item = data.shift();

      const dataExist = itemErrorChecker(data);
      if (dataExist) {
        return;
      }

      const { getItemHandler } = this.props;
      getItemHandler(item);
      this.setState({ pending: false });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  componentDidMount = () => {
    // here is it checks has the beer been preloaded or not
    const { beer } = this.props;
    const anyBeerContent = Object.keys(beer).length !== 0;
    if (anyBeerContent) {
      return;
    }
    this.beer();
  };

  render() {
    const { beer } = this.props || {};
    const {
      name,
      tagline,
      ibu,
      abv,
      ebc,
      description,
      food_pairing: foodPairing
    } = beer;
    const { error, pending } = this.state;

    return (
      <div className="details-wrapper row-spacing-double">
        {pending ? (
          <LoadingOrError error={error} />
        ) : (
          <Thumbnail item={beer} onlyImage xl />
        )}
        <Body
          name={name}
          tagline={tagline}
          ibu={ibu}
          abv={abv}
          ebc={ebc}
          description={description}
          foodPairing={foodPairing}
        />
      </div>
    );
  }
}

Details.propTypes = {
  beer: PropTypes.object,
  getItemHandler: PropTypes.func
};

const mapStateToProps = ({ beerDetails, modalWithDetails }) => ({
  beer: getBeerDetails(beerDetails),
  modalWithDetails: getModalOpen(modalWithDetails)
});

const mapDispatchToProps = dispatch => ({
  getItemHandler: beer => dispatch(getBeer(beer)),
  onModalOpen: () => dispatch(openModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(Details);
