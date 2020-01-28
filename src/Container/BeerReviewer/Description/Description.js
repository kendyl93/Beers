import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoadingOrError from '../../ErrorBoundary/LoadingOrError';
import { axiosBeerApi } from '../../../api';
import { statusHandler, itemErrorChecker } from '../../../ErrorHandler';
import { getBeer, openModal } from '../../../store/actions/index';
import { getModalOpen, getBeerDetails } from '../../../store/actions/selectors';
import PropTypes from 'prop-types'

import './Description.scss';

const ImageContainer = ({ children, image, imageUrl }) => (
  <div
    className={image ? 'bottle-cover' : 'keg-cover'}
    style={{
      width: '150px',
      height: image ? '350px' : '250px',
      backgroundImage: `url("${imageUrl}")`
    }}
  >
    {children}
  </div>
);

class Description extends Component {
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
    const beer = sourceBeer ? null : window.location.pathname.match(/[^/beer/:]\d*/)[0];
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
      const response = await axiosBeerApi.get(query);

      const maybeError = statusHandler(response);
      if (maybeError) {
        throw statusHandler(response);
      }

      const { data } = response;
      const item = data.shift();

      const dataExist = itemErrorChecker(data);
      if (dataExist) {
        return;
      }

      const { getItemHandler } = this.props;
      getItemHandler(item);
      this.setState({ pending: false });
    } catch (error) {
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
    const {
      beer: {
        image_url: imageUrl,
        name,
        tagline,
        ibu,
        abv,
        ebc,
        description,
        food_pairing: foodPairing
      }
    } = this.props || {};
    const { error, pending } = this.state;

    const image = !/keg\.png/i.test(imageUrl);
    const loadingSpinner = pending && (
      <div className="spinner-cover">
        <LoadingOrError error={error} />
      </div>
    );

    return (
      <div className="Description">
        <ImageContainer image={image} imageUrl={imageUrl}>
          {loadingSpinner}
        </ImageContainer>
        <h1>FROM container</h1>
        <div className="text-container">
          <h3 className="title">{name}</h3>
          <div className="slogan">{tagline}</div>
          <div className="feature-container">
            <div className="features-name">
              <strong>IBU</strong>: {ibu}
            </div>
            <div className="features-name">
              <strong>ABV</strong>: {abv}%
            </div>
            <div className="features-name">
              <strong>EBC</strong>: {ebc}
            </div>
          </div>
          <div className="description">{description}</div>
          <div className="pairing-list">
            <p>Best served with:</p>
            <ul className="pairing-list">
              {foodPairing
                ? foodPairing.map(el => <li key={el}>{el}</li>)
                : 'no specified food'}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

Description.propTypes = {
  beer: PropTypes.object,
  getItemHandler: PropTypes.func
}

const mapStateToProps = ({ beerDetails, modalWithDetails }) => ({
  beer: getBeerDetails(beerDetails),
  modalWithDetails: getModalOpen(modalWithDetails)
});

const mapDispatchToProps = dispatch => ({
  getItemHandler: beer => dispatch(getBeer(beer)),
  onModalOpen: () => dispatch(openModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(Description);
