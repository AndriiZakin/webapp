import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

function Navbar() {
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const handleMouseEnter = () => {
        setDropdownVisible(true);
    };

    const handleMouseLeave = () => {
        setDropdownVisible(false);
    };

    return (
        <nav className="navbar-style">
            <div 
                className="dropdown"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className='button-container'>
                    <button className="dropdown-toggle">
                        Pages
                    </button>
                </div>

                {isDropdownVisible && (
                    <div className="dropdown-menu">
                        <Link className="dropdown-item" to="/">Main Page</Link>
                        <Link className="dropdown-item" to="/page1">Page 1</Link>
                        <Link className="dropdown-item" to="/page2">Page 2</Link>
                        <Link className="dropdown-item" to="/page3">Page 3</Link>
                        <Link className="dropdown-item" to="/page4">Page 4</Link>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;