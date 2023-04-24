import React from "react";
import "./CheckoutPage.scss";
import { shopping_cart } from "../../utils/images";
import { Link } from "react-router-dom";

function CheckoutPage() {
  return (
    <div className="container my-5">
      <div className="empty-cart flex justify-center align-center flex-column font-manrope">
        <img src={shopping_cart} alt="" />
        <span className="fw-6 fs-15 text-gray">Thanks for shopping</span>
        <Link to="/" className="shopping-btn bg-orange text-white fw-5">
          Go to Home
        </Link>
      </div>
    </div>
  );
}

export default CheckoutPage;
