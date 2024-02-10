import React, { Component } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Nav } from "reactstrap";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.sidebar = React.createRef();
  }

  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }

  filterNavigationRoutes() {
    const { routes } = this.props;
    const navigation = routes.filter((r) => r.nav);
    return navigation;
  }

  validateUrl(path) {
    const url = new URL(path, window.location.origin);
    return url.origin === window.location.origin;
  }

  render() {
    return (
      <div
        className="sidebar"
        data-color={this.props.bgColor}
        data-active-color={this.props.activeColor}
      >
        <div className="logo">
          <a href="/" className="logo__link">
            <i className="nc-icon nc-sound-wave logo__icon" />
            <h1 className="logo__heading-1">Binbot</h1>
          </a>
        </div>
        <div className="sidebar-wrapper" ref={this.sidebar}>
          <Nav>
            {this.filterNavigationRoutes().map((prop, key) => {
              const path = prop.layout + prop.path;
              return this.validateUrl(path) ? (
                <li
                  className={this.activeRoute(prop.path)}
                  key={key}
                >
                  <NavLink
                    exact
                    to={path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              ) : null;
            })}
          </Nav>
        </div>
      </div>
    );
  }
}

const SidebarWithRouter = (props) => {
  const location = useLocation();
  return <Sidebar {...props} location={location} />;
};

export default SidebarWithRouter;