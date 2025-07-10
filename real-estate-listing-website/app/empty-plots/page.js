"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./EmptyPlots.module.css";

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
    fetch("/empty_plots.json")
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
            <Image
              src={plot.image || "/fallback.jpg"}
              alt="Plot"
              width={400}
              height={200}
              className={styles.cardImage}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/fallback.jpg";
              }}
            />
            <div className={styles.cardContent}>
              <h2>{plot.title}</h2>
              <p>{plot.description}</p>
              <p>
                <strong>Location:</strong> {plot.location}
              </p>
              <p>
                <strong>Area:</strong> {plot.area} sq ft
              </p>
              <p>
                <strong>Price:</strong> ₹{plot.price.toLocaleString()}
              </p>
              <p>
                <strong>Type:</strong> {plot.type}
              </p>
              <p>
                <strong>Rating:</strong> {plot.rating} / 5
              </p>
              <p>
                <em>{plot.reviews?.[0]}</em>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
