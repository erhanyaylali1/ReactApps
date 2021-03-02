import React from 'react';
import './styles/CardRow.css';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { removeFromCard } from '../features/cardSlice';

const CardRow = ({ id, title, price, rating, image, hideButton}) => {

	const dispatch = useDispatch();

	const removeFromBasket = () => {
		dispatch(removeFromCard({
			id,
			title,
			price,
			rating,
			image
		}))
	};

	return (
		<div className="cardrow">
			<div className="cardrow__image">
				<img src={image} alt={`${id} product img`} />
			</div>
			<div className="cardrow__info">
				<p className="cardrow__title">{title}</p>
				<p className="cardrow__price">
					<small>$</small>
					<strong>{price}</strong>
				</p>
				<p className="cardrow_rating">{_.times(rating,() => <span>⭐</span>)}</p>
                {!hideButton && (
                    <button 
                        onClick={removeFromBasket}
                        className="cardrow__button"
                    >
                        Remove from Basket
                    </button>
                )}
			</div>			
		</div>
	)
}

export default CardRow