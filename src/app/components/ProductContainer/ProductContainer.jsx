"use client";

import { useState, useEffect } from "react";
import { useDisclosure, useToast } from "@chakra-ui/react";

import Navbar from "../Navbar/Navbar";
import ProductCard from "../ProductCard/ProductCard";

import "./style.css";

const ProductContainerr = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProductData = async () => {
      const data = await fetch("https://fakestoreapi.com/products");
      const jsonData = await data.json();
      setProducts(jsonData);
    //   setIsLoading(false);
    };
    getProductData();
  }, []);

  return (
    <>
      <Navbar
        // handleSearchText={handleSearch}
        // handleSearchData={handleSearchProducts}
        onOpen={onOpen}
      />
      <div className="products__container">
        <div style={{ padding: "30px" }}>
          <div className="mobile__search-local">
            <div className="icon">
              <i className="fa fa-search" aria-hidden="true"></i>
              <input type="text" placeholder="Search for a product" />
            </div>

            <button type="button">search</button>
          </div>
          <div className="sort-bar">
            <label htmlFor="sort-select">Sort By Price:</label>
            <select id="sort-select">
              <option value="">None</option>
              <option value="ascending">priceLowToHigh</option>
              <option value="descending">priceHighToLow</option>
            </select>
          </div>
          <div className="products__wrapper">
            {products &&
              products.map((product, i) => (
                <ProductCard product={product} key={i} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductContainerr;
