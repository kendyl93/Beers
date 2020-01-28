import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoadingOrError from '../../ErrorBoundary/LoadingOrError';
import { axiosBeerApi } from '../../../api';
import { statusHandler, itemErrorChecker } from '../../../ErrorHandler';
import * as actionsCreator from '../../../store/actions/index';

import './Description.scss';

class Description extends Component {
  state = {
    isError: false,
    isLoading: false
  };

  singleBeerHandler = beerId => {
    this.setState({ isError: false });
    const query = `/${beerId}`;
    axiosBeerApi
      .get(query)
      .then(res => {
        if (statusHandler(res)) throw statusHandler(res);
        return res.data.shift();
      })
      .catch(er => er)
      .then(item => {
        if (itemErrorChecker(item)) return;
        this.props.getItemHandler(item);
        this.setState({ isLoading: false });
      });
  };

  // if item is undefined then read its id from location
  beer = beer => {
    beer = beer ? null : window.location.pathname.match(/[^/beer/:]\d*/)[0];
    if (!this.state.isLoading) {
      this.setState({ isLoading: true });
    }
    if (typeof beer === 'string') {
      // otherwise the beer is specified and must be fetched
      this.singleBeerHandler(beer);
    }
  };

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.beer !== this.props.beer || this.state.isLoading;
  }

  componentDidMount = () => {
    // here is it checks has the beer been preloaded or not
    const beer = this.props.beer;
    if (Object.keys(beer).length !== 0 && beer.constructor === Object) return;
    this.beer();
  };

  render() {
    console.log({aa: this.props})
    const {
      image_url,
      name,
      tagline,
      ibu,
      abv,
      ebc,
      description,
      food_pairing
    } = this.props.beer || {};
    const { isError } = this.state;
			//test what is a kind of image cover for bottle or keg
			const image = !(/keg\.png/i.test(image_url));
    const loadingSpinner = this.state.isLoading && (<div className="spinner-cover"><LoadingOrError error={isError}/></div>);
			const imageContainer = (
        <div
					className={image ? 'bottle-cover' : 'keg-cover'}
					style={{
						width: '150px',
						height: image ? '350px' : '250px',
						backgroundImage: `url("${image_url}")`
					}}
				>
					{loadingSpinner}
				</div>
);
    
return (
      <div className="Description">
        {imageContainer}
        <div className="text-container">
          <h3 className="title">{name}</h3>
          <div className="slogan">{tagline}</div>
          <div className="feature-container">
  <div className="features-name">
<strong>IBU</strong>
:
{' '}
{ibu}
</div>
  <div className="features-name">
<strong>ABV</strong>
:
{' '}
{abv}
%
</div>
  <div className="features-name">
<strong>EBC</strong>
:
{' '}
{ebc}
</div>
          </div>
          <div className="description">{description}</div>
          <div className="pairing-list">
            <p>Best served with:</p>
  <ul className="pairing-list">
  {food_pairing ? food_pairing.map(el =>
  <li key={el}>{el}</li>)
                : 'no specified food'}
  </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    beer: state.beerDetails.beer,
    modalWithDetails: state.modalWithDetails.isOpened
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getItemHandler: beer => dispatch(actionsCreator.getBeer(beer)),
    onModalOpen: () => dispatch(actionsCreator.openModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Description);
;