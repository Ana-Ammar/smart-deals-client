import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../provider/AuthContext";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const links = (
    <>
      <li>
        {" "}
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/all-products">All Products</NavLink>
      </li>
      <li>
        <NavLink to="/my-products">My Products</NavLink>
      </li>
      <li>
        <NavLink to="/my-bids">My Bids</NavLink>
      </li>
      <li>
        <NavLink to="/create-product">Create Product</NavLink>
      </li>
    </>
);

const handleSingOut = () => {
  signOutUser()
  .then(() => {
    console.log('sign out succesfull')
  })
  .catch(err => {
    console.log(err.message)
  })
}


  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">
          Smart<span className="text-primary">Deals</span>
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <button
          onClick={handleSingOut}
           className="btn btn-primary">Sign out</button>
        ) : (
          <span>
            <Link to="/login" className="btn text-primary border-primary mr-4">
              Sign in
            </Link>
            <Link to="/register" className="btn btn-primary">
              Register
            </Link>
          </span>
        )}
      </div>
    </div>
  );
};

export default Navbar;
