
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import db from "../Firebase";
import "./Row.css";

function Row({ title, URLparams, isLargeRow }) {
  const user = useSelector(selectUser);
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState({});
  const [showModal, setShowModal] = useState(false);
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
      {showModal && (
        <div
          className="modal__movie"
          style={{
            backgroundSize: "100% 100%",
            backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="login__gradient"></div></div>
      )}
      <div className="d-flex row__movies">
        {movies?.map((movie) => {
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
                    // db.collection("users")
                    //   .doc(user?.uid)
                    //   .get()
                    //   .then((doc) => {
                    //     if (doc.data().selectedPlan !== "None") {
                    //       db.collection("users")
                    //         .doc(user?.uid)
                    //         .update({
                    //           wantToWatch: movie,
                    //         })
                    //         .then(() => {
                    //           console.log(
                    //             "You are watching ",
                    //             movie?.title ||
                    //               movie?.original_name ||
                    //               movie?.name
                    //           );

                    //       });
                    //   } else {
                    //     alert("You have not subscribed to any plan!");
                    //   }
                    // });
                    setShowModal(true);
                    setMovie(movie);
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
