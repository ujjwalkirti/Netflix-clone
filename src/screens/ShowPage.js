import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Nav from "../components/Nav";
import { selectUser } from "../features/userSlice";
import db from "../Firebase";
import YouTube from "react-youtube";
import "./ShowPage.css";
import axios from "axios";

function ShowPage() {
  const user = useSelector(selectUser);
  const [movie, setMovie] = useState({});
  const [arr_search, setArr_Search] = useState({});
  const [id, setId] = useState("");
  const history = useHistory();



  useEffect(() => {
    db.collection("users")
      .doc(user?.uid)
      .get()
      .then((doc) => {
        if (doc.data()?.wantToWatch !== null) {
          setMovie(doc.data()?.wantToWatch);
        }
      });
    async function ytresults() {
      const response = await axios.get(
        "https://www.googleapis.com/youtube/v3/search/",
        {
          params: {
            q: movie?.title || movie?.original_name || movie?.name,
            part: "snippet",
            maxResults: 3,
            key: process.env.REACT_APP_YOUTUBE_API_KEY,
            type: "video",
          },
        }
      );
      console.log(response);
    }
    ytresults();
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
    height: "100%",
    width: "100%",
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
      <button className="dashboard__signout1" onClick={goBack}>
        Browse more movies
      </button>
    </div>
  );
}

export default ShowPage;
