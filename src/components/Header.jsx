import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logoImg from "../assets/media/logo.png";

import {
  AlignJustify,
  X,
  House,
  BedDouble,
  Info,
  Mail,
  Facebook,
  Twitter,
  MailPlus,
  Instagram,
} from "lucide-react";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { headerAnimation } from "../animation.js";
import {stickyHeaderAnimation} from '../animation.js';
import Button from "./Button.jsx";

function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  
  const navRef = useRef();
  const headerRef = useRef();
  const logoRef = useRef();
  
  function handleNavToggle() {
    const nextState = !isNavOpen;
    setIsNavOpen((pre) => !pre);
    headerAnimation(navRef.current, nextState);
  }

  useEffect(()=>{
    if(headerRef.current && logoRef.current)
    stickyHeaderAnimation(headerRef.current,logoRef.current);
    // Optional: clean up scroll triggers on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  },[])
  return (
    <header ref={headerRef} className="nav-header">
      <nav ref={navRef} className={`nav-container ${isNavOpen ? "open" : ""}`}> 
        <div className={`nav-toggle ${isNavOpen ? "nav-toggle-open" : ""}`}>
          <button onClick={handleNavToggle}>
            {isNavOpen ? <X /> : <AlignJustify />}
          </button>
        </div>
        <div ref={logoRef} className="logo-section">
          <img src={logoImg} alt="NextInn" />
        </div>
        <div className="cta-section">
          <Link to="/login">
            <Button className="btn btn-sm btn-outline">Sign In</Button>
          </Link>

          <Link to="/book">
            <Button className="btn btn-sm  btn-fill">Book Now</Button>
          </Link>
        </div>
        <hr className="nav-hr" />
        <ul className="nav-links">
          <li>
            <Link to="/" className="nav-link">
              <House className="nav-icon" /> Home
            </Link>
          </li>
          <li>
            <Link to="/book/:id" className="nav-link">
              <BedDouble className="nav-icon" />
              Add Room
            </Link>
          </li>
          <li>
            <Link to="/about" className="nav-link">
              <Info className="nav-icon" />
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="nav-link">
              <Mail className="nav-icon" />
              Contact
            </Link>
          </li>
         
        </ul>
        <hr className="nav-hr" />
        <h3 className="block md:hidden text-[var(--text-secondary-gray)] text-[0.8rem] font-normal">
          Connect with us
        </h3>
        <ul className="nav-links-social">
          <li>
            <a href="#">
              <Facebook className="nav-social-icon" />
            </a>
          </li>
          <li>
            <a href="#">
              <Twitter className="nav-social-icon" />
            </a>
          </li>
          <li>
            <a href="#">
              <MailPlus className="nav-social-icon" />
            </a>
          </li>
          <li>
            <a href="#">
              <Instagram className="nav-social-icon" />
            </a>
          </li>
        </ul>
      </nav>
      <div className="mobile-logo">
        <img src={logoImg} alt="NextInn" />
      </div>
    </header>
  );
}
export default Header;
