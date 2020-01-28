import React from 'react';
import './Description.scss';

const ImageContainer = ({ image, image_url }) => (
  <div
    className={image ? 'bottle-cover' : 'keg-cover'}
    style={{
      width: '200px',
      height: image ? '450px' : '300px',
      backgroundImage: `url("${image_url}")`
    }}
  />
);

const description = props => {
  const {
    image_url,
    name,
    tagline,
    ibu,
    abv,
    ebc,
    description,
    food_pairing
  } = props.state.beer;
  // test what is a kind of image cover for bottle or keg
  const image = !/keg\.png/i.test(image_url);

  return (
    <div className="Description">
      <ImageContainer image={image} image_url={image_url} />
      <div className="text-container">
        <h3 className="title">{name}</h3>

        <div className="description">{description}</div>
        <div className="pairing-list">
          <p>Best served with:</p>
          <div className="pairing-list">
            {food_pairing
              ? food_pairing.map(el => <div key={el}>{el}</div>)
              : 'no specified food'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default description;
