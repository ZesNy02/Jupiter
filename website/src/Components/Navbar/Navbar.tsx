import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
        <nav className="navbar">
        <div className="navbar-container">
        <h1 className="navbar-logo">Logo</h1>
            <div className="menu-icon" onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
        </div>
        <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
    <li className="nav-item">
    <a href="#" className="nav-links">
        Home
        </a>
        </li>
        <li className="nav-item">
    <a href="#" className="nav-links">
        About
        </a>
        </li>
        <li className="nav-item">
    <a href="#" className="nav-links">
        Services
        </a>
        </li>
        <li className="nav-item">
    <a href="#" className="nav-links">
        Contact
        </a>
        </li>
        </ul>
        </div>
        </nav>
    </>
    );
};

export default Navbar;