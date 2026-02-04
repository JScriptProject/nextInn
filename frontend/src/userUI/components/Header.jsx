import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logoImg from "@assets/media/logo.png";
import UserLoggedInHeader from '@user/components/UserLoggedInHeader.jsx'
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
import { headerAnimation } from "@utils/animation.js";
import {stickyHeaderAnimation} from '@utils/animation.js';
import Button from "@user/components/Button.jsx";

function Header({websiteHeader}) {
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
          {/* {websiteHeader.login === null && <p className="text-[#fff]">Admin</p>} */}
          {websiteHeader.login &&
            websiteHeader.user === null &&
            websiteHeader?.login?.map((navLoginItem, index) => (
              <Link to={navLoginItem.to} key={index}>
                <Button className={websiteHeader.login[index].btnClass}>
                  {navLoginItem.label}
                </Button>
              </Link>
            ))}
          {websiteHeader.login && websiteHeader.user !== null && (
            <UserLoggedInHeader user={websiteHeader.user} />
          )}
          {websiteHeader.login === null && websiteHeader.user !== null && (
            <UserLoggedInHeader user={websiteHeader.user} />
          )}
        </div>
        <hr className="nav-hr" />
        <ul className="nav-links">
          {websiteHeader?.webNav?.map((navItem, index) => (
            <li key={index}>
              <Link to={navItem.to} className="nav-link">
                <House className="nav-icon" /> {navItem.label}
              </Link>
            </li>
          ))}
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
