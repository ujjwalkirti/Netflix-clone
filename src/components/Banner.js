import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import db from "../Firebase";
import firebase from "firebase";

import "./Banner.css";
import Nav from "./Nav";
import requests from "./Requests";
function Banner() {
  const [movie, setMovie] = useState([]);
  const user = useSelector(selectUser);
  useEffect(() => {
    async function fetchMovies() {
      const response = await axios.get(
        `https://api.themoviedb.org/3${requests.fetchNetflixOriginals}`
      );
      const rand = Math.floor(Math.random() * response.data.results.length - 1);
      setMovie(response.data.results[rand]);
    }
    fetchMovies();
  }, []);

  const addToList = (event) => {
    event.preventDefault();
    db.collection("users")
      .doc(user?.uid)
      .update({
        movieList: firebase.firestore.FieldValue.arrayUnion(movie),
      });
  };

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
      <div className="login__gradientTop" />
      <Nav />
      {movie ? (
        <>
          <div className="transparent">
            <div className="banner__title">
              <h1 className="display-3">
                {movie?.title || movie?.original_name || movie?.name}
              </h1>
            </div>
            <div className="banner__buttons">
              <button className="btn btn-dark mr-3">Play</button>
              <button className="btn btn-dark" onClick={addToList}>
                My List
              </button>
            </div>
            <div className="banner__description mt-2">
              <h3>{movie?.overview}</h3>
            </div>
          </div>
        </>
      ) : (
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      )}
      <div className="login__gradientDown" />
    </div>
  );
}

export default Banner;
