import React from 'react';
import classes from './Backdrop.scss';
import { connect } from 'react-redux';

import * as actionsCreator from '../../../store/actions/index';

const backdrop = (props) => {
	if (props.isOpened) {return (
	<div
		className={classes.Backdrop}
		onClick={props.onModalClose}
	/>
	)}
}

const mapStateToProps = state => {
	return {isOpened: state.modalDscrp.isOpened}
}

const mapDispatchToProps = dispatch => {
	return { onModalClose: () => 
		dispatch(actionsCreator.closeModal()) }
}
export default connect(mapStateToProps, mapDispatchToProps)(backdrop)