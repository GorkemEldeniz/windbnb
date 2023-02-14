import React from "react";
import Search from "./SearchBar.module.css";
import { getContext } from "../Context/index";

function MobilSearch({
	cityArray,
	handleLocation,
	handleDelete,
	handleAdd,
	totalGuest,
	handleSearch,
}) {
	const {
		hotels,
		setHotels,
		isOpen,
		setIsOpen,
		location,
		setLocation,
		guest,
		setGuest,
		locationSearch,
		setLocationSearch,
		childrenNumber,
		setChildrenNumber,
		adultNumber,
		setAdultNumber,
	} = getContext();

	return (
		<>
			<li className={isOpen ? Search.full : undefined}>
				{isOpen ? (
					<div className={Search.input}>
						<label htmlFor='location'>LOCATION</label>
						<input
							type='text'
							id='location'
							value={locationSearch}
							onFocus={() => setLocation(true)}
						/>
						{location && (
							<div className={Search.location}>
								{cityArray.map((elem, i) => (
									<div key={i} onClick={() => handleLocation(elem)}>
										<i className='fa-solid fa-location-dot'></i> {elem}
									</div>
								))}
							</div>
						)}
					</div>
				) : (
					<>{locationSearch ? locationSearch : "Helsinki,Finland"}</>
				)}
			</li>

			<li className={isOpen ? Search.full : undefined}>
				{isOpen ? (
					<div className={Search.input}>
						<label htmlFor='guest'>GUESTS</label>
						<input
							type='text'
							id='guest'
							step={{ cursor: "not-allowed" }}
							placeholder='Add guests'
							value={totalGuest ? totalGuest : null}
							min={0}
							onFocus={() => setGuest(true)}
						/>
						{guest && (
							<div className={Search.guest}>
								<div>
									<label htmlFor=''>Adults</label>
									<span>Ages 13 or above</span>
									<div>
										<button onClick={() => handleDelete("adult")}>-</button>
										<span>{adultNumber}</span>
										<button onClick={() => handleAdd("adult")}>+</button>
									</div>
								</div>

								<div>
									<label htmlFor=''>Children</label>
									<span>Ages 2-12</span>
									<div>
										<button onClick={() => handleDelete("children")}>-</button>
										<span>{childrenNumber}</span>
										<button onClick={() => handleAdd("children")}>+</button>
									</div>
								</div>
							</div>
						)}
					</div>
				) : (
					<>Add Guest</>
				)}
			</li>
			<li
				className={isOpen ? Search.full : undefined}
				onClick={() => setIsOpen((pre) => !pre)}
			>
				{!isOpen ? (
					<span className='material-symbols-outlined'>search</span>
				) : (
					<button className={Search.button} onClick={handleSearch}>
						<span className='material-symbols-outlined'>search</span> Search
					</button>
				)}
			</li>
		</>
	);
}

export default MobilSearch;
