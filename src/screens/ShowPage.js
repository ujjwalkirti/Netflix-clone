import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Nav from "../components/Nav";
import { selectUser } from "../features/userSlice";
import db from "../Firebase";
import "./ShowPage.css";

function ShowPage() {
  const user = useSelector(selectUser);
  const [movie, setMovie] = useState([]);
  const history = useHistory();
  useEffect(() => {
    db.collection("users")
      .doc(user?.uid)
      .get()
      .then((doc) => {
        setMovie(doc.data()?.wantToWatch);
      });
  });
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
