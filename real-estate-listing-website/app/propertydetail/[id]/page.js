"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/propertydetails/${id}`);
        const data = await res.json();
        setProperty(data);
      } catch (err) {
        console.error("Error fetching property:", err);
      }
    };
    fetchProperty();
  }, [id]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.google && property) {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: property.lat, lng: property.lng },
        zoom: 15,
      });

      new window.google.maps.Marker({
        position: { lat: property.lat, lng: property.lng },
        map: map,
      });
    }
  }, [property]);

  if (!property) return <div>Loading...</div>;

  return (
    <div className="maincont">
      <div className="container">
        <div className="image">
          <Image src={property.image} width={600} height={400} alt="Property image" />
        </div>
        <div className="type-price">
          <div className="type">{property.type}</div>
          <div className="price">{property.price}</div>
        </div>
        <div className="title"><h1>{property.title}</h1></div>
        <div className="location">Location: {property.location}</div>
        <div className="features">
          <div className="size">Size: {property.size}</div>
          <div className="beds">Bedrooms: {property.bedrooms}</div>
          <div className="bath">Bathrooms: {property.bathrooms}</div>
          <div className="parking">Parking: {property.parking ? "Available" : "Not available"}</div>
        </div>
        <div id="map" style={{ width: "100%", height: "300px", marginTop: "20px" }}></div>
      </div>
    </div>
  );
};

export default PropertyDetails;
