import React from "react";
import ReactDOM from "react-dom";
import Nav from "./Nav";
import "./PayForPlans.css";
import footerImage from "../Static/ad/80633824.jpg";

const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
function PayForPlans(typeOfPlan) {
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: "0.01",
          },
        },
      ],
    });
  };
  const onApprove = (data, actions) => {
    return actions.order.capture();
  };

  return (
    <div className="payment">
      <Nav />
      <span className="payment__wrapper">
        <div className="payment__plandescription">
          <h2 className="payment__planname">{typeOfPlan.typeOfPlan}</h2>
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
