import React, { useContext, useEffect } from 'react';
import './Verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');

  const verifyPayment = async () => {
    try {
      const response = await axios.post(`${url}/api/order/verify`, {
        success,
        orderId,
      });

      if (response.data.success) {
        navigate('/myorders');
      } else {
        alert(response.data.message);
        navigate('/');
      }
    } catch (error) {
      // Manejar errores en la solicitud
      alert(error.response?.data?.message || 'Error verifying payment');
      navigate('/');
    }
  };

  // Ejecutar verifyPayment cuando el componente se monte
  useEffect(() => {
    verifyPayment();
  }, []); // Dependencias vacías para que se ejecute solo una vez
  return (
    <div className='verify'>
      <div className='spinner'></div>
    </div>
  );
};

export default Verify;
