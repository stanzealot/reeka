// components/UpdatePriceModal.js
import React, { useState } from 'react';
import axios from 'axios';
import './Modal.scss'
import { Spin } from 'antd';
import { toast } from 'react-toastify';

const UpdatePriceModal = ({ property, setIsModalOpen,onPriceUpdate }) => {
  //  const updatedPrice  = (property?.priceOverrides && property?.priceOverrides?.length) ? property?.priceOverrides[property?.priceOverrides.length - 1]?.price : property.basePrice;
  const updatedPrice = property.basePrice;
  const [date, setDate] = useState('');
  const [price, setPrice] = useState(updatedPrice);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Loading state


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const response = await axios.post('https://backend-project-64rz.onrender.com/api/property/update-price', {
        propertyId: property.id,
        date,
        price,
        startDate,
        endDate,
      });

      setMessage(response.data.message);
      toast.success(response.data.message)
       // Call the callback function to re-fetch property data
       if (onPriceUpdate) {
        onPriceUpdate();
      }
      setTimeout(() => setIsModalOpen(false), 2000); // Close modal after 2 seconds
    } catch (error) {
      setMessage('Error updating price');
      toast.error('Error updating price')
    }finally {
        setLoading(false); // Stop loading
      }
  };

//   const updatedPrice  = (property?.priceOverrides && property?.priceOverrides?.length) ? property?.priceOverrides[property?.priceOverrides.length - 1]?.price : property.basePrice;

  return (
    <div className="overlay" onClick={() => setIsModalOpen(false)}>
      <div className="enter-amount-modal" onClick={(e) => e.stopPropagation()}>
      <div className="modal-wrapper">
        <div className="modal-header">
          <h2>Update Price for {property.name}</h2>
          <button onClick={() => setIsModalOpen(false)}>×</button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div>
              <label>Property ID:</label>
              <input type="text" value={property.id} readOnly />
            </div>
            <div>
              <label>Base Price:</label>
              <input type="number" value={updatedPrice} readOnly />
            </div>
            <div>
              <label>Date:</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div>
              <label>New Price:</label>
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
            </div>
            <div>
              <label>Start Date:</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div>
              <label>End Date:</label>
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
            <button className='btn' style={{background:"#E36B37"}} type="submit">
            {loading ? <Spin size="small" /> : 'Update Price'}
            </button>
          </form>
          {message && <p>{message}</p>}
        </div>

      </div>
      </div>
    </div>
  );
};

export default UpdatePriceModal; 