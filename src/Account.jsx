import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Account() {
  const navigate = useNavigate();

  // State to toggle between login and signup
  const [isLogin, setIsLogin] = useState(true);

  // Refs for form inputs
  const userNameRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  // State for errors
  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const username = userNameRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    const confirmPassword = confirmPasswordRef.current?.value.trim();

    let valid = true;

    // Username validation
    if (!username) {
      setUserNameError("⚠ Username is required");
      valid = false;
    } else {
      setUserNameError("");
    }

    // Password validation
    if (!password) {
      setPasswordError("⚠ Password is required");
      valid = false;
    } else {
      setPasswordError("");
    }

    // Confirm password validation (only for signup)
    if (!isLogin) {
      if (!confirmPassword) {
        setConfirmPasswordError("⚠ Confirm password is required");
        valid = false;
      } else if (password !== confirmPassword) {
        setConfirmPasswordError("❌ Passwords do not match");
        valid = false;
      } else {
        setConfirmPasswordError("");
      }
    }

    // If valid, handle login/signup
    if (valid) {
      if (isLogin) {
        // Login logic
        if (username === "admin" && password === "admin@123") {
          alert("✅ Login Successful");
          navigate("/"); // Redirect to homepage
        } else {
          alert("❌ Invalid Credentials");
        }
      } else {
        // Signup logic
        alert("✅ Sign Up Successful");
        navigate("/"); // Redirect to homepage after signup
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card shadow-lg p-4"
        style={{ width: "400px", borderRadius: "20px" }}
      >
        {/* Dropdown to switch between login and signup */}
        <div className="dropdown mb-4 text-end">
          <button
            className="btn btn-outline-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li>
              <button className="dropdown-item" onClick={() => setIsLogin(true)}>
                Login
              </button>
            </li>
            <li>
              <button className="dropdown-item" onClick={() => setIsLogin(false)}>
                Sign Up
              </button>
            </li>
          </ul>
        </div>

        <h3 className="text-center mb-4 fw-bold text-primary">
          {isLogin ? "Login" : "Create Account"}
        </h3>

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              ref={userNameRef}
              className={`form-control ${userNameError ? "is-invalid" : ""}`}
              placeholder="Enter username"
            />
            {userNameError && <div className="invalid-feedback">{userNameError}</div>}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              ref={passwordRef}
              className={`form-control ${passwordError ? "is-invalid" : ""}`}
              placeholder="Enter password"
            />
            {passwordError && <div className="invalid-feedback">{passwordError}</div>}
          </div>

          {/* Confirm Password - Only for Signup */}
          {!isLogin && (
            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                ref={confirmPasswordRef}
                className={`form-control ${confirmPasswordError ? "is-invalid" : ""}`}
                placeholder="Confirm password"
              />
              {confirmPasswordError && (
                <div className="invalid-feedback">{confirmPasswordError}</div>
              )}
            </div>
          )}

          {/* Submit Button */}
          <div className="d-grid">
            <button className="btn btn-primary rounded-pill" type="submit">
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </div>
        </form>

        {/* Extra link */}
        <p className="text-center mt-3 text-muted">
          {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
          <span
            className="text-primary"
            style={{ cursor: "pointer" }}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Account;
