import React, { useRef, useState } from "react";
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
import { auth } from "../Firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

function LoginScreen() {
  const user = useSelector(selectUser);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const passwordRef = useRef();
  const [emailEntered, setEmailEntered] = useState(false);
  const [alreadyOnLoginPage, setAlreadyOnLoginPage] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setEmailEntered(true);
  }
  function login(event) {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, passwordRef.current.value)
      .then((authUser) => {})
      .catch((error) => {
        alert(error);
      });
  }
  function register(event) {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, passwordRef.current.value)
      .then((authUser) => {})
      .catch((error) => {
        alert(error);
      });
  }
  // function redirectToProfile(event){
  //   event.preventDefault();
  //   history.push("/dashboard")
  // }
  return (
    <div className="login">
      {user === null ? (
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
          <Nav condition={alreadyOnLoginPage} />
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
                  required
                  onchange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
                <input
                  type="password"
                  required
                  ref={passwordRef}
                  placeholder="Password"
                />
                <button onClick={login} className="login__centerbutton">
                  Sign In
                </button>
              </form>
              <h4>
                New to Netflix?{" "}
                <span className="signup__buttonText" onClick={register}>
                  Sign-Up here
                </span>
              </h4>
            </div>
          )}
          <div className="login__gradientDown" />
        </div>
      ) : (
        <Redirect to="/catalogue" />
      )}
    </div>
  );
}

export default LoginScreen;
