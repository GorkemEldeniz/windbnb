import Search from "./SearchBar.module.css";
import { useMemo, useEffect, useState } from "react";
import Logo from "../../public/Logo.svg";
import data from "../../stays.json";
import { getContext } from "../Context";
import MobilSearch from "./MobilSearch";

function SearchBar() {
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
	const [isMobil, setIsMobil] = useState(
		window.matchMedia("(max-width:600px)").matches
	);

	const handleLocation = (elem) => {
		setLocationSearch(elem);
		setLocation(false);
	};

	const responsive = (e) => {
		e.target.innerWidth <= 600 ? setIsMobil(true) : setIsMobil(false);
	};

	useEffect(() => {
		window.addEventListener("resize", responsive);

		return () => window.removeEventListener("resize", responsive);
	}, []);

	const totalGuest = useMemo(
		() => childrenNumber + adultNumber,
		[childrenNumber, adultNumber]
	);

	const handleAdd = (type) => {
		if (type === "children") {
			setChildrenNumber((pre) => pre + 1);
		} else {
			setAdultNumber((pre) => pre + 1);
		}
	};

	const handleDelete = (type) => {
		if (type === "children") {
			childrenNumber > 0
				? setChildrenNumber((pre) => pre - 1)
				: setChildrenNumber(0);
		} else {
			adultNumber > 0 ? setAdultNumber((pre) => pre - 1) : setAdultNumber(0);
		}
	};

	const handleSearch = () => {
		let [city, _] = locationSearch.split(",");
		let requestedHotels = data.filter((el) => {
			if (el.city === city && el.maxGuests >= totalGuest) return el;
		});

		setHotels(requestedHotels);
	};

	const cityArray = [...new Set(data.map((el) => `${el.city},${el.country}`))];

	return (
		<nav className={Search.nav}>
			<img className={isOpen ? Search.none : undefined} src={Logo} alt='Logo' />
			<ol
				className={Search.sidebar}
				style={{
					flex: isOpen ? 1 : undefined,
					alignItems: isOpen ? "flex-start" : "center",
					flexDirection: isMobil && isOpen ? "column" : "row",
				}}
			>
				{isMobil && isOpen && (
					<i className='fa-solid fa-xmark' onClick={() => setIsOpen(false)}></i>
				)}
				{isMobil ? (
					<MobilSearch
						handleAdd={handleAdd}
						handleDelete={handleDelete}
						totalGuest={totalGuest}
						handleLocation={handleLocation}
						cityArray={cityArray}
						handleSearch={handleSearch}
					/>
				) : (
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
										placeholder='Add guests'
										value={totalGuest ? totalGuest : null}
										min={0}
										style={{ cursor: "not-allowed" }}
										onFocus={() => setGuest(true)}
									/>
									{guest && (
										<div className={Search.guest}>
											<div>
												<label htmlFor=''>Adults</label>
												<span>Ages 13 or above</span>
												<div>
													<button onClick={() => handleDelete("adult")}>
														-
													</button>
													<span>{adultNumber}</span>
													<button onClick={() => handleAdd("adult")}>+</button>
												</div>
											</div>

											<div>
												<label htmlFor=''>Children</label>
												<span>Ages 2-12</span>
												<div>
													<button onClick={() => handleDelete("children")}>
														-
													</button>
													<span>{childrenNumber}</span>
													<button onClick={() => handleAdd("children")}>
														+
													</button>
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
									<span className='material-symbols-outlined'>search</span>{" "}
									Search
								</button>
							)}
						</li>
					</>
				)}
			</ol>
		</nav>
	);
}

export default SearchBar;
