import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import db from "../Firebase";
import "./Row.css";

function Row({ title, URLparams, isLargeRow }) {
  const user = useSelector(selectUser);
  const [movies, setMovies] = useState([]);
  const [isPaid, setIsPaid] = useState(false);
  const URLbase = "https://api.themoviedb.org/3";
  const URLbaseImage = "https://image.tmdb.org/t/p/original/";
  useEffect(() => {
    if (URLparams === null) {
      db.collection("users")
        .doc(user?.uid)
        .get()
        .then((doc) => {
          setMovies(doc.data()?.movieList);
        });
    } else {
      async function fetchData() {
        const request = await axios.get(`${URLbase}${URLparams}`);
        setMovies(request.data.results);
        return request;
      }
      fetchData();
    }
  }, [URLparams]);

  // db.collection("users")
  //   .doc(user?.uid)
  //   .onSnapshot((doc) => {
  //     setMovies(doc.data()?.movieList);
  //   });

  return (
    <div className="ml-5 genre">
      <h2 className="genre__heading">{title}</h2>
      <div className="d-flex row__movies">
        {movies?.map((movie) => {
          const id = movie.id;
          let isMouseHovered = true;
          if (typeof movie.backdrop_path !== "undefined") {
            return (
              <>
                <img
                  className={`row__movie ${isLargeRow && "row__movielarge"}
                  }`}
                  loading="lazy"
                  src={`${URLbaseImage}${
                    isLargeRow ? movie.poster_path : movie.backdrop_path
                  }`}
                  onClick={() => {
                    //redirect to dashboard asking him to watch the movie
                    db.collection("users")
                      .doc(user?.uid)
                      .get()
                      .then((doc) => {
                        if (doc.data()?.selectedPlan === "None") {
                          setIsPaid(false);
                        } else {
                          setIsPaid(true);
                        }
                      });
                    if (isPaid) {
                      db.collection("users").doc(user?.uid).update({
                        wantToWatch: movie,
                      });
                    }else{
                      alert("You have not purchased any plan!")
                    }
                  }}
                  alt={movie?.original_title}
                />
              </>
            );
          }
        })}
      </div>
    </div>
  );
}

export default Row;
