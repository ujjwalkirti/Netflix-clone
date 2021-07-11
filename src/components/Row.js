import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Row.css";

function Row({ title, URLparams, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  // const [isHovered, setIsHovered] = useState(false);
  const URLbase = "https://api.themoviedb.org/3";
  const URLbaseImage = "https://image.tmdb.org/t/p/original/";
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(`${URLbase}${URLparams}`);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [URLparams]);
  return (
    <div className="ml-5 genre">
      <h2 className="genre__heading">{title}</h2>
      <div className="d-flex row__movies">
        {movies.map((movie) => {
          const id = movie.id;
          let isHovered = false;
          if (typeof movie.backdrop_path !== "undefined") {
            return (
              <>
                <img
                  className={`row__movie ${isLargeRow && "row__movielarge"} ${
                    isHovered && "row__moviehover"
                  }`}
                  loading="lazy"
                  src={`${URLbaseImage}${
                    isLargeRow ? movie.poster_path : movie.backdrop_path
                  }`}
                  onClick={() => {
                    //redirect to dashboard asking him to watch the movie
                  }}
                  onMouseEnter={() => {
                    // setIsHovered(true);
                    isHovered = true;

                    //show the name of the movie and blurr the background a bit
                  }}
                  onMouseLeave={() => {
                    isHovered = false;
                    // setIsHovered(false);
                  }}
                  alt={movie?.original_title}
                />
                <h3
                  className={`${!isHovered && "noDisplay"} ${
                    isHovered && "textDisplay"
                  }`}
                >
                  {movie?.title || movie?.original_name || movie?.name}
                </h3>
              </>
            );
          }
        })}
      </div>
    </div>
  );
}

export default Row;
