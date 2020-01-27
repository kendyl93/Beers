import React, { Component } from 'react'
// import { ThumbContext } from './../Page/SuggestionList/SuggestionList'

import classes from './Thumbnail.scss'

const thumbnail = (props) => {

	const {
		image_url,
		name,
		tagline } = props.item,
		image = !(/keg\.png/i.test(image_url)),
		cover = image ? classes['bottle-cover'] : classes['keg-cover'],
		style = {
			width: '100px',
			height: image ? '150px' : '140px',
			backgroundImage: `url("${image_url}")`
		};
	return (
		<div className={classes.Thumbnail}>
				<div
					className={cover}
					style={style}
				>
				</div>
				<div className={classes.title}>{name}</div>
				<div className={classes.slogan}>{tagline}</div>
			</div>
	)
}

export default thumbnail
