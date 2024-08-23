import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const PlaceOrder = () => {
  const fee = 2;
  const navigate = useNavigate();

  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData((prev) => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    // Filtrar los elementos del carrito que tienen una cantidad mayor a 0
    const orderItems = food_list
      .filter((item) => cartItems[item._id] > 0)
      .map((item) => ({
        ...item,
        quantity: cartItems[item._id],
      }));

    // Crear el objeto de datos del pedido
    const orderData = {
      items: orderItems,
      amount: getTotalCartAmount() + fee,
      address: data,
    };

    try {
      // Enviar la solicitud POST para realizar el pedido
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token },
      });

      // Redirigir a la URL de la sesión si el pedido fue exitoso
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      // Manejar errores en la solicitud
      alert(error.response?.data?.message || 'Error placing order');
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/');
    } else if (getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token]);

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className='place-order-left'>
        <h2 className='title'>Delivery Information</h2>

        <div className='multi-fields'>
          <input
            required
            name='firstName'
            onChange={onChangeHandler}
            value={data.firstName}
            type='text'
            placeholder='First Name'
          />
          <input
            required
            name='lastName'
            onChange={onChangeHandler}
            value={data.lastName}
            type='text'
            placeholder='Last Name'
          />
        </div>

        <input
          required
          name='email'
          onChange={onChangeHandler}
          value={data.email}
          type='email'
          placeholder='Email address'
        />
        <input
          required
          name='street'
          onChange={onChangeHandler}
          value={data.street}
          type='text'
          placeholder='Street'
        />

        <div className='multi-fields'>
          <input
            required
            name='city'
            onChange={onChangeHandler}
            value={data.city}
            type='text'
            placeholder='City'
          />
          <input
            required
            name='state'
            onChange={onChangeHandler}
            value={data.state}
            type='text'
            placeholder='State'
          />
        </div>

        <div className='multi-fields'>
          <input
            required
            name='zipCode'
            onChange={onChangeHandler}
            value={data.zipCode}
            type='text'
            placeholder='Zip code'
          />
          <input
            required
            name='country'
            onChange={onChangeHandler}
            value={data.country}
            type='text'
            placeholder='Country'
          />
        </div>

        <input
          required
          name='phone'
          onChange={onChangeHandler}
          value={data.phone}
          type='text'
          placeholder='Phone'
        />
      </div>

      <div className='place-order-right'>
        <div className='cart-total'>
          <h2>Cart Total</h2>

          <div>
            <div className='cart-total-details'>
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>

            <hr />

            <div className='cart-total-details'>
              <p>Delivery Fee</p>
              <p>${fee}</p>
            </div>

            <hr />

            <div className='cart-total-details'>
              <b>Total</b>
              <b>${getTotalCartAmount() ? getTotalCartAmount() + fee : 0}</b>
            </div>
          </div>

          <button type='submit'>Proceed to payment</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
