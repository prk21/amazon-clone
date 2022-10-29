import React from "react";
import "./Subtotal.css";
import { useStateValue } from "./StateProvider";
import CurrencyFormat from "react-currency-format";
import { Navigate, useNavigate } from "react-router-dom";
import { getBasketTotal } from "./reducer";
//import Fragment from "react-router-dom";

function Subtotal() {
  const [{ basket }, dispatch] = useStateValue();
  const navigate = useNavigate();
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket ? basket.length : 0} items):{" "}
              <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox"></input>
              This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)} //Part of hw
        displayType={"text"}
        thousandSeparator={true}
        prefix={"Rs."}
      />
      <button onClick={(e) => navigate("/payment")}>Proceed to Checkout</button>
    </div>
  );
}

export default Subtotal;
