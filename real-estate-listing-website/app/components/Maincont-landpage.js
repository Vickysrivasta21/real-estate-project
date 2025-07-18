"use client"
import React from 'react'
import { useEffect, useState } from 'react'
import style from './Maincont-landpage.module.css'
import Link from 'next/link'
import Image from 'next/image'
import bg from './backgroundMaincont.module.css'
const Maincont = () => {
    const [arr, setarr] = useState([])
    const [arr2, setarr2] = useState([])
    const [arr3, setarr3] = useState([])

    useEffect(() => {
        let getdata = async () => {
            let data = await fetch("http://localhost:5000/api/properties")
            let res = await data.json()
            setarr(res)
            setarr2(res.filter(ele => {
                let actprice = ele.price.split(" ")[0].replace("₹", "")
                let val = ele.price.split(" ")[1]
                if (findprice(actprice, val) <= 8000000) {
                    return ele
                }
            }))
            let rentdata = await fetch("http://localhost:5000/api/rentprop")
            let newres = await rentdata.json()
            setarr3(newres.filter(ele => {
                if (ele.rating >= 3.5) {
                    return ele
                }
            }))
        }
        getdata()
    }, [])
    const findprice = (amount, total) => {
        amount = parseFloat(amount)
        if (total === "LAKH" || total === "Lakh") {
            return amount * 100000
        }
        else if (total === "CRORE" || total === "Crore") {
            return amount * 10000000
        }
    }
    return (
        <div>
            <div className={style.recommendsignin}>
                <div className={style.recommendsign}>
                    <h2>Get Personalised Home Recommendations here</h2>
                    <p>Sign In for More Personalised Experience</p>
                    <button className="btn"><Link target='_blank' href="/login">Login</Link></button>
                </div>
                <div className={style.imagerecommend}>
                    <Image
                        src="/1d9d5bce566c85fa242cb21ad3292cb8.webp"
                        width={200}
                        height={200}
                        alt="Property image"
                        style={{ objectFit: 'contain' }}
                    />
                </div>
            </div>
            <div className={style.browseprop}>
                <div className={style.buyprop}>
                    <div className={style.img}>
                        <Image
                            src="/homepage-spot-agent-lg-1.webp"
                            width={200}
                            height={200}
                            alt="Property image"
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                    <div className={style.head}><h2>Buy a Home</h2></div>
                    <div className={style.explain}><p>Find your place with an immersive photo experience and the most listings, including things you won't find anywhere else.</p>
                    </div>
                    <button className={style.btn}><Link href="">Find Best Homes</Link></button>
                </div>
                <div className={style.sellprop}>
                    <div className={style.img}>
                        <Image
                            src="/homepage-spot-sell-lg-1.webp"
                            width={200}
                            height={200}
                            alt="Property image"
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                    <div className={style.head}><h2>Sell a Home</h2></div>
                    <div className={style.explain}><p>No matter what path you take to sell your home, we can help you navigate a successful sale.</p>
                    </div>
                    <button className={style.btn}><Link href="">See Options</Link></button>
                </div>
                <div className={style.rentprop}>
                    <div className={style.img}>
                        <Image
                            src="/homepage-spot-rent-lg-1.webp"
                            width={200}
                            height={200}
                            alt="Property image"
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                    <div className={style.head}><h2>Rent a Home</h2></div>
                    <div className={style.explain}><p>We're creating a seamless online experience - from shopping on the largest rental network, to applying, to paying rent.</p>
                    </div>
                    <button className={style.btn}><Link href="">Find Rentals</Link></button>
                </div>
            </div>
            <div className={style.buyarray}>
                <div className={style.heading}><h3>Quick Picks For you</h3></div>
                <div className={style.array}>
                    {
                        arr2 && arr2.map(ele => {
                            return (
                                <div key={ele._id} className={style.container}>
                                    <div className={style.content}>
                                        <div className={style.image}>
                                            <Image
                                                src={ele.image}
                                                width={250}
                                                height={250}
                                                alt="Property image"
                                                style={{ objectFit: 'cover' }}
                                            />
                                        </div>
                                        {/* <div className="id">{ele.id}</div> */}
                                        <div className={style.typeprice}>
                                            <div className={`${style.type} 
                                            ${ele.type==="1BHK"?bg.first:""}
                                            ${ele.type==="2BHK"?bg.second:""}
                                            ${ele.type==="3BHK"?bg.third:""}
                                            ${ele.type==="4BHK"?bg.fourth:""}`}>
                                                {ele.type}
                                            </div>
                                            <div className={style.price}>
                                                {ele.price}
                                            </div>
                                        </div>
                                        <div className={style.title}><h1>{ele.title}</h1></div>
                                        <div className={style.location}>location : {ele.location}</div>
                                        <div className={style.features}>
                                            <div className={style.size}>{ele.size}</div>
                                            <div className={style.beds}>total bedrooms : {ele.bedrooms}</div>
                                            <div className={style.bath}>total bathroom : {ele.bathrooms}</div>
                                            <div className={style.parking}>{ele.parking ? "available" : "not available"}</div>
                                        </div>
                                        <div className={style.contact}>
                                            <div className={style.view}><Link target='_blank' href={`/propertydetail/${ele._id}`}>view details</Link></div>
                                            <div className={style.agent}><Link href="/">contact agent</Link></div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className={style.rentarray}>
                <div className={style.heading}><h3>Top Homes Available for Rent</h3></div>
                <div className={style.array}>
                    {
                        arr3 && arr3.map(ele => {
                            return (
                                <div key={ele._id} className={style.container}>
                                    <div className={style.content}>
                                        <div className={style.image}>
                                            <Image
                                                src={ele.image_url}
                                                width={250}
                                                height={250}
                                                alt="Property image"
                                                style={{ objectFit: 'cover' }}
                                            />
                                        </div>
                                        {/* <div className="id">{ele.id}</div> */}
                                        <div className={style.typeprice}>
                                            <div className={style.type1}>
                                                {ele.type}
                                            </div>
                                            <div className={style.price}>
                                                {ele.price}
                                            </div>
                                        </div>
                                        <div className={style.title}><h1>{ele.title}</h1></div>
                                        <div className={style.location}>location : {ele.location}</div>
                                        <div className={style.features}>
                                            <div className={style.size}>{ele.size}</div>
                                            <div className={style.beds}>total bedrooms : {ele.bedrooms}</div>
                                            <div className={style.bath}>total bathroom : {ele.bathrooms}</div>
                                            <div className={style.parking}>{ele.availability}</div>
                                        </div>
                                        <div className={style.contact}>
                                            <div className={style.view}><Link target='_blank' href={`/rentalproperty/${ele._id}`}>view details</Link></div>
                                            <div className={style.agent}><Link href="/">contact agent</Link></div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                </div>
            </div>
        </div>
    )
}

export default Maincont
