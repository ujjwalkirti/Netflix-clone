import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import Nav from "../components/Nav";
import "./LoginScreen.css";
import backgroundImage from "../Static/netflix-background-9.webp";

function LoginScreen() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [emailEntered, setEmailEntered] = useState(false);
  const [alreadyOnLoginPage, setAlreadyOnLoginPage] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setEmailEntered(true);
  }
  console.log(backgroundImage);
  return (
    <div className="login">
      {!user ? (
        <div
          style={{
            backgroundSize: "100% 100%",
            backgroundImage: `url(${backgroundImage})`,
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
          }}
          className="login__form"
        >
          <div className="login__gradientTop" />
          <Nav {...alreadyOnLoginPage} />
          {!emailEntered ? (
            <div className="login__center">
              <h1>Unlimited movies, TV shows and more.</h1>
              <h3>Watch anywhere. Cancel anytime.</h3>
              <h4>
                Ready to watch? Enter your email to create or restart your
                membership.
              </h4>
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  required
                  placeholder="Email address"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                ></input>
                <button
                  className="login__centerbutton"
                  onClick={() => {
                    setAlreadyOnLoginPage(true);
                    console.log(alreadyOnLoginPage);
                  }}
                >
                  Get Started
                </button>
              </form>
            </div>
          ) : (
            <div className="signup__center">
              <h2>Sign-In</h2>
              <form>
                <input
                  type="email"
                  placeholder={`Email address` && email === ""}
                  value={email}
                  onchange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
                <input type="password" placeholder="Password" />
                <button className="login__centerbutton">Sign In</button>
              </form>
            </div>
          )}
          <div className="login__gradientDown" />
        </div>
      ) : (
        <div>
          <Redirect
            to={{
              pathname: "/dashboard",
            }}
          />
        </div>
      )}
    </div>
  );
}

export default LoginScreen;
