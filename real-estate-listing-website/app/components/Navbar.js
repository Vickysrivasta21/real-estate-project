"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import style from './Navbar.module.css'

const Navbar = () => {
  return (
    <div>
      <div className={style.nav}>
        <div className={style.logo}>
          <Image
            src="/real-estate-chimney-svgrepo-com.svg"
            width={20}
            height={20}
            alt="Property image"
            style={{ objectFit: 'cover' }}
          />
          <span className={style.logoText}>Properties</span>
        </div>

        <div className={style.centerLinks}>
          <Link target='_blank' href="/propertypage">Buy</Link>
          <Link href="/">Rent</Link>
          <Link href="/">Sell</Link>
        </div>

        <div className={style.rightLinks}>
          <Link href="/login">Login</Link>
          <Link href="/">Signup</Link>
        </div>
      </div>

      <section className={style.hero}>
        <div className={style.overlay}>
          <h1>Your Dream Property Awaits Here...</h1>
          <p>Choose your dream property just one click away...</p>
          <p>We deliver Happiness to your Feets....</p>
          <Link href="/">
            <button className={style.cta}>Get Started</button>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Navbar
