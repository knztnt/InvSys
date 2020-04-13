import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import logo from "../logo.png";
class Navbar extends Component {
  logOut(e) {
    e.preventDefault();
    localStorage.removeItem("usertoken");
    this.props.history.push(`/`);
  }

  render() {
    // if user not logged in
    const loginRegLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li>
      </ul>
    );

    // if user logged in
    const userLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/profile" className="nav-link">
            Profile
          </Link>
        </li>
        <li className="nav-item">
          <a href="/#" onClick={this.logOut.bind(this)} className="nav-link">
            Logout
          </a>
        </li>
      </ul>
    );

    // if user not logged in
    const loginBrandLink = (
      <a className="navbar-brand" href="/">
        <img
          src={logo}
          height="30"
          width="30"
          className="d-inline-block align-top mr-2"
          alt="Logo"
        />
          InvSys
      </a>
    );

    // if user logged in
    const userBrandLink = (
      <a className="navbar-brand" href="/home">
        <img
          src={logo}
          height="30"
          width="30"
          className="d-inline-block align-top mr-2"
          alt="Logo"
        />
          InvSys
      </a>
    );

    // if user not logged in
    const loginMainLink = (
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to="/about" className="nav-link">
            About
              </Link>
        </li>
        <li className="nav-item">
          <Link to="/contact" className="nav-link">
            Contact
              </Link>
        </li>
      </ul>
    );

    // if user logged in
    const userMainLink = (
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to="/home" className="nav-link">
            Home
                <span className="sr-only">(current)</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/about" className="nav-link">
            About
              </Link>
        </li>
        <li className="nav-item">
          <Link to="/contact" className="nav-link">
            Contact
              </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        {localStorage.usertoken ? userBrandLink : loginBrandLink}
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarColor03"
          aria-controls="navbarColor03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarColor03">
          {localStorage.usertoken ? userMainLink : loginMainLink}
          {localStorage.usertoken ? userLink : loginRegLink}
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
