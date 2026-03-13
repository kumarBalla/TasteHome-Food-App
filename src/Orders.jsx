import React from "react";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Orders.css"

function Orders() {
  const orders = useSelector((globalState) => globalState.order);

  return (
    <div className="container my-4">
      <h3 className="text-center fw-bold mb-4">📦 Your Orders</h3>

      {orders.length === 0 ? (
        <div className="alert alert-info text-center">No orders yet.</div>
      ) : (
        <div className="row">
          {orders.map((purchase, index) => (
            <div className="col-md-6 mb-4" key={index}>
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">Order #{index + 1}</h5>
                  <p className="text-muted mb-1">
                    <strong>Date:</strong> {purchase.date}
                  </p>
                  <p className="text-muted mb-3">
                    <strong>Total Amount:</strong> ₹{purchase.totalAmount}
                  </p>

                  <h6 className="fw-semibold">Items:</h6>
                  <ul className="list-group list-group-flush">
                    {purchase.items.map((item, i) => (
                      <li
                        key={i}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <span>
                          {item.product.productName} × {item.quantity}
                        </span>
                        <span className="fw-bold">
                          ₹{(item.product.productPrice * item.quantity).toFixed(
                            2
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
