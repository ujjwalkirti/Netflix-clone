import axios from "axios";
import React, { useEffect, useState } from "react";

function Row({ title, URLparams, isLargeRow }) {
  const [movies, setMovies] = useState([]);

  const URLbase = "https://api.themoviedb.org/3";
  const URLbaseImage = "https://image.tmdb.org/t/p/original/";
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(`${URLbase}${URLparams}`);
      setMovies(request.data.results);
      console.log(movies);
      return request;
    }
    fetchData();
  }, [URLparams]);
  return (
    <div className="row d-flex ml-5">
      <h2>{title}</h2>
      {movies.map((movie) => {
        // const imageURL = `${URLbaseImage}${
        //   isLargeRow ? movie?.poster_path : movie?.backdrop_path
        // }`;
        
          <img
            src={`${URLbaseImage}${
              isLargeRow ? movie?.poster_path : movie?.backdrop_path
            }`}
            className="card-img-top"
            alt={movie?.original_title}
          />
          
        
      })}
    </div>
  );
}

export default Row;
