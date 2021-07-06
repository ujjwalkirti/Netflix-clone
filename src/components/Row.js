import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Row.css";

function Row({ title, URLparams, isLargeRow }) {
  const [movies, setMovies] = useState([]);

  const URLbase = "https://api.themoviedb.org/3";
  const URLbaseImage = "https://image.tmdb.org/t/p/original/";
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(`${URLbase}${URLparams}`);
      setMovies(request.data.results);
      console.log(request.data.results);
      return request;
    }
    fetchData();
  }, [URLparams]);
  return (
    <div className="ml-5 genre">
      <h2>{title}</h2>
      <div className="d-flex row__movies">
        {movies.map((movie) => (
          <img
            className={`row__movie {}`}
            loading="lazy"
            src={`${URLbaseImage}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie?.original_title}
          />
        ))}
      </div>
    </div>
  );
}

export default Row;
