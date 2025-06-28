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
//     }, [])
    
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
