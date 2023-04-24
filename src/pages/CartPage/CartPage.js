import React from "react";
import "./CartPage.scss";
import { formatPrice } from "../../utils/helpers";
import { shopping_cart } from "../../utils/images";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  getCartData,
  getCartItemsCount,
  getCartTotalAmount,
  removeFromCart,
  toggleCartQty
} from "../../store/cartSlice";

function CartPage() {
  const dispatch = useDispatch();
  const cart = useSelector(getCartData);
  const itemsCount = useSelector(getCartItemsCount);
  const totalAmount = useSelector(getCartTotalAmount);

  if (cart.length === 0) {
    return (
      <div className="container my-5">
        <div className="empty-cart flex justify-center align-center flex-column font-manrope">
          <img src={shopping_cart} alt="" />
          <span className="fw-6 fs-15 text-gray">
            Your shopping cart is empty.
          </span>
          <Link to="/" className="shopping-btn bg-orange text-white fw-5">
            Go shopping Now
          </Link>
        </div>
        <ToastContainer position="top-right" />
      </div>
    );
  }
  return (
    <div className="cart bg-whitesmoke">
      <div className="container">
        <div className="cart-ctable">
          <div className="cart-chead bg-white">
            <div className="cart-ctr fw-6 font-manrope fs-15">
              <div className="cart-cth">
                <span className="cart-ctxt">S.N.</span>
              </div>
              <div className="cart-cth">
                <span className="cart-ctxt">Product</span>
              </div>
              <div className="cart-cth">
                <span className="cart-ctxt">Unit Price</span>
              </div>
              <div className="cart-cth">
                <span className="cart-ctxt">Quantity</span>
              </div>
              <div className="cart-cth">
                <span className="cart-ctxt">Total Price</span>
              </div>
              <div className="cart-cth">
                <span className="cart-ctxt">Actions</span>
              </div>
            </div>
          </div>

          <div className="cart-cbody bg-white">
            {cart.map((cart, idx) => {
              return (
                <div className="cart-ctr py-4" key={cart?.id}>
                  <div className="cart-ctd">
                    <span className="cart-ctxt">{idx + 1}</span>
                  </div>
                  <div className="cart-ctd">
                    <span className="cart-ctxt">{cart?.title}</span>
                  </div>
                  <div className="cart-ctd">
                    <span className="cart-ctxt">
                      {formatPrice(cart?.discountedPrice)}
                    </span>
                  </div>
                  <div className="cart-ctd">
                    <div className="qty-change flex align-center">
                      <button
                        type="button"
                        className="qty-decrease flex align-center justify-center"
                        onClick={() => {
                          if (cart?.quantity === 1) {
                            dispatch(removeFromCart(cart?.id));
                            toast.info("Item removed from cart!");
                          } else
                            dispatch(
                              toggleCartQty({ id: cart?.id, type: "DEC" })
                            );
                        }}
                      >
                        <i className="fas fa-minus"></i>
                      </button>

                      <div className="qty-value flex align-center justify-center">
                        {cart?.quantity}
                      </div>

                      <button
                        type="button"
                        className="qty-increase flex align-center justify-center"
                        onClick={() =>
                          dispatch(toggleCartQty({ id: cart?.id, type: "INC" }))
                        }
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                  </div>

                  <div className="cart-ctd">
                    <span className="cart-ctxt text-orange fw-5">
                      {formatPrice(cart?.totalPrice)}
                    </span>
                  </div>

                  <div className="cart-ctd">
                    <button
                      type="button"
                      className="delete-btn text-dark"
                      onClick={() => {
                        dispatch(removeFromCart(cart?.id));
                        toast.info("Item removed from cart!");
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="cart-cfoot flex align-start justify-between py-3 bg-white">
            <div className="cart-cfoot-l">
              <button
                type="button"
                className="clear-cart-btn text-danger fs-15 text-uppercase fw-4"
                onClick={() => {
                  dispatch(clearCart());
                  toast.info("Cart Cleared!");
                }}
              >
                <i className="fas fa-trash"></i>
                <span className="mx-1">Clear Cart</span>
              </button>
            </div>

            <div className="cart-cfoot-r flex flex-column justify-end">
              <div className="total-txt flex align-center justify-end">
                <div className="font-manrope fw-5">
                  Total ({itemsCount}) items:{" "}
                </div>
                <span className="text-orange fs-22 mx-2 fw-6">
                  {formatPrice(totalAmount)}
                </span>
              </div>

              <button
                type="button"
                className="checkout-btn text-white bg-orange fs-16"
                onClick={() => {
                  dispatch(clearCart());
                }}
              >
                <Link to={"/checkout"}>Check Out</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
}

export default CartPage;
