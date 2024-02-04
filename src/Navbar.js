// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Nav } from 'react-bootstrap';

function Navbar() {
    return (
        <Nav className="flex-column">
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Pages
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/">Main Page</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/page1">Page 1</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/page2">Page 2</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/page3">Page 3</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/page4">Page 4</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Nav>
    );
}

export default Navbar;