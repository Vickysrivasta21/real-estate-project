"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./EmptyPlots.module.css";
import Link from "next/link"

export default function EmptyPlotsPage() {
  const [plots, setPlots] = useState([]);
  const [filteredPlots, setFilteredPlots] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const plotTypes = [
    "Residential Plot",
    "Apartment",
    "Factory Land",
    "Industrial Area",
    "Government Land",
    "Commercial Plot",
  ];

  const locations = [
    "Delhi",
    "Mumbai",
    "Bangalore",
    "Hyderabad",
    "Pune",
    "Chennai",
    "Kolkata",
  ];

  useEffect(() => {
    fetch("http://localhost:5000/api/emptyplotdetails")
      .then((res) => res.json())
      .then((data) => {
        setPlots(data);
        setFilteredPlots(data);
      });
  }, []);

  useEffect(() => {
    let filtered = plots;

    if (selectedType) {
      filtered = filtered.filter((plot) => plot.type === selectedType);
    }

    if (selectedLocation) {
      filtered = filtered.filter((plot) => plot.location === selectedLocation);
    }

    if (sortBy) {
      filtered = [...filtered];
      if (sortBy === "price") {
        filtered.sort((a, b) => a.price - b.price);
      } else if (sortBy === "area") {
        filtered.sort((a, b) => a.area - b.area);
      } else if (sortBy === "type") {
        filtered.sort((a, b) => a.type.localeCompare(b.type));
      }
    }

    setFilteredPlots(filtered);
  }, [plots, selectedType, selectedLocation, sortBy]);

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Explore Empty Plots</h1>

      <div className={styles.filters}>
        <div>
          <label>Type:</label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">All</option>
            {plotTypes.map((type, idx) => (
              <option key={idx} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Location:</label>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="">All</option>
            {locations.map((loc, idx) => (
              <option key={idx} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Sort by:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="">None</option>
            <option value="price">Price</option>
            <option value="area">Area</option>
            <option value="type">Type</option>
          </select>
        </div>
      </div>

      <div className={styles.grid}>
        {filteredPlots.map((plot) => (
          <div key={plot.id} className={styles.card}>
            <img
              src={plot.image}
              onError={(e) => (e.currentTarget.src = "/fallback.jpg")}
              alt="Plot"
              width={400}
              height={200}
              className={styles.cardImage}
            />
            <div className={styles.cardContent}>
              <h2>{plot.title}</h2>
              <p>{plot.description}</p>
              
              <div className={styles.propertyDetails}>
                <div className={styles.propertyDetail}>
                  <strong>Location:</strong> {plot.location}
                </div>
                <div className={styles.propertyDetail}>
                  <strong>Area:</strong> {plot.area} sq ft
                </div>
                <div className={styles.propertyDetail}>
                  <strong>Price:</strong> ₹{plot.price.toLocaleString()}
                </div>
                <div className={styles.propertyDetail}>
                  <strong>Type:</strong> {plot.type}
                </div>
              </div>
              
              <div className={styles.rating}>
                <strong>Rating:</strong> 
                <span className={styles.ratingValue}>{plot.rating}/5</span>
              </div>
              
              {plot.reviews?.[0] && (
                <p>
                  <em>{plot.reviews[0]}</em>
                </p>
              )}
              
              <div className={styles.buttonContainer}>
                <Link href={"/"} className={`${styles.button} ${styles.primaryButton}`}>View Details</Link>
                <Link href={"/"} className={`${styles.button} ${styles.secondaryButton}`}>Contact Agent</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
