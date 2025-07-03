import React from 'react'
import style from "./Navbar.module.css"
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const Hero = () => {

    const path = usePathname()
    return (
        <div className={path==="/"?style.navshow:style.navhide}>
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

export default Hero
