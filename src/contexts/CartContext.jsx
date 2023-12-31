import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  // cart state
  const [cart, setCart] = useState([]);

  // item amount state
  const [itemAmount, setItemAmount] = useState(0);

  // total price state
  const [total, setTotal] = useState(0);

  // get cart from local storage
  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      setCart(JSON.parse(cart));
    }
  }, []);

  // save cart to local storage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    // calculate total price
    let newTotal = cart.reduce((total, item) => {
      return (total += item.price * item.amount);
    }, 0);
    setTotal(newTotal);
  });

  //  update item amount
  useEffect(() => {
    let newAmount = cart.reduce((total, item) => {
      return (total += item.amount);
    }, 0);
    setItemAmount(newAmount);
  });

  const addTocart = (product, id) => {
    const newItem = { ...product, amount: 1 };
    // check if item already in cart
    const cartItem = cart.find((item) => {
      return item.id === id;
    });
    // if item already in cart
    if (cartItem) {
      const newCart = cart.map((item) => {
        if (item.id === id) {
          return { ...item, amount: item.amount + 1 };
        }
        return item;
      });
      setCart(newCart);
    } else {
      setCart([...cart, newItem]);
    }
  };

  // remove from carat
  const removeFromCart = (id) => {
    const newCart = cart.filter((item) => {
      return item.id !== id;
    });
    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  // increase amount
  const increaseAmount = (id) => {
    // const newCart = cart.map((item) => {
    //   if (item.id === id) {
    //     return { ...item, amount: item.amount + 1 };
    //   }
    //   return item;
    // });
    // setCart(newCart);

    const item = cart.find((item) => item.id === id);
    addTocart(item, id);
  };

  // decrease amount
  const decreaseAmount = (id) => {
    const cartItem = cart.find((item) => {
      return item.id === id;
    });
    if (cartItem) {
      const newCart = cart.map((item) => {
        if (item.id === id) {
          return { ...item, amount: item.amount - 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    }

    if (cartItem.amount < 2) {
      removeFromCart(id);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addTocart,
        removeFromCart,
        clearCart,
        increaseAmount,
        decreaseAmount,
        itemAmount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
