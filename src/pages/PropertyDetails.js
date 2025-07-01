import React from 'react';
import { useParams } from 'react-router-dom';
import properties from '../data/properties.json';
import Reviews from '../components/Reviews';

const PropertyDetails = () => {
  const { id } = useParams();
  const property = properties.find((p) => p.id === parseInt(id));

  if (!property) {
    return <h2>Property not found</h2>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>{property.title}</h1>
      <p><strong>Price:</strong> {property.price}</p>
      <p><strong>Location:</strong> {property.location}</p>
      <p><strong>Rating:</strong> {property.rating} ⭐</p>

      <Reviews reviews={property.reviews} />
    </div>
  );
};

export default PropertyDetails;
