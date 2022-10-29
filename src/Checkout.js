// eslint-disable-next-line
import React, { useState } from "react";
import "./Checkout.css";
import pic from "./festive-amazon.jpeg";
import Subtotal from "./Subtotal";
import "./CheckoutProduct.css";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "./StateProvider";
import FlipMove from "react-flip-move";

function Checkout() {
  const [{ basket, user }, dispatch] = useStateValue();

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img className="checkout__ad" src={pic} alt=""></img>
        <div>
          <h3>{user ? user.email : ""}</h3>
          <h2 className="checkout__title">Your shopping Basket</h2>
          {console.log(basket)}
          {basket.map((item) => (
            <CheckoutProduct
              id={item.id}
              key={item.id}
              title={item.title}
              rating={item.rating}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>

      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
