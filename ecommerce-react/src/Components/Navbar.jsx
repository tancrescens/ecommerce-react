import React, { useState } from "react";
import { Link, useLocation } from "wouter";

export default function Navbar() {
    const [showNavbar, setShowNavbar] = useState(false);
    // returns the current URL
    const [location] = useLocation();
    
    // Toggle the collapse state
    const toggleNavbar = () => {
        setShowNavbar(!showNavbar);
    };

    return (<>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" href="#">E-Shop</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={toggleNavbar}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${showNavbar ? "show" : ""}`}
                    id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                        <Link href="/" className={`nav-link ${location === '/' ? 'active' : ''}`}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/products" className={`nav-link ${location === '/products' ? 'active' : ''}`}>Products</Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/register" className={`nav-link ${location === '/register' ? 'active' : ''}`}>Register</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </>)
}