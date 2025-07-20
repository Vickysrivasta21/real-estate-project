'use client';

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import L from "leaflet";
import style from './plotdetail.module.css';

const EmptyPlotDetails = () => {
    const { id } = useParams();
    const [plot, setPlot] = useState(null);

    useEffect(() => {
        const fetchPlot = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/emptyplotdetails/${id}`);
                const data = await res.json();
                setPlot(data);
            } catch (err) {
                console.error("Error fetching empty plot:", err);
            }
        };
        fetchPlot();
    }, [id]);

    useEffect(() => {
        if (plot) {
            const map = L.map("plot-map").setView([plot.latitude, plot.longitude], 15);

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            L.marker([plot.latitude, plot.longitude], {
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
    }, [plot]);

    if (!plot) return <div>Loading...</div>;

    return (
        <div className={style.maincontainer}>
            <div className={style.detailsMapContainer}>
                <div className={style.cont}>
                    <div className={style.image}>
                        <Image
                            src={plot.image_url}
                            height={450}
                            width={600}
                            style={{ objectFit: 'cover' }}
                            alt='Empty Plot'
                        />
                    </div>
                    <div className={style.middle}>
                        <div className={style.price}>Price : ₹{plot.price}</div>
                        <div className={style.title}>{plot.title}</div>
                        <div className={style.location}>Location : {plot.location}</div>
                        <div className={style.area}>Area : {plot.area} sq.ft</div>
                        <div className={style.status}>Availability : {plot.availability}</div>
                        <div className={style.description}>{plot.description}</div>
                    </div>
                </div>

                <div className={style.propertyDetailsMap} id="plot-map"></div>
            </div>
        </div>
    );
};

export default EmptyPlotDetails;
