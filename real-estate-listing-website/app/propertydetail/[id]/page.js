"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import L from "leaflet";                  // 🌟 Import Leaflet
import "leaflet/dist/leaflet.css";        // 🌟 Import Leaflet CSS
import styles from "./Property.module.css"

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
    if (property) {
      const map = L.map("map").setView([property.lat, property.lng], 15);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      L.marker([property.lat, property.lng], {
        icon: L.icon({
          iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
          shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        }),
      }).addTo(map);
    }
  }, [property]);

  if (!property) return <div>Loading...</div>;

  return (
    <div className={styles.propertyDetailsContainer}>
      <div className={styles.propertyDetailsCard}>
        <div className={styles.propertyDetailsImage}>
          <Image src={property.image} alt="Property image"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '98.9%', height: 'auto' }} />
        </div>

        <div className={styles.propertyDetailsTypePrice}>
          <div className="type">{property.type}</div>
          <div className="price">{property.price}</div>
        </div>

        <div className="title">
          <h1>{property.title}</h1>
        </div>

        <div className="location">
          Location: {property.location}
        </div>

        <div className="features">
          <div className="size">Size: {property.size}</div>
          <div className="beds">Bedrooms: {property.bedrooms}</div>
          <div className="bath">Bathrooms: {property.bathrooms}</div>
          <div className="parking">
            Parking: {property.parking ? "Available" : "Not available"}
          </div>
        </div>
      </div>

      <div className={styles.propertyDetailsMap} id="map"></div>
    </div>

  );
};

export default PropertyDetails;
