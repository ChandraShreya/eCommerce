"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faStar, faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { fetchProducts } from "@/redux/slice/productSlice/productSlice";
import { addToCart } from "@/redux/slice/cartSlice/cartSlice";
import styles from "./page.module.css";


export default function Home() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.products);
  const cartItems = useSelector((state) => state.cart.items || []);

  const [priceFilter, setPriceFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [sortOption, setSortOption] = useState("");


  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify({ items: cartItems }));
  }, [cartItems]);

  let filteredProducts = items;

  if (priceFilter) {
    filteredProducts = filteredProducts.filter(
      (item) => item.price <= Number(priceFilter)
    );
  }

  if (ratingFilter) {
    filteredProducts = filteredProducts.filter(
      (item) => item.rating.rate >= Number(ratingFilter)
    );
  }

  if (sortOption === "price") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortOption === "name") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.title.localeCompare(b.title));
  }

  return (
    <div className={styles.homeContainer}>
      <div className={styles.homeHeader}>
        <div className={styles.homeHeaderContent}>
          <h1 className={styles.homeTitle}>Shop</h1>
          <Link href="/cart">
            <button className={styles.cartBtn}>
              <FontAwesomeIcon icon={faShoppingCart} className={styles.iconSpacing} />
              Cart
              {cartItems.length > 0 && (
                <span className={styles.cartBadge}>
                  {cartItems.length}
                </span>
              )}
            </button>
          </Link>
        </div>
      </div>

      <div className={styles.homeMain}>
        <div className={styles.filtersContainer}>
          <input
            type="number"
            placeholder="Max Price"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className={styles.filterInput}
          />

          <input
            type="number"
            placeholder="Min Rating"
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            className={styles.filterInput}
          />

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className={styles.filterSelect}
          >
            
            <option value="price">Sort by Price</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>


        {status === "loading" && <p className={styles.loadingText}>Loading products...</p>}

        <div className={styles.productsGrid}>
          {filteredProducts.map((item) => (
            <div
              key={item.id}
              className={styles.productCard}
            >
              <img
                src={item.image}
                alt={item.title}
                className={styles.productImage}
              />

              <h4 className={styles.productTitle}>{item.title}</h4>
              <div className={styles.productInfo}>
                <p className={styles.productPrice}>
                  <FontAwesomeIcon icon={faDollarSign} className={styles.iconSpacing} />{item.price.toFixed(2)}
                </p>
                <p className={styles.productRating}>
                  <FontAwesomeIcon icon={faStar} className={`${styles.starIcon} ${styles.iconSpacing}`} />{item.rating.rate}
                </p>
              </div>

              <button
                onClick={() => {
                  dispatch(addToCart({ ...item }));
                }}
                className={styles.addToCartBtn}
              >
                Add to Cart
              </button>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
