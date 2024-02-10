import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Button,
  Collapse,
  Input,
  InputGroup,
  InputGroupText,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
} from "reactstrap";
import { removeToken } from "../../main_components/request";
import routes from "../../router/routes";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [color, setColor] = useState("transparent");
  const sidebarToggle = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  const toggle = () => {
    if (isOpen) {
      setColor("transparent");
    } else {
      setColor("dark");
    }
    setIsOpen(!isOpen);
  };

  const dropdownToggle = (e) => {
    setDropdownOpen(!dropdownOpen);
  };

  const getBrand = () => {
    let brandName = "Page not found";
    routes.map((prop, key) => {
      if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
        brandName = prop.name;
      }
      return null;
    });
    return brandName;
  };

  const openSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    sidebarToggle.current.classList.toggle("toggled");
  };

  const updateColor = useCallback(() => {
    if (window.innerWidth < 993 && isOpen) {
      setColor("dark");
    } else {
      setColor("transparent");
    }
  }, [isOpen]);

  useEffect(() => {
    window.addEventListener("resize", updateColor);
    return () => {
      window.removeEventListener("resize", updateColor);
    };
  }, [updateColor]);

  const handleLogout = (e) => {
    e.preventDefault();
    removeToken();
    navigate("/login");
  };

  return (
    <Navbar
      expand="lg"
      className={
        color === "transparent" ? "navbar-transparent " : ""
      }
    >
      <div className="navbar-wrapper">
        <div className="navbar-toggle">
          <button
            type="button"
            ref={sidebarToggle}
            className="navbar-toggler"
            onClick={openSidebar}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <NavbarBrand href="/">{getBrand()}</NavbarBrand>
        <div className="navbar-content">
          {location.pathname.includes("/admin/bots") && (
            <>
              <Link to="/admin/bots/new">
                <Button className="btn btn-link">New bot</Button>
              </Link>
              <Link to="/admin/bots/autotrade">
                <Button className="btn btn-link">Autotrade settings</Button>
              </Link>
            </>
          )}
          {location.pathname.includes("/admin/paper-trading") && (
            <>
              <Link to="/admin/paper-trading/new">
                <Button className="btn btn-link">New bot</Button>
              </Link>
              <Link to="/admin/paper-trading/autotrade">
                <Button className="btn btn-link">Autotrade settings</Button>
              </Link>
            </>
          )}
        </div>
      </div>
      <NavbarToggler onClick={toggle}>
        <span className="navbar-toggler-bar navbar-kebab" />
        <span className="navbar-toggler-bar navbar-kebab" />
        <span className="navbar-toggler-bar navbar-kebab" />
      </NavbarToggler>
      <Collapse
        isOpen={isOpen}
        navbar
        className="justify-content-end"
      >
        <form>
          <InputGroup className="no-border">
            <Input placeholder="Search..." />
            <InputGroupText>
              <i className="nc-icon nc-zoom-split" />
            </InputGroupText>
          </InputGroup>
        </form>
        <Nav navbar>
          <NavItem>
            <button className="btn-reset nav-link btn-magnify">
              <i className="nc-icon nc-layout-11" />
              <p>
                <span className="d-lg-none d-md-block">Stats</span>
              </p>
            </button>
          </NavItem>
          <NavItem>
            <button
              onClick={handleLogout}
              className="btn-reset nav-link btn-rotate"
            >
              <i className="nc-icon nc-user-run" />
              <p>
                <span className="d-lg-none d-md-block">Account</span>
              </p>
            </button>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;