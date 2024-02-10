// maybe have to  refactoring other class components to function components as well.
// using hooks in one part of your application
import React from "react";
import { connect } from "react-redux";
import ReduxToastr from "react-redux-toastr";
import { Route, Routes } from "react-router-dom";
import { Spinner } from "reactstrap";
//works ok
import Footer from '../pages/footer/Footer.jsx';
import Header from "../pages/header/Header.jsx";
import Sidebar from "../pages/sidebar/Sidebar";
//have to check the work now
import routes from "../router/routes";

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "black",
      activeColor: "info",
      loading: false,
    };
    this.mainPanel = React.createRef();
  }

  handleActiveClick = (color) => {
    this.setState({ activeColor: color });
  };
  handleBgClick = (color) => {
    this.setState({ backgroundColor: color });
  };
  render() {
    return (
      <div className={this.props.loading ? "u-loading-layer" : ""}>
        <div className="wrapper">
          {this.props.loading ? (
            <Spinner color="primary" type="grow" className="c-loader" />
          ) : (
            ""
          )}
          <ReduxToastr
            timeOut={4000}
            newestOnTop={true}
            preventDuplicates
            position="top-right"
            getState={(state) => state.toastr} // This is the default
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            progressBar
            closeOnToastrClick
          />
          <Sidebar
            {...this.props}
            routes={routes}
            bgColor={this.state.backgroundColor}
            activeColor={this.state.activeColor}
          />
          <div className="main-panel" ref={this.mainPanel}>
            <Header {...this.props} />
            <Routes>
              {routes.map((prop, key) => {
                return (
                  <Route
                    path={prop.layout ? prop.layout + prop.path : prop.path}
                    element={React.createElement(prop.component)}
                    key={key}
                  />
                );
              })}
            </Routes>
            <Footer fluid />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (s, p) => {
  const { loading } = s.loadingReducer;
  return {
    loading: loading
  };
};

export default connect(mapStateToProps, {})(Admin);