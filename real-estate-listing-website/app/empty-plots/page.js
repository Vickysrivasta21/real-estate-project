"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

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
    "Commercial Plot"
  ];

  const locations = [
    "Delhi",
    "Mumbai",
    "Bangalore",
    "Hyderabad",
    "Pune",
    "Chennai",
    "Kolkata"
  ];

  useEffect(() => {
    fetch("/empty_plots_with_images.json")
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
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <section className="px-6 py-8 max-w-screen-xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">Explore Empty Plots</h1>

        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-10">
          <div className="flex flex-wrap gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
              >
                <option value="">All</option>
                {plotTypes.map((type, idx) => (
                  <option key={idx} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
              >
                <option value="">All</option>
                {locations.map((loc, idx) => (
                  <option key={idx} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort by</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="">-- Select --</option>
              <option value="price">Price</option>
              <option value="area">Area</option>
              <option value="type">Type</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPlots.map((plot) => (
            <div
              key={plot.id}
              className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition duration-200 overflow-hidden"
            >
              <Image
                src={plot.image || "/fallback.jpg"}
                alt="Plot Image"
                width={500}
                height={250}
                className="w-full h-[200px] object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/fallback.jpg";
                }}
              />
              <div className="p-4 space-y-2">
                <h2 className="text-lg font-semibold text-gray-800">{plot.title}</h2>
                <p className="text-sm text-gray-500">{plot.description}</p>
                <div className="text-sm text-gray-600">
                  <p><strong>📍 Location:</strong> {plot.location}</p>
                  <p><strong>📐 Area:</strong> {plot.area} sq ft</p>
                  <p><strong>💰 Price:</strong> ₹{plot.price.toLocaleString()}</p>
                  <p><strong>⭐ Rating:</strong> {plot.rating} / 5</p>
                  <p className="italic">📝 {plot.reviews?.[0]}</p>
                </div>
                <div className="mt-3">
                  <GoogleMap
                    mapContainerStyle={{ height: "200px", width: "100%" }}
                    center={{ lat: plot.lat, lng: plot.lng }}
                    zoom={15}
                  >
                    <Marker position={{ lat: plot.lat, lng: plot.lng }} />
                  </GoogleMap>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </LoadScript>
  );
} 
