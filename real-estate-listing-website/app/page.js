"use client";
import Image from "next/image";
import './globals.css'
import Propertypage from "./propertypage/page";
import Link from 'next/link'

export default function Home() {
  return (
    <div>
    <Link href="/login">Login page</Link>
    <Link href="/signup">signup page</Link>
    <Propertypage/>
    </div>
  );
}
