import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Banner from "../components/Banner";
import requests from "../components/Requests";
import Row from "../components/Row";
import { selectUser } from "../features/userSlice";
import db from "../Firebase";

function HomeScreen() {
  const user = useSelector(selectUser);
  const [toPlay, setToPlay] = useState(false);
  const [list, setList] = useState([]);

  useEffect(() => {
    db.collection("users")
      .doc(user?.uid)
      .get()
      .then((doc) => {
        setList(doc.data()?.movieList);
      });
  }, []);

  db.collection("users")
    .doc(user?.uid)
    .onSnapshot((doc) => {
      if (
        doc.data()?.wantToWatch !== null &&
        doc.data()?.selectedPlan !== "None"
      ) {
        setToPlay(true);
      }
    });

  if (user === null) {
    return <Redirect to="/" />;
  } else {
    if (toPlay) {
      return <Redirect to="/watch" />;
    } else {
      return (
        <div>
          <Banner />
          <Row
            title="Trending"
            URLparams={requests.fetchTrending}
            isLargeRow={true}
          />
          {list === [] && (
            <Row title="Movies You added" URLparams={null} isLargeRow={false} />
          )}
          <Row
            title="Top Rated"
            URLparams={requests.fetchTopRated}
            isLargeRow={false}
          />
          <Row
            title="Action"
            URLparams={requests.fetchActionMovies}
            isLargeRow={false}
          />
          <Row
            title="Comedy"
            URLparams={requests.fetchComedyMovies}
            isLargeRow={false}
          />
          <Row
            title="Horror"
            URLparams={requests.fetchHorrorMovies}
            isLargeRow={false}
          />
          <Row
            title="Romance"
            URLparams={requests.fetchRomanceMovies}
            isLargeRow={false}
          />
          <Row
            title="Documentaries"
            URLparams={requests.fetchDocumentaries}
            false
          />
        </div>
      );
    }
  }
}

export default HomeScreen;
