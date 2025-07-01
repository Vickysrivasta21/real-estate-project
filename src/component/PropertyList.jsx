import { Link } from "react-router-dom";
import data from "../data/properties.json";

function PropertyList() {
  return (
    <div>
      <h2>Available Properties</h2>
      {data.map(property => (
        <div key={property.id}>
          <h3>{property.title}</h3>
          <p>{property.price}</p>
          <Link to={`/property/${property.id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
}

export default PropertyList;
