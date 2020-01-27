import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Description.scss';
import LoadingSpinner from '../../../Components/UI/LoadingSpinner/LoadingSpinner';
import axios_beerApi from '../../../APIs/beerApi';
import { statusHandler, itemErrorChecker } from '../../../ErrorHandler';
import * as actionsCreator from '../../../store/actions/index';


class Description extends Component {

	state = {
		isError: false,
		isLoading: false
	}

	singleBeerHandler = (itemID) => {
		this.setState({ isError: false })
		const query = `/${itemID}`;
		axios_beerApi.get(query)
			.then(res => {
				if (statusHandler(res)) throw statusHandler(res);
				return res.data.shift()
			})
			.catch(er => er)
			.then(item => {
				if (itemErrorChecker(item)) return;
				this.props.getItemHandler(item)
				this.setState({ isLoading: false })
			})
	}

	//if item is undefined then read its id from location
	item = (beer) => {
		beer = beer ? null : window.location.pathname.match(/[^/beer/:]\d*/)[0];
		if (!this.state.isLoading) {
			this.setState({ isLoading: true })
		}
		if (typeof (beer) === 'string') {
			//otherwise the beer is specified and must be fetched
			this.singleBeerHandler(beer)
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.item !== this.props.item || this.state.isLoading
	}

	componentDidMount = () => {
		//here is it checks has the beer been preloaded or not
		const beer = this.props.item;
		if (Object.keys(beer).length !== 0 && beer.constructor === Object) return;
		this.item()
	}

	render() {
		const {
			image_url,
			name,
			tagline,
			ibu,
			abv,
			ebc,
			description,
			food_pairing } = this.props.item,
			//test what is a kind of image cover for bottle or keg
			image = !(/keg\.png/i.test(image_url)),
			loadingSpinner = this.state.isLoading && (<div className={classes['spinner-cover']}><LoadingSpinner /></div>),
			imageContainer = (
				<div
					className={image ? classes['bottle-cover'] : classes['keg-cover']}
					style={{
						width: '150px',
						height: image ? '350px' : '250px',
						backgroundImage: `url("${image_url}")`
					}}
				>
					{loadingSpinner}
				</div>);
		return (
			<div className={classes.Description}>
				{imageContainer}
				<div className={classes['text-container']}>
					<h3 className={classes.title}>{name}</h3>
					<div className={classes.slogan}>{tagline}</div>
					<div className={classes['feature-container']}>
						<div className={classes['features-name']}><strong>IBU</strong>: {ibu}</div>
						<div className={classes['features-name']}><strong>ABV</strong>: {abv}%</div>
						<div className={classes['features-name']}><strong>EBC</strong>: {ebc}</div>
					</div>
					<div className={classes.description}>{description}</div>
					<div className={classes['pairing-list']}>
						<p>Best served with:</p>
						<ul className={classes["pairing-list"]}>
							{food_pairing ? food_pairing.map(el =>
								<li key={el}>{el}</li>
							) : 'no specified food'}
						</ul>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		item: state.dscrpItem.item,
		modalDscrp: state.modalDscrp.isOpened
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getItemHandler: (item) => dispatch(actionsCreator.passItem(item)),
		onModalOpen: () => dispatch(actionsCreator.openModal())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Description)