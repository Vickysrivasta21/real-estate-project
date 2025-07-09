"use client";

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useState,useEffect } from 'react'
import style from './rent.module.css'

const Rent = () => {
    const [rent , getrent] = useState([])
    useEffect(() => {
      let getrentdata = async () => {
        let getrental = await fetch("http://localhost:5000/api/rentprop")
        let data = await getrental.json()
        getrent(data)
        console.log(data)
      }
      getrentdata()
    }, [])
    
  return (
    // id": 1,
    //   "title": "Cozy Single Room with AC",
    //   "image_url": "https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg",
    //   "rent_monthly": "8000/month",
    //   "type": "students",
    //   "location": "Delhi, Sarojini Nagar",
    //   "longitude": 77.1943,
    //   "latitude": 28.5706,
    //   "rating": 4.2,
    //   "reviews": "Clean room with good ventilation. Landlord is cooperative and the area is well-connected to metro.",
    //   "features": ["AC", "Wi-Fi", "Attached bathroom", "Wardrobe"],
    //   "availability": "Immediate",
    //   "connectivity": {
    //     "nearest_metro": "Sarojini Nagar Metro (2km)",
    //     "nearest_railway": "New Delhi Railway Station (8km)",
    //     "airport": "IGI Airport (15km)"
    <div>
    <div className={style.filterpanel}></div>
    <div className={style.maincontainer}>
      {
        rent && rent.map((ele)=>{
          return (
            <div className={style.cont}>
                <div className={style.image}>
                    <Image
                        src={ele.image_url}
                        height={100}
                        width={100}
                        style={{objectFit : 'fill'}}
                        alt='rent rooms'
                    />
                </div>
                <div className={style.middle}>
                <div className={style.rating}> ⭐ {ele.rating} /5</div>
                <div className={style.rent}>Rent : ₹{ele.rent_monthly}</div>
                </div>
                <div className={style.title}>{ele.title}</div>
                <div className={style.type}>preferred : {ele.type}</div>
                <div className={style.location}>Location : {ele.location} <Image src="/wired-flat-2569-logo-google-maps-hover-pinch.svg" width={20} height={20} style={{objectFit:'fill'}}/></div>
                <div className={style.avail}>Availability : {ele.availability}</div>
                <div className={style.moredetails}>
                    <div className={style.viewdetails}>
                        <Link target='_blank' href={`/rentprop/${ele._id}`}>view details</Link>
                    </div>
                    <div className={style.contact}>
                        <Link target='_blank' href="/" >Contact</Link>
                    </div>
                </div>
            </div>
          )
        })
      }
    </div>
    </div>
  )
}

export default Rent
