import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Nav from "../components/Nav";
import { selectUser } from "../features/userSlice";
import userAvatar from "../Static/Avatars/6.png";
import "./Dashboard.css";

function Dashboard() {
  const user = useSelector(selectUser);

  {
    if (user === null) {
      return (
        <div>
          <Redirect
            to={{
              pathname: "/",
            }}
          />
        </div>
      );
    } else {
      return (
        <div className="dashboard">
          <Nav />
          <div className="dashboard__center">
            <div className="dashboard__left">
              <img src={userAvatar} alt={user?.email} />
            </div>
            <div className="dashboard__right">
              <h3 className="dashboard__useremail">Hi, {user?.email}</h3>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Dashboard;
