import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = 'https://back-food-del.onrender.com';
  const [token, setToken] = useState('');
  const [food_list, setFoodList] = useState([]);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      // Si el artículo ya está en el carrito, incrementa su cantidad en 1
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    if (token) {
      try {
        await axios.post(
          `${url}/api/cart/add/${itemId}`,
          {},
          {
            headers: { token },
          }
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Función para eliminar un artículo del carrito (disminuir su cantidad)
  const removeFromCart = async (itemId) => {
    // Si el artículo está en el carrito y su cantidad es mayor a 0, disminúyelo en 1
    if (cartItems[itemId])
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    if (token) {
      try {
        await axios.post(
          `${url}/api/cart/remove/${itemId}`,
          {},
          {
            headers: { token },
          }
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  const deleteFromCart = async (itemId) => {
    // Si el artículo está en el carrito su cantidad pasa a 0, no se elimina
    if (cartItems[itemId]) setCartItems((prev) => ({ ...prev, [itemId]: 0 }));

    if (token) {
      try {
        await axios.post(
          `${url}/api/cart/delete/${itemId}`,
          {},
          { headers: { token } }
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }

    return totalAmount;
  };

  const fetchCartData = async (token) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/cart/get`, {
        headers: { token },
      });
      if (response.data.success) {
        setCartItems(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFoodList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setFoodList(response.data.data);
    }
  };

  // Define el valor del contexto que será proporcionado a los componentes hijos
  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    deleteFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem('token')) {
        const getToken = localStorage.getItem('token');
        setToken(getToken);
        await fetchCartData(localStorage.getItem('token'));
      }
    }

    loadData();
  }, []);

  // Envuelve los hijos del componente con el Provider del contexto
  // El valor del contexto está disponible para los componentes hijos
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
      {/* Renderiza los componentes hijos dentro del Provider */}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
