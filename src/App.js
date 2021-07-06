import React from "react";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import Nav from "./components/Nav";
import Banner from "./components/Banner";
import Row from "./components/Row";
import requests from "./components/Requests";
require("dotenv").config();

function App() {
  return (
    <div className="app">
      <Nav />
      <Banner />
      <Row title="Trending" URLparams={requests.fetchTrending} true />
      <Row title="Top Rated" URLparams={requests.fetchTopRated} false />
      <Row title="Action" URLparams={requests.fetchActionMovies} false />
      <Row title="Comedy" URLparams={requests.fetchComedyMovies} false />
      <Row title="Horror" URLparams={requests.fetchHorrorMovies} false />
      <Row title="Romance" URLparams={requests.fetchRomanceMovies} false />
      <Row
        title="Documentaries"
        URLparams={requests.fetchDocumentaries}
        false
      />
    </div>
  );
}

export default App;
