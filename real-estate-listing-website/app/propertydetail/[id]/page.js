//my sample code

// "use client";
// import React from 'react'
// import { useEffect,useState } from 'react'
// import { useParams } from 'next/navigation';
// import Image from 'next/image'

// const propertydetails = () => {
//     const slug = useParams().id
//     console.log(slug)
//     const [prop,setprop] = useState(null)
//     useEffect(() => {
//       let particular = async()=>{
//         let data = await fetch(`http://localhost:5000/api/propertydetails/${slug}`)
//         let res = await data.json()
//         setprop(res)
//         console.log(res)
//       }  
//       particular()
//     }, []) //this is the backend i have already given id as slug so just need to make UI and frontend part thats it!1
    
//   return (
//     <div className='maincont'>
//     {prop&&prop._id?(
//         <div key={prop.id} className="container">
//             <div className="content">
//         <div className="image">
//         <Image
//          src={prop.image}
//          width={250}
//          height={250}
//          alt="Property image"
//          style={{objectFit:'cover'}}
//         />
//         </div>
//         {/* <div className="id">{ele.id}</div> */}
//         <div className="type-price">
//             <div className="type">
//                 {prop.type}
//             </div>
//             <div className="price">
//                 {prop.price}
//             </div>
//         </div>
//         <div className="title"><h1>{prop.title}</h1></div>
//         <div className="location">location : {prop.location}</div>
//         <div className="features">
//             <div className="size">{prop.size}</div>
//             <div className="beds">total bedrooms : {prop.bedrooms}</div>
//             <div className="bath">total bathroom : {prop.bathrooms}</div>
//             <div className="parking">{prop.parking?"available": "not available"}</div>
//         </div>
//         </div>
//         </div>
//         ):(
//             <div>...loading</div>
//         )}
//     </div>
//     )
// }

// export default propertydetails


// muskan's code
// "use client"
// import { useParams } from 'next/navigation';
// // import data from "../data/properties.json";
// import { useEffect, useState } from "react";

// function PropertyDetails() {
//   const { id } = useParams();
//   const [property,setprop] = useState(null)
// //   const property = data.find(p => p.id === parseInt(id));
//     // console.log(slug)
//     useEffect(() => {
//       let particular = async()=>{
//         let data = await fetch(`http://localhost:5000/api/propertydetails/${id}`)
//         let res = await data.json()
//         setprop(res)
//       }  
//       particular()
//     }, [])

//   useEffect(() => {
//     if (window.google && property) {
//       const map = new window.google.maps.Map(document.getElementById("map"), {
//         center: { lat: property.lat, lng: property.lng },
//         zoom: 15
//       });

//       new window.google.maps.Marker({
//         position: { lat: property.lat, lng: property.lng },
//         map: map
//       });
//     }
//   }, [property]);

//   if (!property) return <p>Property not found</p>;

//   return (
//     <div>
//       <h2>{property.title}</h2>
//       <p>{property.description}</p>
//       <p>{property.price}</p>
//       <p>Location: {property.location}</p>
//       <p>Rating: ⭐ {property.rating}</p>
//       <h4>Reviews:</h4>
//       <ul>
//         {property.reviews.map((review, i) => (
//           <li key={i}>{review}</li>
//         ))}
//       </ul>

//       <div id="map" style={{ height: "300px", width: "100%" }}></div>
//     </div>
//   );
// }

// export default PropertyDetails;


//you need to work here just make the UI design for property detail of particular property and use google map api from @react-map you can use chatgpt for help and for paramsto get id you should use id of mongo db okk 