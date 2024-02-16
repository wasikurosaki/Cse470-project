import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Img from "../assets/Black_and_Red_Modern_Automotive_Car_Logo__2_-removebg-preview.png";

const Header = () => {
  const navigate = useNavigate();

  function checkUserLoggedIn() {
    const token = localStorage.getItem("token");
    return !!token; // Returns true if token exists, false otherwise
  }

  const userLoggedIn = checkUserLoggedIn();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/home");
  };

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex flex-row gap-2 items-center">
            <div className="flex-shrink-0">
              <img className="h-36 w-auto" src={Img} alt="Your Company" />
            </div>
            {/* Links */}
            <Link
              to="/"
              className="text-white rounded-md px-3 py-2 text-sm font-medium"
              aria-current="page"
            >
              Home
            </Link>
            <Link
              to="/admin"
              className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            >
              Admin
            </Link>
            <Link
              to="/customer"
              className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            >
              Customer
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {!userLoggedIn ? (
              <Link
                to="/login"
                className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
              >
                Login
              </Link>
            ) : (
              <div className="flex space-x-4">
                <Link
                  onClick={handleLogout}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Logout
                </Link>
                <Link
                  to="/changepass"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Change Password
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
