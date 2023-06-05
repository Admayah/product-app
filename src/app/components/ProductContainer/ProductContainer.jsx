"use client";

import { useState, useEffect } from "react";
import { useDisclosure, useToast } from "@chakra-ui/react";

import Navbar from "../Navbar/Navbar";
import ProductCard from "../ProductCard/ProductCard";
import CartDrawer from "../Cart/Cart";

import "./style.css";
import ProductLoader from "../ProductLoader/ProductLoader";

const ProductContainerr = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchProducts, setSearchProducts] = useState("");
  const [sortType, setSortType] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getProductData = async () => {
      const data = await fetch("https://fakestoreapi.com/products");
      const jsonData = await data.json();
      setProducts(jsonData);
      setIsLoading(false);
    };
    getProductData();
  }, [searchProducts]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  useEffect(() => {
    const sortedProducts = () => {
      const data = [...products].sort((a, b) => {
        if (sortType === "ascending") {
          return a.price - b.price;
        } else if (sortType === "descending") {
          return b.price - a.price;
        } else {
          return 0;
        }
      });
      setProducts(data);
    };
    sortedProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortType]);

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      const updatedCartItems = cartItems.map((item) => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });

      updateCartItems(updatedCartItems);
    } else {
      const newItem = { ...product, quantity: 1 };
      updateCartItems([...cartItems, newItem]);
      toast({
        title: "product added to cart.",
        description: "New product succesfully added to cart.",
        status: "success",
        position: "top-right",
        duration: 3000,
        isClosable: true,
      });
    }
    localStorage.setItem("products", JSON.stringify(cartItems));
  };

  const updateCartItems = (updatedItems) => {
    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  };

  const handleSearch = (e) => {
    setSearchProducts(e.target.value);
  };

  const handleSearchProducts = () => {
    const searchProductItems = products.filter((product) =>
      product.title.toLowerCase().includes(searchProducts.toLocaleLowerCase())
    );
    setProducts(searchProductItems);
  };

  const isProductInCart = (product) => {
    return cartItems.find((item) => item.id === product.id);
  };

  return (
    <>
      <CartDrawer
        cartItems={cartItems}
        isOpen={isOpen}
        onClose={onClose}
        updateCartItems={updateCartItems}
      />
      <Navbar
        cartItems={cartItems}
        handleSearchText={handleSearch}
        handleSearchData={handleSearchProducts}
        onOpen={onOpen}
      />
      {isLoading ? (
        <ProductLoader />
      ) : (
        <div className="products__container">
          <div className="products__wrap">
            <div className="mobile__search-local">
              <div className="icon">
                <i className="fa fa-search" aria-hidden="true"></i>
                <input type="text" placeholder="Search for a product" 
                onChange={handleSearch}
                />
              </div>

              <button type="button" onClick={handleSearchProducts}>search</button>
            </div>
            <div className="sort-bar">
              <label htmlFor="sort-select">Sort By Price:</label>
              <select
                id="sort-select"
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}
              >
                <option value="">None</option>
                <option value="ascending">LOW to HIGH</option>
                <option value="descending">HIGH to LOW</option>
              </select>
            </div>
            <div className="products__wrapper">
              {products &&
                products.map((product, i) => (
                  <ProductCard
                    key={i}
                    product={product}
                    addToCart={addToCart}
                    isProductInCart={isProductInCart(product)}
                  />
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductContainerr;
