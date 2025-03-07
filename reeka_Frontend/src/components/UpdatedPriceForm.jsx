import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdatePriceForm = ({ propertyId }) => {
  const [property, setProperty] = useState(null);
  const [date, setDate] = useState('');
  const [price, setPrice] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [message, setMessage] = useState('');

  // Fetch property details when the component mounts
  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        // const response = await axios.get(`http://localhost:4000/api/property/${propertyId}/prices`);
        const response = await axios.get(`http://localhost:4000/api/property/550e8400-e29b-41d4-a716-446655440000/prices`);
        console.log("Response: ",response)
        setProperty(response.data.property);
        setPrice(response.data.property.basePrice); // Pre-fill the price with the base price
      } catch (error) {
        setMessage('Error fetching property details');
      }
    };

    fetchPropertyDetails();
  }, [propertyId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/property/update-price', {
        propertyId,
        date,
        price,
        startDate,
        endDate,
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error updating price');
    }
  };

  if (!property) {
    return <p>Loading property details...</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Property ID:</label>
        <input type="text" value={property.id} readOnly />
      </div>
      <div>
        <label>Property Name:</label>
        <input type="text" value={property.name} readOnly />
      </div>
      <div>
        <label>Base Price:</label>
        <input type="number" value={property.basePrice} readOnly />
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
      <button type="submit">Update Price</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default UpdatePriceForm;