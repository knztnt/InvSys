import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import AuthService from "../services/auth.service";

class Sidebar extends Component {
    constructor(props) {
        super(props);

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

    render() {
        const { currentUser, showStudentBoard, showAcademicBoard, showNonacBoard, showAdminBoard } = this.state;

        return (

            <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">

                <div className="sidebar-sticky pt-3">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            {/* student boards */}
                            {showStudentBoard && (
                                <Link to={"/Student"} className="nav-link">Dashboard<span className="sr-only">(current)</span></Link>
                            )}

                            {showStudentBoard && (
                                <Link to={"/view-items"} className="nav-link">View Items</Link>
                            )}

                            {showStudentBoard && (
                                <Link to={"/view-services"} className="nav-link">view-services</Link>
                            )}

                            {/* academic boards */}
                            {showAcademicBoard && (
                                <Link to={"/academic"} className="nav-link">Dashboard</Link>
                            )}

                            {showAcademicBoard && (
                                <Link to={"/view-items"} className="nav-link">View Items</Link>
                            )}

                            {showAcademicBoard && (
                                <Link to={"/view-services"} className="nav-link">view-services</Link>
                            )}


                            {/* non-academic boards */}
                            {showNonacBoard && (
                                <Link to={"/non-academic"} className="nav-link">Dashboard</Link>
                            )}

                            {showNonacBoard && (
                                <Link to={"/add-item"} className="nav-link">Add Items</Link>
                            )}

                            {showNonacBoard && (
                                <Link to={"/view-items"} className="nav-link">Manage Items</Link>
                            )}

                            {showNonacBoard && (
                                <Link to={"/add-service"} className="nav-link">Add Services</Link>
                            )}

                            {showNonacBoard && (
                                <Link to={"/view-services"} className="nav-link">Manage Services</Link>
                            )}

                            {/* admin boards */}
                            {showAdminBoard && (
                                <Link to={"/admin"} className="nav-link">Admin Dashboard</Link>
                            )}

                            {showAdminBoard && (
                                <Link to={"/register"} className="nav-link">Register Users</Link>
                            )}

                            {/* profile board */}
                            {currentUser && (
                                <Link to={"/profile"} className="nav-link">{currentUser.username}</Link>
                            )}

                        </li>
                    </ul>
                </div>

            </nav >
        );

    }
}

export default withRouter(Sidebar);
