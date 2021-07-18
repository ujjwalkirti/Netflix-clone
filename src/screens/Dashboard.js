import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import Nav from "../components/Nav";
import { selectUser } from "../features/userSlice";
import db from "../Firebase";
import plans from "../components/PlanDetails";
import userAvatar from "../Static/Avatars/6.png";
import "./Dashboard.css";

function Dashboard() {
  const user = useSelector(selectUser);
  const [editDetails, setEditDetails] = useState(false);
  const [selectPlan, setSelectPlan] = useState(false);
  const [storeUser, setStoreUser] = useState({ firstName: "", lastName: "" });
  const [isEmailVerified, setIsEmailVerified] = useState(true);
  const history = useHistory();

  useEffect(() => {
    async function userData() {
      var docRef = db.collection("users").doc(user?.uid);
      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            setStoreUser(doc.data());
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    }
    userData();
  }, [user]);

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
          {/* {()} */}
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
                  <h3 className="dashboard__useremail">
                    Hi, {storeUser?.firstName}
                  </h3>
                  <h3 className="dashboard__plan">
                    Your plan: {storeUser?.selectedPlan}
                  </h3>
                  <div className="dashboard__action">
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
            </div>
          )}
          {editDetails && !selectPlan && (
            <div className="wrapper__details signup__center">
              <h2>Edit your details</h2>
              <form
                action=""
                style={{ border: "1px solid gray", padding: "20px" }}
              >
                <label htmlFor="fn">First Name</label>
                <input
                  type="text"
                  name=""
                  id="fn"
                  value={storeUser.firstName}
                  onChange={(event) => {
                    setStoreUser({
                      firstName: event.target.value,
                      lastName: storeUser.lastName,
                    });
                  }}
                />
                <label htmlFor="ln">Last Name</label>
                <input
                  type="text"
                  name=""
                  id="ln"
                  value={storeUser.lastName}
                  onChange={(event) => {
                    setStoreUser({
                      lastName: event.target.value,
                      firstName: storeUser.firstName,
                    });
                  }}
                />
                <button
                  type="submit"
                  onClick={async (event) => {
                    event.preventDefault();
                    try {
                      await db.collection("users").doc(user?.uid).update({
                        firstName: storeUser.firstName,
                        lastName: storeUser.lastName,
                      });
                      console.log("Document successfully updated!");
                      history.push("/dashboard");
                      setEditDetails(false);
                    } catch (error) {
                      // The document probably doesn't exist.
                      console.error("Error updating document: ", error);
                    }
                  }}
                  className="dashboard__signout"
                >
                  Submit
                </button>
              </form>
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
                  <th
                    onClick={() => {
                      history.push("/plans/premium");
                    }}
                    className="plan__name"
                  >
                    Premium
                  </th>

                  <th
                    onClick={() => {
                      history.push("/plans/standard");
                    }}
                    className="plan__name"
                  >
                    Standard
                  </th>

                  <th
                    onClick={() => {
                      history.push("/plans/basic");
                    }}
                    className="plan__name"
                  >
                    Basic
                  </th>
                </tr>
                <tr>
                  <td className="criteria__header">
                    Monthly price after free month ends
                  </td>
                  {plans.map((plan) => (
                    <td>$ {plan.price}</td>
                  ))}
                </tr>
                <tr>
                  <td className="criteria__header">HD available</td>
                  <td>✅</td>
                  <td>✅</td>
                  <td>❌</td>
                </tr>
                <tr>
                  <td className="criteria__header">
                    Screens you can watch on at the same time
                  </td>
                  <td>3</td>
                  <td>2</td>
                  <td>1</td>
                </tr>
                <tr>
                  <td className="criteria__header">
                    Watch on your laptop, TV, phone and tablet
                  </td>
                  <td>✅</td>
                  <td>✅</td>
                  <td>✅</td>
                </tr>
                <tr>
                  <td className="criteria__header">
                    Unlimited movies and TV shows
                  </td>
                  <td>✅</td>
                  <td>✅</td>
                  <td>✅</td>
                </tr>
                <tr>
                  <td className="criteria__header">Cancel anytime</td>
                  <td>✅</td>
                  <td>✅</td>
                  <td>✅</td>
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
