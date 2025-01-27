import { atom, useAtom } from "jotai";
import axios from "axios"
import Immutable from "seamless-immutable";
import { useEffect, useRef } from "react";
import { useJwt } from "./UserStore";

let initialCart = Immutable([]);
// [{
//   "id": null,
//   "product_id": null,
//   "quantity": null,
//   "productName": null,
//   "price": null,
//   "imageUrl": null,
//   "description": null
// }]
// );

// Create an atom for the cart
export const cartAtom = atom(initialCart);
export const cartLoadingAtom = atom(false);

// Custom hook for cart operations
export const useCart = () => {
  const [cart, setCart] = useAtom(cartAtom);
  const [isLoading, setIsLoading] = useAtom(cartLoadingAtom);
  const { getJwt } = useJwt();

  // Function to calculate the total price of items in the cart
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingItemIndex = currentCart.findIndex(item => item.product_id === product.id);
      if (existingItemIndex !== -1) {
        // Use setIn to update quantity immutably
        const currentQuantity = currentCart[existingItemIndex].quantity;
        return currentCart.setIn([existingItemIndex, 'quantity'], currentQuantity + 1);
      } else {
        // Use concat to add a new item immutably
        return currentCart.concat({ ...product, product_id: product.id, quantity: 1 });
      }
    });
  };

  const modifyQuantity = (product_id, quantity) => {
    setCart((currentCart) => {
      const existingItemIndex = currentCart.findIndex(item => item.product_id === product_id);
      if (existingItemIndex !== -1) {

        // check if the quantity will be reduced to 0 or less, if so remove the item
        if (quantity < 0) {
          return currentCart.filter(item => item.product_id !== product_id);
        } else {
          return currentCart.setIn([existingItemIndex, 'quantity'], quantity);
        }

      }
    });
  }

  const removeFromCart = (product_id) => {
    setCart((currentCart) => {
      return currentCart.filter(item => item.product_id !== product_id);
    });
  }

  const fetchCart = async () => {
    const jwt = getJwt();
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/cart`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      setCart(Immutable(response.data));
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setIsLoading(false);
    }


  };

  return {
    cart,
    addToCart,
    modifyQuantity,
    removeFromCart,
    getCartTotal,
    fetchCart
  };
};