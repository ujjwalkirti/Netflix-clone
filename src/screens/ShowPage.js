import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import searchYoutube from "youtube-api-v3-search";
import Nav from "../components/Nav";
import { selectUser } from "../features/userSlice";
import db from "../Firebase";
import YouTube from "react-youtube";
import "./ShowPage.css";

function ShowPage() {
  const user = useSelector(selectUser);
  const [movie, setMovie] = useState({});
  const [arr_search, setArr_Search] = useState({});
  const [id, setId] = useState("");
  const history = useHistory();

  // db.collection("users")
  //   .doc(user?.uid)
  //   .onSnapshot((doc) => {
  //     if (doc.data()?.wantToWatch !== null && movie === []) {
  //       setMovie(doc.data()?.wantToWatch);
  //     }
  //   });

  useEffect(() => {
    
    function videoSearch(api_key, options) {
      searchYoutube(api_key, options)
        .then((results) => {
          console.log(results);
          const n = results.items.length();
          const uniqueNumber = Math.floor(Math.random() * n);
          setId(results.items[uniqueNumber].id);
        })
        .catch((err) => {
          console.log(err.error.message);
        });
    }
    db.collection("users")
      .doc(user?.uid)
      .get()
      .then((doc) => {
        if (doc.data()?.wantToWatch !== null) {
          setMovie(doc.data()?.wantToWatch);
          setArr_Search({
            part: "snippet",
            type: "video",
            maxResults: 3,
            q: movie?.title || movie?.original_name || movie?.name,
          });
          videoSearch(process.env.REACT_APP_YOUTUBE_API_KEY, arr_search);
        }
        
      });
  }, []);

  function goBack(event) {
    event.preventDefault();
    db.collection("users")
      .doc(user?.uid)
      .update({
        wantToWatch: null,
      })
      .then(() => {
        history.push("/catalogue");
      });
  }

  function _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  return (
    <div className="movie">
      <Nav />
      <div className="movie__heading">
        <h2>{movie?.title || movie?.original_name || movie?.name}</h2>
      </div>
      <div className="movie__screen">
        <YouTube videId={id} opts={opts} onReady={_onReady} />
      </div>
      <button className="dashboard__signout" onClick={goBack}>
        Browse more movies
      </button>
    </div>
  );
}

export default ShowPage;
