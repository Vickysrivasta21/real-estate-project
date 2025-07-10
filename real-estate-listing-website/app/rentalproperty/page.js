"use client";

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import style from './rent.module.css'
import { useForm } from 'react-hook-form';

const Rent = () => {
  const [rent, getrent] = useState([])
  const [rent2, getrent2] = useState([])
  useEffect(() => {
    let getrentdata = async () => {
      let getrental = await fetch("http://localhost:5000/api/rentprop")
      let data = await getrental.json()
      getrent(data)
      getrent2(data)
      console.log(data)
    }
    getrentdata()
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, isSubmitting },
    watch,
  } = useForm()

  const onSubmit = (data) => {
    let price = null;
    let d = "";

    if (data.rent) {
      [d, price] = data.rent.split(" ");
      price = parseInt(price);
    }

    let rating = null;
    let drat = "";

    if (data.rating) {
      [drat, rating] = data.rating.split(" ");
      rating = parseInt(rating);
    }
    try{
    const filtered = rent.filter(ele => {
      const rentVal = parseInt(ele.rent_monthly.replace(/[^\d]/g, ""));

      const matchLocation =
        !data.location || ele.location.toLowerCase().includes(data.location.toLowerCase());

      const matchRent =
        !data.rent ||
        (d === "below" && rentVal <= price) ||
        (d === "above" && rentVal >= price);

      const matchRating =
        !data.rating ||
        (drat === "below" && ele.rating <= rating) ||
        (drat === "above" && ele.rating >= rating);

      return matchLocation && matchRent && matchRating;
    });

    getrent2(filtered);

    if (filtered.length === 0) {
      alert("No properties match your filters.");
      getrent2(rent); 
    } else {
      getrent2(filtered);
    }
  } catch (error) {
    console.error("Error in filtering:", error);
    getrent2(rent);
  }
}


const handlesort = (e) => {
  const sorted = [...rent2].sort((a, b) => {
    if (e === "price") {
      return parseInt(a.rent_monthly) - parseInt(b.rent_monthly);
    } else if (e === "rating") {
      return b.rating - a.rating;
    }
  });
  getrent2(sorted);
}

return (
  <div>
    <div className={style.filterpanel}>
      <form action="submit" onSubmit={handleSubmit(onSubmit)}>
        <div className={style.rentfilter}>
          <label htmlFor={style.rent}>Select the rent range : </label>
          <select name="rent" id="" {...register("rent")}>
            <option value="below 5000">Below ₹5000</option>
            <option value="below 10000">Below ₹10000</option>
            <option value="below 15000">Below ₹15000</option>
            <option value="above 15000">Above ₹15000</option>
          </select>
        </div>
        <div className={style.rating}>
          <label htmlFor="rating">Select the rating</label>
          <select name="rating" id="" {...register("rating")}>
            <option value="below 3.5">below 3.5</option>
            <option value="below 4.5">below 4.5</option>
            <option value="above 4.5">above 4.5</option>
          </select>
        </div>
        <div className={style.sort}>
            <label htmlFor="sort">Sort By : </label>
            <select name="sort" id="" onChange={(e) => handlesort(e.target.value)}>
              <option value="none">none</option>
              <option value="price">price</option>
              <option value="rating">rating</option>
            </select>
          </div>
        <div className={style.locationfilter}>
          <label htmlFor="location">Select Location : </label>
          <select name="location" id="" {...register("location")}>
            <option value="Delhi">Delhi</option>
            <option value="Kolkata">Kolkata</option>
            <option value="Pune">Pune</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Chennai">Chennai</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Mumbai">Mumbai</option>
          </select>
        </div>
        <div className={style.button}><button type="submit">Apply Filters</button></div>
      </form>
    </div>
    <div className={style.maincontainer}>
      {
        rent2 && rent2.map((ele) => {
          return (
            <div className={style.cont}>
              <div className={style.image}>
                <Image
                  src={ele.image_url}
                  height={100}
                  width={100}
                  style={{ objectFit: 'fill' }}
                  alt='rent rooms'
                />
              </div>
              <div className={style.middle}>
                <div className={style.rating}> ⭐ {ele.rating} /5</div>
                <div className={style.rent}>Rent : ₹{ele.rent_monthly}</div>
              </div>
              <div className={style.title}>{ele.title}</div>
              <div className={style.type}>preferred : {ele.type}</div>
              <div className={style.location}>Location : {ele.location} <Image src="/wired-flat-2569-logo-google-maps-hover-pinch.svg" width={20} height={20} style={{ objectFit: 'fill' }} /></div>
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
