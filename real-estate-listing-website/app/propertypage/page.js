"use client";
import React from 'react'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useForm } from 'react-hook-form';

const Propertypage = () => {
  const [data, setdata] = useState([])
  const [tempdata, settempdata] = useState([])
  useEffect(() => {
    let data = async () => {
      let property = await fetch("http://localhost:5000/api/properties")
      let res = await property.json()
      console.log(res)
      setdata(res)
      settempdata(res)
    }
    data()
  }, [])

  const { register, handleSubmit, watch } = useForm();
  const onSubmit = (d) => {
    d.parking = d.parking === "true" ? true : false
    let p = d.price.split(" ")
    let price = p[1]
    let setprice = findprice(+price, p[2])
    let numprice = setprice
    settempdata(data.filter((ele) => {
      let eleprice = ele.price.split(" ")
      let seteleprice = findprice(+eleprice[0].replace("₹", ""), eleprice[1])
      return (d.type === "" || d.type === ele.type) && (d.bedrooms === "" || +d.bedrooms === ele.bedrooms) && (+d.bathrooms === ele.bathrooms || d.bathrooms === "") && (d.parking === ele.parking || d.parking==="") && (
        (p[0] === "BELOW" && seteleprice <= numprice) ||
        (p[0] === "ABOVE" && seteleprice > numprice)
        )
      }
    ))
    }
  const findprice = (amount, total) => {
  if (total === "LAKH" || total === "Lakh") {
    return amount * 100000
  }
  else if (total === "CRORE" || total === "Crore") {
    return amount * 10000000
  }
}

return (
  <div className="contholder">
    <div className="filterside">
      <form action="submit" onSubmit={handleSubmit(onSubmit)}>
        <div className="selecttype">
          <label htmlFor="type of flat">Choose the type of property : </label>
          <select name="property" id="" {...register("type")}>
            <option value="1BHK">1BHK</option>
            <option value="2BHK">2BHK</option>
            <option value="3BHK">3BHK</option>
            <option value="4BHK">4BHK</option>
          </select>
        </div>
        <div className="selectprice">
          <label htmlFor="price">Enter the Price Range : </label>
          <select name="price" id="" {...register("price")}>
            <option value="BELOW 20 LAKH">BELOW 20 LAKH</option>
            <option value="BELOW 40 LAKH">BELOW 40 LAKH</option>
            <option value="BELOW 60 LAKH">BELOW 60 LAKH</option>
            <option value="BELOW 1 CRORE">BELOW 1 CRORE</option>
            <option value="ABOVE 1 CRORE">ABOVE 1 CRORE</option>
          </select>
        </div>
        <div className="selectbedrooms">
          <label htmlFor="beds">Select the number of Bedrooms : </label>
          <select name="beds" id="" {...register("bedrooms")}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div className="selectbathroom">
          <label htmlFor="bath">Select the number of Bathrooms : </label>
          <select name="bathrooms" id="" {...register("bathrooms")}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div className="selectparking">
          <label htmlFor="parking">Parking ?</label>
            <div className="park1">
            <label htmlFor="">Yes
            <input type="radio" name="parking" id="" value={true} {...register("parking")} />
            </label>
            </div>
            <div className="park2">
            <label htmlFor="">No
              <input type="radio" name="parking" id="" value={false} {...register("parking")} />
            </label>
            </div>
        </div>
        <div className="selectbuttonsubmit">
          <button type="submit">Apply Filters</button>
        </div>
      </form>
    </div>
    <div className='maincont'>
      {tempdata.length === 0 ? (
    <div className="no-results">
      <h2>OOPS!!..No properties match your filters....</h2>
    </div>
          ) :tempdata.map(ele => {
        return (
          <div key={ele._id} className="container">
            <div className="content">
              <div className="image">
                <Image
                  src={ele.image}
                  width={250}
                  height={250}
                  alt="Property image"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              {/* <div className="id">{ele.id}</div> */}
              <div className="type-price">
                <div className="type">
                  {ele.type}
                </div>
                <div className="price">
                  {ele.price}
                </div>
              </div>
              <div className="title"><h1>{ele.title}</h1></div>
              <div className="location">location : {ele.location}</div>
              <div className="features">
                <div className="size">{ele.size}</div>
                <div className="beds">total bedrooms : {ele.bedrooms}</div>
                <div className="bath">total bathroom : {ele.bathrooms}</div>
                <div className="parking">{ele.parking ? "available" : "not available"}</div>
              </div>
              <div className="contact">
                <div className="view"><Link href={`/propertydetail/${ele._id}`}>view details</Link></div>
                <div className="agent"><Link href="/">contact agent</Link></div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  </div>
)
}

export default Propertypage
