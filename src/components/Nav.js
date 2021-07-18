import React, { useEffect, useState } from "react";
import "./Nav.css";
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";
import { auth } from "../Firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import userAvatar from "../Static/Avatars/6.png";

function Nav(condition) {
  const user = useSelector(selectUser);
  const [show, setShow] = useState(false);
  const history = useHistory();
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
    // return () => {
    //   window.removeEventListener("scroll",null);
    // };
  }, []);
  const signout = (event) => {
    event.preventDefault();
    auth
      .signOut()
      .then(() => {
        history.push("/");
      })
      .catch((err) => {
        alert(err);
      });
  };
  return (
    <div>
      <nav className={`navbar__native ${show && "navbar__black"}`}>
        <Link className="navbar__brand" to={user ? `/catalogue` : `/`}>
          <img
            src="https://pngimg.com/uploads/netflix/netflix_PNG15.png"
            width="35"
            height="75"
            className="d-inline-block align-top"
            alt=""
          />
        </Link>
        {user === null ? (
          <span>
            {condition === true ? (
              <span></span>
            ) : (
              <>
                <Link to="/" className="btn btn-success mr-4">
                  Login
                </Link>
              </>
            )}
          </span>
        ) : (
          <span className="nav__left">
            <img
              src={userAvatar}
              alt=""
              style={{ borderRadius: "50%" }}
              onClick={() => {
                history.push("/dashboard");
              }}
              className="user__avatar"
            />
            <button onClick={signout} className="nav__logout">
              Logout
            </button>
          </span>
        )}
      </nav>
    </div>
  );
}

export default Nav;
