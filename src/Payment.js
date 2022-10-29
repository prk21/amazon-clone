import React, { useState, useEffect } from "react";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import axios from "./axios";
import { db } from "./firebase";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();

  const [processing, setProcessing] = useState("");
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);
  //with cleint secret strpe will come to know how much to charge
  //const stripe = useStripe();
  const elements = useElements();

  const navigate = useNavigate();
  // very important snippet
  /*useEffect(() => {
    //generate special stripe secret which allows us to charhe a customer
    // need to update secret when basket value changes

    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        //stripe expects the total in a currencies subunits
        // dollars -> need to pass in cents
        //ruppess-> need to check
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [basket]);*/

  console.log("The secret is >>>>>> ", clientSecret);
  //async function ideally
  const handleSubmit = (event) => {
    // stripe fancy stuff
    event.preventDefault();
    //to stop clicking buy button
    setProcessing(true);

    //need to have a client secret to run by the card
    /*const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // paymentIntent = payment confirmation

        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.create,
          });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: "EMPTY_BASKET",
        });
        // replace because we don't want users to come back to payments page
        navigate("/orders", { replace: true });
      });
      */
    /*db.collection("users").add({
      basket: basket,
      amount: getBasketTotal(basket), //paymentIntent.amount,
      created: new Date(),
    });*/

    let docId = Date.now() + "";
    // .collection("orders")
    // .doc(Date.now())
    db.collection("users")
      .doc(user ? user.uid : "")
      .collection("orders")
      .doc(docId)
      .set(
        {
          basket: basket,
          amount: getBasketTotal(basket), //paymentIntent.amount,
          created: new Date(), //paymentIntent.create,
        },
        function (error) {
          if (error) {
            console.log("PK error >>>>> ", error);
          } else {
            console.log("PK SUCCESS >>>>> ");
          }
        }
      );

    setSucceeded(true);
    setError(null);
    setProcessing(false);

    dispatch({
      type: "EMPTY_BASKET",
    });
    // replace because we don't want users to come back to payments page
    navigate("/orders", { replace: true });
  };

  const handleChange = (event) => {
    //Listen to changes in card element
    // and display any erros as the customer type their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout(
          <Link to="/checkout">{basket ? basket.length : 0} items</Link> )
        </h1>
        {/* payment section - delivery address*/}
        <div className="payment__section">
          <div className="payment__title">
            <h3> Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user ? user.email : ""}</p>
            <p>123 React lane</p>
            <p>React Enclave, The Superstars Town</p>
          </div>
        </div>
      </div>
      {/* payment section - review itemss*/}
      <div className="payment__section">
        <div className="payment__title">
          <h3> Review Items and Delivery</h3>
        </div>
        <div className="payment__items">
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

      {/* payment section - payment methiod*/}
      <div className="payment__section">
        <div className="payment__items">
          <h3>Payment Method</h3>
        </div>
        <div className="payment__details">
          {/* Stripe magic*/}
          <form onSubmit={handleSubmit}>
            <CardElement onChange={handleChange} />
            <div className="payment__priceContainer">
              <CurrencyFormat
                renderText={(value) => <h3>Order Total :{value}</h3>}
                decimalScale={2}
                value={getBasketTotal(basket)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"Rs."}
              />
              <button disabled={processing || disabled || succeeded}>
                <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
              </button>
            </div>
            {/* Errors*/}
            {error && <div>{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Payment;
