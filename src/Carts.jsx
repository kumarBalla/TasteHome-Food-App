import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addOrder,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  clearCart,
} from "./Store";
import { calculateTotal, getCouponDiscount } from "./DiscountUtil";
import "./Carts.css";
import emailjs from "@emailjs/browser";
import QRCode from "react-qr-code";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Carts() {
  const carts = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const totalAmount = calculateTotal(carts);

  const [buttonDiscount, setButtonDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [couponResult, setCouponResult] = useState(null);
  const [showDiscounts, setShowDiscounts] = useState(false);
  const [customerEmail, setCustomerEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  // Coupon apply
  const handleApplyCoupon = () => {
    const result = getCouponDiscount(couponCode, totalAmount);
    setCouponResult(result);

    if (result.isValid) {
      toast.success(
        `🎉 Coupon Applied! You saved ₹${result.discountAmount.toFixed(2)}`
      );
    } else {
      toast.error("❌ Invalid Coupon Code");
    }
  };

  // Discount calculation
  let discountedTotal = totalAmount;
  if (buttonDiscount > 0) {
    discountedTotal -= (totalAmount * buttonDiscount) / 100;
  }
  if (couponResult?.isValid) {
    discountedTotal -= couponResult.discountAmount;
  }

  const summaryClass = couponResult?.isValid
    ? "cart-summary coupon-applied"
    : "cart-summary";

  // Send confirmation email
  function handleCheckout() {
    const templateParams = {
      order_id: Date.now(),
      orders: carts.map((item) => ({
        name: item.product.productName,
        price: (item.product.productPrice * item.quantity).toFixed(2),
        units: item.quantity,
      })),
      cost: {
        shipping: 50,
        totalPrice: discountedTotal,
      },
      email: customerEmail,
    };

    emailjs
      .send(
        "service_im4burn",
        "template_p043cfe",
        templateParams,
        "J3xc_lvMI9bPWCcDV"
      )
      .then(() => {
        toast.success("📧 Confirmation email sent successfully!");
      })
      .catch(() => {
        toast.error("❌ Failed to send confirmation email.");
      });
  }

  // Complete purchase
  function handleCompletePurchase() {
    if (!customerEmail) {
      toast.error("⚠️ Please enter your email.");
      return;
    }
    if (!paymentMethod) {
      toast.error("⚠️ Please select a payment method.");
      return;
    }

    let purchaseDetails = {
      date: new Date().toLocaleString(),
      items: [...carts],
      totalAmount: discountedTotal,
      paymentMethod,
    };

    dispatch(clearCart());
    dispatch(addOrder(purchaseDetails));

    if (paymentMethod === "cod") {
      toast.success(`💵 COD Selected! Pay ₹${discountedTotal.toFixed(2)} on delivery.`);
      handleCheckout();
    } else if (paymentMethod === "qr") {
      toast.success("📱 QR Payment Successful! Order confirmed.");
      handleCheckout();
    } else if (paymentMethod === "card") {
      toast.success("💳 Card Payment Successful! Order confirmed.");
      handleCheckout();
    }
  }

  return (
    <div className="container mt-4">
      <ToastContainer position="top-right" autoClose={2500} />

      <h2 className="text-center mb-4">🛒 Your Cart</h2>

      {carts.length === 0 ? (
        <h1 className="text-center">Your cart is empty.</h1>
      ) : (
        <div className="row">
          {/* Left Side → Products */}
          <div className="col-md-8">
            <div className="card shadow-lg p-3">
              <h4 className="mb-3">🛍️ Products</h4>
              <table className="table  align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {carts.map((cart) => (
                    <tr key={cart.product.productId}>
                      <td>
                        <img
                          src={cart.product.imageUrl}
                          alt={cart.product.productName}
                          style={{
                            width: "70px",
                            height: "70px",
                            objectFit: "cover",
                          }}
                        />
                      </td>
                      <td>{cart.product.productName}</td>
                      <td>₹{cart.product.productPrice}</td>
                      <td>
                        <div className="d-flex justify-content-center align-items-center">
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => {
                              dispatch(decreaseQuantity(cart.product));
                              toast.info("➖ Item quantity decreased");
                            }}
                          >
                            −
                          </button>
                          <span className="mx-2">{cart.quantity}</span>
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => {
                              dispatch(increaseQuantity(cart.product));
                              toast.success("➕ Item quantity increased");
                            }}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>
                        ₹{(cart.product.productPrice * cart.quantity).toFixed(2)}
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => {
                            dispatch(removeFromCart(cart.product));
                            toast.error("🗑️ Item removed from cart");
                          }}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Side → Summary & Payment */}
          <div className="col-md-4">
            <div className={summaryClass + " p-3 shadow-lg rounded"}>
              <h3 className="total">Total: ₹{totalAmount.toFixed(2)}</h3>

              {buttonDiscount > 0 && (
                <h5 className="text-warning">
                  Discount ({buttonDiscount}%): -₹
                  {((totalAmount * buttonDiscount) / 100).toFixed(2)}
                </h5>
              )}

              {couponResult && (
                <div className="mt-2">
                  {couponResult.isValid ? (
                    <div className="coupon-success">
                      ✅ Coupon Applied! You saved ₹
                      {couponResult.discountAmount.toFixed(2)} (
                      {couponResult.discountPercent}%)
                    </div>
                  ) : (
                    <div className="text-danger">❌ Invalid Coupon Code</div>
                  )}
                </div>
              )}

              <h4 className="total text-success mt-3">
                Final: ₹{discountedTotal.toFixed(2)}
              </h4>

              {/* Discounts */}
              {!showDiscounts && (
                <button
                  className="btn btn-outline-primary w-100 mt-3"
                  onClick={() => {
                    setShowDiscounts(true);
                    toast.info("💡 Discounts available");
                  }}
                >
                  Show Discounts
                </button>
              )}

              {showDiscounts && (
                <>
                  <div className="mt-3 d-flex flex-wrap gap-2">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        setButtonDiscount(10);
                        toast.success("🎉 10% discount applied!");
                      }}
                    >
                      10% Off
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => {
                        setButtonDiscount(20);
                        toast.success("🔥 20% discount applied!");
                      }}
                    >
                      20% Off
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        setButtonDiscount(30);
                        toast.success("💥 30% discount applied!");
                      }}
                    >
                      30% Off
                    </button>
                    <button
                      className="btn btn-outline-dark"
                      onClick={() => {
                        setButtonDiscount(0);
                        toast.info("Discount removed");
                      }}
                    >
                      Remove
                    </button>
                  </div>

                  <div className="mt-3 d-flex">
                    <input
                      type="text"
                      placeholder="Enter coupon"
                      className="form-control"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <button
                      className="btn btn-info ms-2"
                      onClick={handleApplyCoupon}
                    >
                      Apply
                    </button>
                  </div>
                </>
              )}

              {/* Payment Selection */}
              <div className="payment-method mt-4">
                <h5>Select Payment</h5>
                <button
                  className={`btn me-2 ${
                    paymentMethod === "qr"
                      ? "btn-success"
                      : "btn-outline-success"
                  }`}
                  onClick={() => {
                    setPaymentMethod("qr");
                    toast.info("📱 QR payment mode selected");
                  }}
                >
                  QR
                </button>
                <button
                  className={`btn ${
                    paymentMethod === "card"
                      ? "btn-primary"
                      : "btn-outline-primary"
                  }`}
                  onClick={() => {
                    setPaymentMethod("card");
                    toast.info("💳 Card payment mode selected");
                  }}
                >
                  Card
                </button>
                <button
                  onClick={() => {
                    setPaymentMethod("cod");
                    toast.info(
                      `💵 COD selected. Pay ₹${discountedTotal.toFixed(
                        2
                      )} on delivery.`
                    );
                  }}
                  className={`btn ms-2 ${
                    paymentMethod === "cod"
                      ? "btn-dark text-white"
                      : "btn-outline-dark"
                  }`}
                >
                  Cash on Delivery
                </button>

                {paymentMethod === "qr" && (
                  <div className="qr-section mt-3 text-center">
                    <h6>Pay ₹{discountedTotal.toFixed(2)} via UPI</h6>
                    <QRCode
                      value={`upi://pay?pa=9381025276@ybl&pn=TasteOfHome&am=${discountedTotal.toFixed(
                        2
                      )}&cu=INR&tn=payment for food`}
                      size={150}
                    />
                    <p className="mt-2 small">UPI ID: 9381025276@ybl</p>
                  </div>
                )}
              </div>

              {/* Email & Checkout */}
              <div className="email mt-4">
                <label className="form-label">Enter your Email</label>
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="form-control"
                />

                <button
                  className="btn btn-warning flex-fill mt-3"
                  onClick={handleCompletePurchase}
                  disabled={!customerEmail || !paymentMethod}
                >
                  Complete Purchase
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Carts;
