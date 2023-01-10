import { createContext, useContext, useState, useEffect } from "react";
import { getAllProducts } from "../api/Products.api";

/**
 * Creando el contexto de carro de compras
 */
export const CartContext = createContext();

/**
 * Creando hook para validar que el contexto solo sea accedido
 * desde donde se ha colocado
 */
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe de ser usado desde un CartContextProvider");
  }
  return context;
};

/**
 * Elaborando el provider para nuestro context, el cual por ahora
 * solo devolvera un objeto con todos los productos que se han traido desde
 * la API
 */
export const CartProvider = ({ children }) => {
  /**
   * State para controlar los productos que se han ingresado al carrito
   */
  const [cartItems, setCartItems] = useState(() => {
    try {
      /**
       * El estado inicial de este hook sera el detalle de los productos que
       * se almacenaron en el localstorage
       */
      const productsInLocalStore = localStorage.getItem("cartProducts");
      return productsInLocalStore ? JSON.parse(productsInLocalStore) : [];
    } catch (error) {
      return [];
    }
  });

  /**
   * UseEffect que controlara los productos en el carrito en el localstorage
   * cada vez que ocurran cambios en el state de los productos del carrito
   */
  useEffect(() => {
    localStorage.setItem("cartProduts", JSON.stringify(cartItems));
  }, [cartItems]);

  const addItemToCart = (product) => {
    const inCart = cartItems.find(
      (productInCart) => productInCart.id === product.id
    );

    if (inCart) {
      setCartItems(
        cartItems.map((productInCart) => {
          if (productInCart.id === product.id) {
            return {
              ...productInCart,
              quantity: productInCart.quantity + 1,
            };
          } else {
            return productInCart;
          }
        })
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeItemFromCart = (product) => {
    const inCart = cartItems.find(
      (productInCart) => productInCart.id === product.id
    );

    if (inCart.quantity === 1) {
      setCartItems(
        cartItems.filter((productInCart) => productInCart.id !== product.id)
      );
    } else {
      setCartItems(
        cartItems.map((productInCart) => {
          if (productInCart.id === product.id) {
            return {
              ...productInCart,
              quantity: productInCart.quantity - 1,
            };
          } else {
            return productInCart;
          }
        })
      );
    }
  };

  /**
   * State para controlar los productos que provienen desde la API
   */
  const [products, setProducts] = useState([]);

  async function loadProducts() {
    const response = await getAllProducts();
    setProducts(response.data.products);
  }

  return (
    <CartContext.Provider value={{ products, loadProducts, cartItems, addItemToCart, removeItemFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
