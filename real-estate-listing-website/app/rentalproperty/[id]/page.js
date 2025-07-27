"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import L from "leaflet";
import style from './rental.module.css'
import { fetchData } from "@/lib/api";

const PropertyDetails = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [show, setshow] = useState(false)

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const res = await fetchData(`/api/rentpropdetails/${id}`);
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
            const map = L.map("map").setView([property.latitude, property.longitude], 15);

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            L.marker([property.latitude, property.longitude], {
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
        <div>
            <div className={style.maincontainer}>
                <div className={style.detailsMapContainer}>
                    <div className={style.cont}>
                        <div className={style.image}>
                            <Image
                                src={property.image_url}
                                height={450}
                                width={600}
                                style={{ objectFit: 'cover' }}
                                alt='rent rooms'
                            />
                        </div>
                        <div className={style.middle}>
                            <div className={style.rating}> ⭐ {property.rating} /5</div>
                            <div className={style.rent}>Rent : ₹{property.rent_monthly}</div>
                        </div>
                        <div className={style.title}>{property.title}</div>
                        <div className={style.type}>preferred : {property.type}</div>
                        <div className={style.location}>Location : {property.location} <Image src="/wired-flat-2569-logo-google-maps-hover-pinch.svg" width={20} height={20} style={{ objectFit: 'cover' }} alt="rent rooms photo" /></div>
                        <div className={style.avail}>Availability : {property.availability}</div>
                        <button onClick={() => setshow(!show)}>Show additional details</button>
                        <div className={show ? style.moredetails : style.hide}>
                            <div className={style.reviews}>
                                {property.reviews}
                            </div>
                            <h3 className={style.sectionHeading}>Features</h3>
                            <ul className={style.features}>
                                {property.features && property.features.map((ele, index) => (
                                    <li className={style.feat} key={index}>{ele}</li>
                                ))}
                            </ul>
                            <h3 className={style.sectionHeading}>Connectivity</h3>
                            {property.connectivity && (
                                <ul className={style.connectivity}>
                                    <li className={style.metro}>Nearest metro station: {property.connectivity.nearest_metro}</li>
                                    <li className={style.airport}>Nearest airport: {property.connectivity.airport}</li>
                                    <li className={style.railway}>Railway Station: {property.connectivity.nearest_railway}</li>
                                </ul>
                            )}
                        </div>
                    </div>

                    <div className={style.propertyDetailsMap} id="map"></div>
                </div>
            </div>
        </div>

    );
};

export default PropertyDetails;
