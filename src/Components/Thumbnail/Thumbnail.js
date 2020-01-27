import React, { Component } from 'react';

// import { ThumbContext } from '../Page/SuggestionList/SuggestionList';
import './Thumbnail.scss';

const thumbnail = props => {
  const { image_url, name, tagline } = props.item;
  const image = !/keg\.png/i.test(image_url);

  const style = {
    width: '100px',
    height: image ? '150px' : '140px',
    backgroundImage: `url("${image_url}")`
  };

  return (
    <div className="Thumbnail">
      <div className={image ? 'bottle-cover' : 'keg-cover'} style={style} />
      <div className="title">{name}</div>
      <div className="slogan">{tagline}</div>
    </div>
  );
};

export default thumbnail;
