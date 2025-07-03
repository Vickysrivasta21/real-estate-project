import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import style from './Footer.module.css'

const Footer = () => {
    return (
        <div className={style.foot}>
            <div className={style.company}><h3>Company</h3>
                <Link href="/">About Us</Link>
                <Link href="/">Contact us</Link>
                <Link href="/">Our Services</Link>
            </div>
            <div className={style.contact}><h3>Contacts</h3>
                <Link target='_blank' href="https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSBnqKhCjPpWpXXPdfVhlcvmwbSWNBVkTCKcClspDSzpzzRblPTZnXqCkkHWSlgFGtvJshZC">Email Us</Link>
                <Link href="/">Call us</Link>
                <Link href="/">Customer Support</Link>
            </div>
            <div className={style.section}><h3>Section</h3>
                <Link href="/">Home</Link>
                <Link href="/">Buy Property</Link>
                <Link href="/">Sell Property</Link>
            </div>
            <div className={style.logo}>
                <div className={style.image}>
                    <Image
                        src="/real-estate-chimney-svgrepo-com.svg"
                        width={20}
                        height={20}
                        alt="Property image"
                        style={{ objectFit: 'cover',fill:"white" }}
                    />
                </div>
                <div className={style.name}>Properties</div>
            </div>
        </div>
    )
}

export default Footer
