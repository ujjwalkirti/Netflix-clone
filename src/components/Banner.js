import axios from "axios";
import React, { useEffect, useState } from "react";

import "./Banner.css";
import requests from "./Requests";
function Banner() {
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    async function fetchMovies() {
      const response = await axios.get(
        `https://api.themoviedb.org/3${requests.fetchNetflixOriginals}`
      );
      const rand = Math.floor(Math.random() * response.data.results.length - 1);
      console.log(response.data.results[rand]);
      setMovie(response.data.results[rand]);
    }
    fetchMovies();
  }, []);
  return (
    <div
      style={{
        backgroundSize: "100% 100%",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
      className="banner"
    >
      {movie ? (
        <>
          <div classname="row transparent">
            <div className="left_gradient col-6">
              <div className="banner__title ">
                <h1 className="display-3">
                  {movie?.title || movie?.original_name || movie?.name}
                </h1>
              </div>
              <div className="banner__buttons">
                <button className="btn btn-dark mr-3">Play</button>
                <button className="btn btn-dark">My List</button>
              </div>
              <div className="banner__description mt-2">
                <h3>{movie?.overview}</h3>
              </div>
            </div>
            <div className="banner__contents  col-6"></div>
            {/* <div className="right_gradient col-2"></div> */}
          </div>
        </>
      ) : (
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      )}
    </div>
  );
}

export default Banner;
