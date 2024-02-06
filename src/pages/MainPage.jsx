import React from 'react';
import './MainPage.css';

const MainPage = () => {
    return (
        <div className="main-container">
            <h1 className="main-title">Main Config</h1>
            <div className="status-section">
                <h2>Status:</h2>
                <p>{/* Status goes here */}</p>
            </div>
            <div className="hover-section">
                <button onMouseOver={() => {/* Start hover action here */}}>Hover Start</button>
                <br />
                <button onMouseOut={() => {/* Stop hover action here */}}>Hover Stop</button>
            </div>
        </div>
    );
};

export default MainPage;