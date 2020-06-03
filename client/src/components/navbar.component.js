import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import logo from "../logo-2.png";

import AuthService from "../services/auth.service";

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            showStudentBoard: false,
            showAcademicBoard: false,
            showNonacBoard: false,
            showAdminBoard: false,
            currentUser: undefined
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
                showStudentBoard: user.roles.includes("ROLE_STUDENT"),
                showAcademicBoard: user.roles.includes("ROLE_ACADEMIC"),
                showNonacBoard: user.roles.includes("ROLE_NON-ACADEMIC"),
                showAdminBoard: user.roles.includes("ROLE_ADMIN")
            });
        }
    }

    logOut() {
        AuthService.logout();
    }

    render() {
        const { currentUser, showStudentBoard, showAcademicBoard, showNonacBoard, showAdminBoard } = this.state;

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top shadow">
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
                <a className="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="/">
                    <img
                        src={logo}
                        height="30"
                        width="120"
                        className="d-inline-block align-top mr-2"
                        alt="Logo"
                    />
                </a>
                <div className="collapse navbar-collapse" id="navbarColor03">
                    <div className="navbar-nav mr-auto">
                        {/* <li className="nav-item">
                        <Link to={"/home"} className="nav-link">
                            Home
                        </Link>
                        </li> */}


                    </div>


                    {currentUser ? (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/profile"} className="nav-link">
                                    {currentUser.username}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a href="/login" className="nav-link" onClick={this.logOut}>
                                    LogOut
                            </a>
                            </li>
                        </div>
                    ) : (
                            <div className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to={"/login"} className="nav-link">
                                        Login
                                </Link>
                                </li>

                                <li className="nav-item">
                                    <Link to={"/register"} className="nav-link">
                                        Sign Up
                                </Link>
                                </li>
                            </div>
                        )}
                </div>
            </nav>
        );
    }
}

export default withRouter(Navbar);
