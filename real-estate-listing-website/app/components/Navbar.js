"use client"
import React,{useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import style from './Navbar.module.css'
import { usePathname } from 'next/navigation'
import Hero from './Hero'

const Navbar = () => {
  const [show,setshow] = useState(false)
  const path = usePathname();
  console.log(path)
  return (
    <div className={style.navbar}>
      <div className={`${path === "/login" || path === "/signup" ? style.navhide : style.navshow}
                       ${path === "/" ? style.nav : style.navsolid}`}>
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
        <div className={`${style.centerLinks} ${show ? style.show : style.hide}`}>
          <Link target='_blank' href="/propertypage">Buy</Link>
          <Link target='_blank' href="/rentalproperty">Rent</Link>
          <Link target='_blank' href="/empty-plots">Empty Plots</Link>
        </div>
        
        <div className={`${style.rightLinks} ${show ? style.show : style.hide}`}>
          <Link target='_blank' href="/login">Login</Link>
          <Link target='_blank' href="/signup">Signup</Link>
        </div>
        <button className={style.togglenav} onClick={()=>setshow(!show)}>
        <Image
            src="/icons8-menu (1).svg"
            width={20}
            height={20}
            alt="Property image"
            style={{ objectFit: 'cover' }}
          />
        </button>

      </div>
      <Hero/>
    </div>
  )
}

export default Navbar
