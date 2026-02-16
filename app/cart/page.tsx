"use client";
import { useEffect } from "react";
import { removeFromCart, updateQuantity } from "@/redux/slice/cartSlice/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faShoppingCart, faDollarSign } from "@fortawesome/free-solid-svg-icons";
import styles from "./cart.module.css";

export default function CartPage() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items || []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify({ items }));
  }, [items]);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <h1 className={styles.cartTitle}><FontAwesomeIcon icon={faShoppingCart} /> Your Cart</h1>
      {items.length === 0 ? (
        <p className={styles.cartEmpty}>Your cart is empty.</p>
      ) : (
        <div className={styles.cartContainer}>
          <table className={styles.cartTable}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item) => (
                <tr key={item.id} className={styles.cartRow}>
                  <td className={styles.cartProduct}>
                    <img src={item.image} alt={item.title} className={styles.cartImage} />
                    <div className={styles.cartProductInfo}>
                      <div className={styles.cartProductTitle}>{item.title}</div>
                      <div className={styles.cartProductSmall}>ID: {item.id}</div>
                    </div>
                  </td>

                  <td className={styles.price}><FontAwesomeIcon icon={faDollarSign} /> {item.price}</td>

                  <td>
                    <input
                      className={styles.cartQty}
                      type="number"
                      value={item.quantity}
                      min={1}
                      onChange={(e) =>
                        dispatch(
                          updateQuantity({
                            id: item.id,
                            quantity: Number(e.target.value),
                          })
                        )
                      }
                    />
                  </td>

                  <td className={styles.cartTotal}><FontAwesomeIcon icon={faDollarSign} /> {(item.price * item.quantity).toFixed(2)}</td>

                  <td>
                    <button className={styles.cartDelete} onClick={() => dispatch(removeFromCart(item.id))}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className={styles.cartSummary}>
            <h2><FontAwesomeIcon icon={faDollarSign} /> Total: ${total.toFixed(2)}</h2>
          </div>
        </div>
      )}
    </>
  );
}