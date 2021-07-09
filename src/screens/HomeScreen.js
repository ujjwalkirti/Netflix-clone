import React from "react";
import Banner from "../components/Banner";
import Nav from "../components/Nav";
import requests from "../components/Requests";
import Row from "../components/Row";

function HomeScreen() {
  return (
    <div className="">
      <Nav />
      <Banner />
      <Row
        title="Trending"
        URLparams={requests.fetchTrending}
        isLargeRow={true}
      />
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

export default HomeScreen;
