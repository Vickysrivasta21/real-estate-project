"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";
import styles from "./Property.module.css";

const Map = dynamic(() => import("./Map"), { ssr: false });

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

  if (!property) return <div>Loading...</div>;

  return (
    <div className={styles.propertyDetailsContainer}>
      <div className={styles.propertyDetailsCard}>
        <div className={styles.propertyDetailsImage}>
          <Image
            src={property.image}
            alt="Property image"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "98.9%", height: "auto" }}
          />
        </div>

        <div className={styles.propertyDetailsTypePrice}>
          <div className="type">{property.type}</div>
          <div className="price">{property.price}</div>
        </div>

        <div className="title">
          <h1>{property.title}</h1>
        </div>

        <div className="location">Location: {property.location}</div>

        <div className="features">
          <div className="size">Size: {property.size}</div>
          <div className="beds">Bedrooms: {property.bedrooms}</div>
          <div className="bath">Bathrooms: {property.bathrooms}</div>
          <div className="parking">
            Parking: {property.parking ? "Available" : "Not available"}
          </div>
        </div>
      </div>

      {property.lat && property.lng && <Map lat={property.lat} lng={property.lng} className={styles.propertyDetailsMap} />}
    </div>
  );
};

export default PropertyDetails;
