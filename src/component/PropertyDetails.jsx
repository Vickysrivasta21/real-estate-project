import { useParams } from "react-router-dom";
import data from "../data/properties.json";
import { useEffect } from "react";

function PropertyDetails() {
  const { id } = useParams();
  const property = data.find(p => p.id === parseInt(id));

  useEffect(() => {
    if (window.google && property) {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: property.lat, lng: property.lng },
        zoom: 15
      });

      new window.google.maps.Marker({
        position: { lat: property.lat, lng: property.lng },
        map: map
      });
    }
  }, [property]);

  if (!property) return <p>Property not found</p>;

  return (
    <div>
      <h2>{property.title}</h2>
      <p>{property.description}</p>
      <p>{property.price}</p>
      <p>Location: {property.location}</p>
      <p>Rating: ⭐ {property.rating}</p>
      <h4>Reviews:</h4>
      <ul>
        {property.reviews.map((review, i) => (
          <li key={i}>{review}</li>
        ))}
      </ul>

      <div id="map" style={{ height: "300px", width: "100%" }}></div>
    </div>
  );
}

export default PropertyDetails;
