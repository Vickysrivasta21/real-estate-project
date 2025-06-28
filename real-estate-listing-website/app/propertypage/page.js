"use client";
import React from 'react'
import { useEffect,useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Propertypage = () => {
    const [data,setdata] = useState([])
    useEffect(() => {
      let data = async()=>{
        let property = await fetch("http://localhost:5000/api/properties")
        let res = await property.json()
        console.log(res)
        setdata(prev=>[...prev,...res])
      }
      data()
    }, [])
    
  return (
    <div className='maincont'>
    {data.map(ele=>{
        return (
        <div key={ele.id} className="container">
            <div className="content">
        <div className="image">
        <Image
         src={ele.image}
         width={250}
         height={250}
         alt="Property image"
         style={{objectFit:'cover'}}
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
            <div className="parking">{ele.parking?"available": "not available"}</div>
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
  )
}

export default Propertypage
