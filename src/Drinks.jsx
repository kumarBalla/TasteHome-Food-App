import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "./Store";
import { toast } from "react-toastify";
import "./Veg.css"; // ✅ reuse same card styles

function Drinks() {
  const dispatch = useDispatch();
  const softDrinks = useSelector((state) => state.products.softDrinks);

  const itemsPerPage = 8; // ✅ 2 rows of 4 cards
  const [currentPage, setCurrentPage] = useState(1);

  // Handle empty case
  if (!softDrinks || softDrinks.length === 0) {
    return (
      <div className="container mt-4 text-center">
        No Drinks Found.
      </div>
    );
  }

  const totalPages = Math.ceil(softDrinks.length / itemsPerPage);

  // ✅ Correct slicing
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = softDrinks.slice(startIndex, endIndex);
  return (
    <div className="container-fluid mt-4 px-3">
      {/* Heading */}
      <h3 className="mb-4 text-center">Welcome to Drinks Page</h3>

      {/* Cards Grid */}
      <div className="row">
        {currentItems.map((item) => (
          <div key={item.productId} className="col-12 col-sm-6 col-md-3 mb-4">
            <div className="card shadow-sm text-center h-100 custom-card">
              <img
                src={item.imageUrl}
                className="card-img-top custom-img"
                alt={item.productName}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{item.productName}</h5>
                <p className="card-text flex-grow-1">
                  {item.productDescription}
                </p>
                <h6>₹{item.productPrice} / 500ml</h6>
                <button
                  className="btn btn-success mt-2"
                  onClick={() => {
                    dispatch(cartActions.addCart(item));
                    toast.success(`${item.productName} added to cart! ✅`);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mb-4">
          {/* Prev Button */}
          <button
            onClick={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1))}
            disabled={currentPage === 1}
            className="btn btn-sm btn-outline-success mx-1"
          >
            &laquo; Prev
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`btn btn-sm mx-1 ${
                currentPage === index + 1
                  ? "btn-success"
                  : "btn-outline-success"
              }`}
            >
              {index + 1}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() =>
              setCurrentPage((prev) =>
                prev < totalPages ? prev + 1 : totalPages
              )
            }
            disabled={currentPage === totalPages}
            className="btn btn-sm btn-outline-success mx-1"
          >
            Next &raquo;
          </button>
        </div>
      )}
      {/* Footer */}
<footer className= "  bg-dark text-white mt-5 py-4">
  <div className="container text-center">
    <h5 className="mb-2">Taste of Home</h5>
    <p className="mb-3">
      Bringing fresh and delicious vegetarian delights straight to your home. Taste the tradition, love the flavor.
    </p>
    <div>
      <small>&copy; {new Date().getFullYear()} Taste of Home. All rights reserved.</small>
    </div>
  </div>
</footer>
    </div>
  );
}

export default Drinks;
