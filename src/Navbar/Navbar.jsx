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
                        <Link className="dropdown-item" to="/">Main Config</Link>
                        <Link className="dropdown-item" to="/page1">Portfolio</Link>
                        <Link className="dropdown-item" to="/page2">Coins</Link>
                        <Link className="dropdown-item" to="/page3">Models</Link>
                        <Link className="dropdown-item" to="/page4">System</Link>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;