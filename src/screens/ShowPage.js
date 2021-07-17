import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import searchYoutube from "youtube-api-v3-search";
import Nav from "../components/Nav";
import { selectUser } from "../features/userSlice";
import db from "../Firebase";
import "./ShowPage.css";

function ShowPage() {
  const user = useSelector(selectUser);
  const [movie, setMovie] = useState([]);
  const [arr_search, setArr_Search] = useState({});
  const [id, setId] = useState("");
  const history = useHistory();

  db.collection("users")
    .doc(user?.uid)
    .onSnapshot((doc) => {
      if (doc.data()?.wantToWatch !== null && movie === []) {
        setMovie(doc.data()?.wantToWatch);
      }
    });

  useEffect(() => {
    // db.collection("users")
    //   .doc(user?.uid)
    //   .get()
    //   .then((doc) => {
    //     if (doc.data()?.wantToWatch !== null && movie === []) {
    //       setMovie(doc.data()?.wantToWatch);
    //     } else console.log("Movie is already set!");
    //   });

    setArr_Search({
      part: "snippet",
      type: "video",
      
      maxResults: 3,
      q: movie?.title,
    });
    function videoSearch(api_key, options) {
      searchYoutube(api_key, options)
        .then((results) => {
          console.log(results);
        })
        .catch((err) => {
          console.log(err.error.message);
        });
    }
    videoSearch(process.env.REACT_APP_YOUTUBE_API_KEY, arr_search);
  }, [movie]);

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

  return (
    <div>
      <Nav />
      <button className="dashboard__signout" onClick={goBack}>
        Browse more movies
      </button>
    </div>
  );
}

export default ShowPage;
