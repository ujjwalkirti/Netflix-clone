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

function Nav(condition) {
  const [user, setUser] = useState(null);
  return (
    <div>
      <nav class="navbar">
        <Link class="navbar-brand" to={user ? `/catalogue` : `/login`}>
          <img
            src="https://spng.pngfind.com/pngs/s/55-550764_netflix-n-logo-logo-n-de-netflix-hd.png"
            width="90"
            height="90"
            className="d-inline-block align-top"
            alt=""
          />
        </Link>
        {!user ? (
          <span>
            {(condition === true) ? (
              <span></span>
            ) : (
              <>
                <Link to="/" className="btn btn-success mr-4">Login</Link>
              </>
            )}
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
