import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Nav from "./Nav";
import "./PayForPlans.css";
import footerImage from "../Static/ad/80633824.jpg";
import plans from "./PlanDetails";
import db from "../Firebase";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
function PayForPlans({ typeOfPlan }) {
  const user = useSelector(selectUser);
  const history = useHistory();
  const [tempPlan, setTempPlan] = useState({});
  useEffect(() => {
    plans.map((plan) => {
      if (plan.name === typeOfPlan) {
        setTempPlan(plan);
        console.log(plan);
      }
    });
  }, []);

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: tempPlan.price,
          },
        },
      ],
    });
  };
  const onApprove = async (data, actions) => {
    // console.log(data);
    
    return actions.order
      .capture()
      .then((details) => {
        console.log(details)
        if(details.status === "COMPLETED"){
          db.collection("users").doc(user?.uid).update({
            selectedPlan : tempPlan.name,
          })
        };
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="payment">
      <Nav />
      <span className="payment__wrapper">
        <div className="payment__plandescription">
          <h2 className="payment__planname">{tempPlan?.name}</h2>
        </div>
        <div className="payment__checkout">
          <PayPalButton
            createOrder={(data, actions) => createOrder(data, actions)}
            onApprove={(data, actions) => onApprove(data, actions)}
          />
        </div>
      </span>
      <img className="footer__image" src={footerImage} alt="" />
    </div>
  );
}

export default PayForPlans;
