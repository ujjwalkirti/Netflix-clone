import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import Nav from "../components/Nav";
import { selectUser } from "../features/userSlice";
import userAvatar from "../Static/Avatars/6.png";
import "./Dashboard.css";

function Dashboard() {
  const user = useSelector(selectUser);
  const [editDetails, setEditDetails] = useState(false);
  const [selectPlan, setSelectPlan] = useState(false);
  const [priceBasic,setPriceBasic] = useState('7.99');
  const [priceStandard, setPriceStandard] = useState("9.99");
  const [pricePremium, setPricePremium] = useState("11.99");
  const history = useHistory();

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
          {!editDetails && !selectPlan && (
            <div className="wrapper">
              <div className="dashboard__heading">
                <h2>Edit Profile</h2>
              </div>
              <div className="dashboard__center">
                <div className="dashboard__left">
                  <img src={userAvatar} alt={user?.email} />
                </div>
                <div className="dashboard__right">
                  <h3 className="dashboard__useremail">Hi, {user?.email}</h3>
                  <button
                    onClick={() => {
                      setEditDetails(true);
                    }}
                    className="dashboard__signout"
                  >
                    Edit Details
                  </button>
                  <button
                    onClick={() => {
                      setSelectPlan(true);
                    }}
                    className="dashboard__signout"
                  >
                    Chose Plans
                  </button>
                </div>
              </div>
            </div>
          )}
          {editDetails && !selectPlan && (
            <div className="wrapper__details">
              <h2>
                You can edit your details over here, we are building this right
                now!
              </h2>
              <button
                onClick={() => {
                  setEditDetails(false);
                }}
                className="dashboard__signout"
              >
                Go back
              </button>
            </div>
          )}
          {!editDetails && selectPlan && (
            <div className="wrapper__plan">
              <h2>Choose the plan that's right for you!</h2>
              <h4>Downgrade or upgrade at any time.</h4>
              <table className="plan__table">
                <tr>
                  <th className="criteria__header"></th>
                  <th className="plan__name">Premium</th>

                  <th className="plan__name">Standard</th>

                  <th className="plan__name">Basic</th>
                </tr>
                <tr>
                  <td>Monthly price after free month ends</td>
                  <td>$ {pricePremium}</td>
                  <td>$ {priceStandard}</td>
                  <td>$ {priceBasic}</td>
                </tr>
                <tr>
                  <td>HD available</td>
                  <td></td>
                </tr>
                <tr>
                  <td>
                    <button
                      className="dashboard__signout"
                      onClick={() => {
                        history.push("/plans/premium");
                      }}
                      className="dashboard__signout"
                    >
                      Select
                    </button>
                  </td>
                  <td>
                    <button
                      className="dashboard__signout"
                      onClick={() => {
                        history.push("/plans/standard");
                      }}
                      className="dashboard__signout"
                    >
                      Select
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        history.push("/plans/basic");
                      }}
                      className="dashboard__signout"
                    >
                      Select
                    </button>
                  </td>
                </tr>
              </table>

              <button
                onClick={() => {
                  setSelectPlan(false);
                }}
                className="dashboard__signout"
              >
                Go back
              </button>
            </div>
          )}
        </div>
      );
    }
  }
}

export default Dashboard;
