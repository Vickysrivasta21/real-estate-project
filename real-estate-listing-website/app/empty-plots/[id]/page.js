'use client';

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import L from "leaflet";
import style from './plotdetail.module.css';
import { fetchData } from "@/lib/api";

const EmptyPlotDetails = () => {
    const { id } = useParams();
    const [plot, setPlot] = useState(null);

    useEffect(() => {
        const fetchPlot = async () => {
            try {
                const res = await fetchData(`/api/plotdetailsdynamic/${id}`);
                const data = await res.json();
                const plotdata = setprice(data)
                setPlot(plotdata);
            } catch (err) {
                console.error("Error fetching empty plot:", err);
            }
        };
        fetchPlot();
    }, [id]);

    useEffect(() => {
        if (plot) {
            const map = L.map("plot-map").setView([plot.lat, plot.lng], 15);

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            L.marker([plot.lat, plot.lng], {
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

    function setprice(plots) {
        let price = plots.price.toString()
        let price1 = price.slice(0, 2)
        if (price >= 100000 && price < 10000000) {
            price = price1 + " " + "LAKHS"
        }
        else if (price >= 10000000 && price < 1000000000) {
            price = price1 + " " + "CRORE"
        }
        return { ...plots, price }
    }

    if (!plot) return <div>Loading...</div>;

    return (
        <div className={style.maincontainer}>
            <div className={style.detailsMapContainer}>
                <div className={style.cont}>
                    <div className={style.image}>
                        <Image
                            src={plot.image}
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
