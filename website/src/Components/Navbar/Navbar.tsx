import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';
import logo from '../../assets/logo.png';
import Document from "../../pages/Document.tsx";
import About from "../../pages/About.tsx";
import Start from "../../pages/Start.tsx";
import Installation from "../../pages/Installation.tsx";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [page, setPage] = useState("Start");
    const renderPage = () => {
        switch (page) {
            case "Start":
                return <Start />;
            case "Document":
                return <Document />;
            case "About":
                return <About />;
            case "Installation":
                return <Installation />;
        }
    };
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
        <nav className="navbar">
        <div className="navbar-container">

            <img className="navbar-logo" src={logo} alt="logo" />

            <div className="menu-icon" onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
        </div>
        <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
        <li className={"nav-item"} onClick={() => setPage('Start')}>Start</li>
        <li className={"nav-item"} onClick={() => setPage('Document')}>Dokumente</li>
        <li className={"nav-item"} onClick={() => setPage('About')}>Über uns</li>
        <li className={"nav-item"} onClick={() => setPage('Installation')}>Installation</li>
        </ul>
        </div>
        </nav>
            {renderPage()}
    </>
    );
};

export default Navbar;