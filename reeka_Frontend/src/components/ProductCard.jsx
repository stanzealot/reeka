import React from 'react';

const ProductCard = ({ property, onUpdatePriceClick }) => {
  
  // const updatedPrice = (property?.priceOverrides && property?.priceOverrides?.length) ? property?.priceOverrides[property?.priceOverrides.length - 1]?.price : property.basePrice;
  const updatedPrice = property.basePrice;
  
  return (
    <div className="product-card" data-aos="zoom-in" data-aos-delay="100">
      <img src={property.image || '/images/beach.jpg'} alt={property.name} className="img-fluid" />

      <div className="product-details">
        <h3 style={{ color: "#E36B37" }}>{property.name}</h3>
        <p>{property.location}</p>
        <p>Base Price:{updatedPrice} </p>
        <button style={{ marginTop: "20px" }} className='btn' onClick={() => onUpdatePriceClick(property)}>Update Price</button>
      </div>
    </div>
  );
};

export default ProductCard;