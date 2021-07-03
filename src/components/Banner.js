import React, { useEffect, useState } from "react";
import axios from "../axios";
import "./Banner.css";
import requests from "./Requests";
function Banner() {
	const [movie, setMovie] = useState([]);
	useEffect(() => {
		async function fetchMovies() {
			const response = await axios.get(requests.fetchNetflixOriginals);
			const rand = Math.floor(Math.random() * response.data.results.length - 1);
			console.log(response);
			setMovie(response.data.results[rand]);
		}
		fetchMovies();
	}, []);
	return (
		<div
			style={{
				backgroundSize: "cover",
				backgroundImage: `url("data:image/jpeg;base64,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")`,
				backgroundPosition: "center center",
			}}
			className="banner"
		>
			<div className="banner__contents container">
				<div className="banner__title">
					<h1>Title</h1>
				</div>
				<div className="banner__buttons">
					<button className="btn btn-dark mr-3">Play</button>
					<button className="btn btn-dark">My List</button>
				</div>
				<div className="banner__description"></div>
			</div>
			<div className="banner__fadeBottom" />
		</div>
	);
}

export default Banner;
