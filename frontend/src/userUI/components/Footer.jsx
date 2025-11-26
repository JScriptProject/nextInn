import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '@assets/media/logo.png';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const footerStyle = {
    background: 'linear-gradient(151deg, rgba(31, 41, 55, 1) 1%, rgba(45, 60, 84, 1) 100%)',
  };

  return (
    <footer style={footerStyle} className="text-white">
      <div className="container mx-auto">
        {/* Part 1: Main footer content */}
        <div className="footer-part1">
          {/* Column 1: Logo and Info */}
          <div className="footer-col flex flex-col items-center ">
            <Link to="/" className="mb-4 inline-block">
              <img src={logoImg} alt="NextInn" className="block !w-25" />
            </Link>
            <p className="text-gray-400 text-sm">
              Experience unparalleled luxury and comfort at NextInn.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <Link to="/booking" className="footer-link">
                  Book Room
                </Link>
              </li>
              <li>
                <Link to="/rooms/executive-suite" className="footer-link">
                  Executive Suite
                </Link>
              </li>
              <li>
                <Link to="/rooms/twin-room-suite" className="footer-link">
                  Twin Room Suite
                </Link>
              </li>
              <li>
                <Link to="/rooms/premium-deluxe-room" className="footer-link">
                  Premium Deluxe Room
                </Link>
              </li>
              <li>
                <Link to="/rooms/metropolitan-suite" className="footer-link">
                  Metropolitan Suite
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="footer-col">
            <h3>Company</h3>
            <ul>
              <li>
                <Link to="/contact" className="footer-link">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/about" className="footer-link">
                  About
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="footer-link">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/agreements" className="footer-link">
                  Agreements
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Admin & Social */}
          <div className="footer-col">
            <h3>Admin</h3>
            <ul>
              <li>
                <Link to="/admin-login" className="footer-link">
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <hr className="footer-hr" />
        {/* Part 2: Copyright and Developer */}
        <div className="footer-part2">
          <p>&copy; {new Date().getFullYear()} NextInn. All Rights Reserved.</p>
          <p>
            Developed by{" "}
            <a
              href="https://blogspage.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white"
            >
              BlogsPage Developer
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
