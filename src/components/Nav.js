import React, { useState } from "react";
import "./Nav.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";

function Nav() {
  const [user, setUser] = useState(null);
  return (
    <div>
      <nav class="navbar">
        <Link class="navbar-brand" to={user ? `/catalogue` : `/login`}>
          <img
            src="https://spng.pngfind.com/pngs/s/55-550764_netflix-n-logo-logo-n-de-netflix-hd.png"
            width="90"
            height="90"
            class="d-inline-block align-top"
            alt=""
          />
        </Link>
        {!user ? (
          <span>
            <Link className="btn btn-success mr-4">Login</Link>
            <Link className="btn btn-primary">Sign-Up</Link>
          </span>
        ) : (
          <span className="d-flex">
            <p>Hi {user}</p>
            <Link className="btn btn-warning">Log-out</Link>
          </span>
        )}
      </nav>
    </div>
  );
}

export default Nav;
