"use client";
import React from "react";

import "./style.css";

const Navbar = ({ handleSearchData, handleSearchText, cartItems, onOpen }) => {
  return (
    <div
      className="navbar__bar"
      style={{ position: "fixed", top: 0, width: "100%", zIndex: 2 }}
    >
      <h3 style={{ textTransform: "uppercase", fontWeight: "bold" }}>
        products
      </h3>
      <div className="search__form">
        <div className="searchbar__container">
          <i className="fa fa-search"></i>{" "}
          <input
            type="text"
            placeholder="Search for a product"
            onChange={handleSearchText}
          />
        </div>
        <button type="submit" onClick={() => handleSearchData()}>
          search
        </button>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          color: "black",
          cursor: "pointer",
        }}
        onClick={onOpen}
      >
        <i className="fa fa-shopping-cart" style={{ fontSize: "24px" }}>
          <span>{cartItems ? cartItems.length : 0}</span>
        </i>
        <p style={{ fontSize: "1.5rem" }}>My Cart</p>
      </div>
    </div>
  );
};

export default Navbar;
