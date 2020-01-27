import React from 'react'
;
import classes from './Description.scss';

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
    } = props.state.item;
		//test what is a kind of image cover for bottle or keg
		const image = !(/keg\.png/i .test(image_url));
		const imageContainer = (
   <div
				className={image ? classes['bottle-cover'] : classes['keg-cover']}
				style={{
					width: '200px',
					height: image ? '450px' : '300px',
					backgroundImage: `url("${image_url}")`
				}} 
				>
			</div>
 );
    );
  
return (
    <div className={classes.Description}>
  { imageContainer }
      <div className={classes['text-container']}>
  <h3 className={classes.title}>{ name }</h3>
  <div className={classes.slogan}>{ tagline }</div>
        <div className={classes['feature-container']}>
  <div className={classes['features-name']}>
<strong>IBU</strong>
:
{' '}
{ibu}
</div>
  <div className={classes['features-name']}>
<strong>ABV</strong>
:
{' '}
{abv}
%
</div>
  <div className={classes['features-name']}>
<strong>EBC</strong>
:
{' '}
{ebc}
</div>
        </div>
  <div className={classes.description}>{ description }</div>
        <div className={classes['pairing-list']}>
          <p>Best served with:</p>
  <div className={classes['pairing-list']}>
  {food_pairing ? food_pairing.map(el => 
  <div key={el}>{ el }</div>
						) : 'no specified food'}
          </div>
        </div>
      </div>
    </div>
  );;
};

export default description;
;