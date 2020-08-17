import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import logo from "../navbar-logo-blue.png";

import AuthService from "../services/auth.service";
import { Link } from "react-router-dom";

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            showStudentBoard: false,
            showAcademicBoard: false,
            showNonacBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
            loginPage: false
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();
        const currentLocation = window.location.pathname;

        if (user) {
            this.setState({
                currentUser: user,
                showStudentBoard: user.roles.includes("ROLE_STUDENT"),
                showAcademicBoard: user.roles.includes("ROLE_ACADEMIC"),
                showNonacBoard: user.roles.includes("ROLE_NON-ACADEMIC"),
                showAdminBoard: user.roles.includes("ROLE_ADMIN")
            });
        }

        if (currentLocation === "/login") {
            this.setState({
                loginPage: true
            });
        }
    }

    logOut() {
        AuthService.logout();
    }

    render() {
        const { currentUser, loginPage } = this.state;

        return (
            <nav className="navbar navbar-dark bg-dark sticky-top flex-md-nowrap p-0">
                <Link className="navbar-brand col-md-3 col-lg-2 mr-0 px-3" to="/">
                    <img
                        src={logo}
                        height="50"
                        width="160"
                        alt="Logo"
                    />
                </Link>
                <button
                    className="navbar-toggler position-absolute d-md-none collapsed"
                    type="button"
                    data-toggle="collapse"
                    data-target="#sidebarMenu"
                    aria-controls="sidebarMenu"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" id="#toggler-icon" />
                </button>
                {loginPage ?
                    (<div></div>)
                    : (<div>
                        {currentUser ? (
                            <div className="navbar-nav px-3">
                                <li className="nav-item text-nowrap">
                                    <a href="/login" className="nav-link" onClick={this.logOut}>
                                        <button
                                            type="button"
                                            className="btn btn-secondary btn-sm">
                                            <i className="fas fa-sign-out-alt fa-fw"></i>
                                     LogOut
                                </button>
                                    </a>
                                </li>
                            </div>
                        ) : (
                                <div className="navbar-nav px-3 d-none d-sm-block">
                                    <li className="nav-item text-nowrap">
                                        <a href={"/login"} className="nav-link">
                                            <button
                                                type="button"
                                                className="btn btn-secondary btn-sm">
                                                Login
                                        <i className="fas fa-sign-in-alt fa-fw"></i>
                                            </button>
                                        </a>
                                    </li>
                                </div>
                            )
                        }
                    </div>)}

            </nav>
        );
    }
}

export default withRouter(Navbar);
