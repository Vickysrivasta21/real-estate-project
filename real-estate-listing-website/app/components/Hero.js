import React, { useEffect, useState } from 'react';
import style from "./Navbar.module.css";
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Hero = () => {
  const path = usePathname();

  const lines = [
    "Your Dream Property Awaits Here...",
    "Choose your dream property just one click away...",
    "We deliver Happiness to your Feets...."
  ];

  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [typedText, setTypedText] = useState(['', '', '']);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentLine = lines[currentLineIndex];

    if (charIndex < currentLine.length) {
      const timeout = setTimeout(() => {
        const newText = [...typedText];
        newText[currentLineIndex] += currentLine.charAt(charIndex);
        setTypedText(newText);
        setCharIndex(charIndex + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      const nextTimeout = setTimeout(() => {
        if (currentLineIndex === lines.length - 1) {
          setTypedText(['', '', '']);      
          setCurrentLineIndex(0);          
          setCharIndex(0);
        } else {
          setCurrentLineIndex(currentLineIndex + 1);  
          setCharIndex(0);
        }
      }, 1000);
      return () => clearTimeout(nextTimeout);
    }
  }, [charIndex, currentLineIndex, typedText]);

  return (
    <div className={path === "/" ? style.navshow : style.navhide}>
      <section className={style.hero}>
        <div className={style.overlay}>
          <h1>{typedText[0]}{currentLineIndex === 0 && <span className={style.cursor}>|</span>}</h1>
          <p>{typedText[1]}{currentLineIndex === 1 && <span className={style.cursor}>|</span>}</p>
          <p>{typedText[2]}{currentLineIndex === 2 && <span className={style.cursor}>|</span>}</p>
          <Link href="/">
            <button className={style.cta}>Get Started</button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Hero;
