import React from "react";
import CardModule from "./Card.module.css";

function Card({
	city,
	country,
	superHost,
	title,
	rating,
	maxGuests,
	type,
	beds,
	photo,
}) {
	return (
		<div className={CardModule.card}>
			<img src={photo} alt='Image' loading='lazy' />
			<div className={CardModule.details}>
				{superHost && <div className={CardModule.tag}>SUPER HOST</div>}
				<div>
					{type} {beds && `.${beds} bed`}
				</div>
				<div className={CardModule.score}>
					<i className='fa-solid fa-star'></i>
					<span>{rating}</span>
				</div>
			</div>
			<div className='title'>{title}</div>
		</div>
	);
}

export default Card;
