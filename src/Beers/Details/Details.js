import React from 'react';
import PropTypes from 'prop-types';

const Details = ({
  similar,
  beer: {
    name,
    id,
    tagline,
    description,
    image_url: imagUrl,
    abv,
    ibu,
    target_fg: targetFg,
    target_og: targetOg,
    ebc,
    srm,
    ph,
    attenuation_level: attenuationLevel,
    ingredients,
    food_pairing: foodPairing,
    volume,
    boilVolume,
    method
  }
}) => {
  console.log({ similar });

  return (
    <div>
      <div>
        name:
        {name}
      </div>
      <div>
        id:
        {id}
      </div>

      <div>
        tagline:
        {tagline}
      </div>

      <div>
        imagUrl:
        <img src={imagUrl} alt={name} height="100px" width="auto" />
      </div>
    </div>
  );
};

Details.propTypes = {
  similar: PropTypes.array,
  beer: PropTypes.object,
  name: PropTypes.string,
  id: PropTypes.string,
  tagline: PropTypes.string,
  description: PropTypes.string,
  image_url: PropTypes.string,
  abv: PropTypes.number,
  ibu: PropTypes.number,
  targetFg: PropTypes.number,
  targetOg: PropTypes.number,
  ebc: PropTypes.number,
  srm: PropTypes.number,
  ph: PropTypes.number,
  attenuationLevel: PropTypes.number,
  volume: PropTypes.object,
  boilVolume: PropTypes.object,
  methodingredients: PropTypes.object,
  foodPairing: PropTypes.array
};

export default Details;
