import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import AuthService from "../services/auth.service";

class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.setActiveItem = this.setActiveItem.bind(this);

        this.state = {
            showStudentBoard: false,
            showAcademicBoard: false,
            showNonacBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
            currentIndex: 99,
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

    setActiveItem(index) {
        this.setState({
            currentIndex: index
        });
    }

    render() {
        const { currentUser, showStudentBoard, showAcademicBoard, showNonacBoard, showAdminBoard } = this.state;

        return (

            <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">

                <div className="sidebar-sticky pt-3">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            {/* Main Dashboard */}
                            {currentUser && (
                                <Link to={"/dashboard"} className={"nav-link " +
                                    (99 === this.state.currentIndex ? "active" : "")} onClick={() => this.setActiveItem(99)}>
                                    <i className="fas fa-home fa-fw"></i> Dashboard
                                </Link>
                            )}

                            {/* student boards */}
                            {/* {showStudentBoard && (
                                <Link to={"/student"} className={"nav-link " +
                                    (1 === this.state.currentIndex ? "active" : "")} onClick={() => this.setActiveItem(1)}>
                                    <i className="fas fa-home fa-fw"></i> Dashboard
                                </Link>
                            )} */}

                            {showStudentBoard && (
                                <Link to={"/view-items"} className={"nav-link " +
                                    (2 === this.state.currentIndex ? "active" : "")} onClick={() => this.setActiveItem(2)}>
                                    <i className="fas fa-microchip fa-fw"></i> View Items
                                </Link>
                            )}

                            {showStudentBoard && (
                                <Link to={"/view-services"} className={"nav-link " +
                                    (3 === this.state.currentIndex ? "active" : "")} onClick={() => this.setActiveItem(3)}>
                                    <i className="fas fa-microscope fa-fw"></i> View Services
                                </Link>
                            )}

                            {/* academic boards */}
                            {/* {showAcademicBoard && (
                                <Link to={"/academic"} className={"nav-link " +
                                    (4 === this.state.currentIndex ? "active" : "")} onClick={() => this.setActiveItem(4)}>
                                    <i className="fas fa-home fa-fw"></i> Dashboard
                                </Link>
                            )} */}

                            {showAcademicBoard && (
                                <Link to={"/view-items"} className={"nav-link " +
                                    (5 === this.state.currentIndex ? "active" : "")} onClick={() => this.setActiveItem(5)}>
                                    <i className="fas fa-microchip fa-fw"></i> View Items
                                </Link>
                            )}

                            {showAcademicBoard && (
                                <Link to={"/view-services"} className={"nav-link " +
                                    (6 === this.state.currentIndex ? "active" : "")} onClick={() => this.setActiveItem(6)}>
                                    <i className="fas fa-microscope fa-fw"></i> View Services
                                </Link>
                            )}


                            {/* non-academic boards */}
                            {/* {showNonacBoard && (
                                <Link to={"/non-academic"} className={"nav-link " +
                                    (7 === this.state.currentIndex ? "active" : "")} onClick={() => this.setActiveItem(7)}>
                                    <i className="fas fa-home fa-fw"></i> Dashboard
                                </Link>
                            )} */}

                            {showNonacBoard && (
                                <Link to={"/add-item"} className={"nav-link " +
                                    (8 === this.state.currentIndex ? "active" : "")} onClick={() => this.setActiveItem(8)}>
                                    <i className="fas fa-plus-square fa-fw"></i> Add Items
                                </Link>
                            )}

                            {showNonacBoard && (
                                <Link to={"/view-items"} className={"nav-link " +
                                    (9 === this.state.currentIndex ? "active" : "")} onClick={() => this.setActiveItem(9)}>
                                    <i className="fas fa-edit fa-fw"></i> Manage Items
                                </Link>
                            )}

                            {showNonacBoard && (
                                <Link to={"/add-service"} className={"nav-link " +
                                    (10 === this.state.currentIndex ? "active" : "")} onClick={() => this.setActiveItem(10)}>
                                    <i className="fas fa-plus-circle fa-fw"></i> Add Services
                                </Link>
                            )}

                            {showNonacBoard && (
                                <Link to={"/view-services"} className={"nav-link " +
                                    (11 === this.state.currentIndex ? "active" : "")} onClick={() => this.setActiveItem(11)}>
                                    <i className="fas fa-edit fa-fw"></i> Manage Services
                                </Link>
                            )}

                            {/* admin boards */}
                            {/* {showAdminBoard && (
                                <Link to={"/admin"} className={"nav-link " +
                                    (12 === this.state.currentIndex ? "active" : "")} onClick={() => this.setActiveItem(12)}>
                                    <i className="fas fa-home fa-fw"></i> Admin Dashboard
                                </Link>
                            )} */}

                            {showAdminBoard && (
                                <Link to={"/register"} className={"nav-link " +
                                    (13 === this.state.currentIndex ? "active" : "")} onClick={() => this.setActiveItem(13)}>
                                    <i className="fas fa-user-plus fa-fw"></i> Register Users
                                </Link>
                            )}

                            {/* profile board */}
                            {currentUser && (
                                <Link to={"/profile"} className={"nav-link " +
                                    (14 === this.state.currentIndex ? "active" : "")} onClick={() => this.setActiveItem(14)}>
                                    <i className="fas fa-user-alt fa-fw"></i> {currentUser.username}
                                </Link>
                            )}

                        </li>
                    </ul>
                </div>

            </nav >
        );

    }
}

export default withRouter(Sidebar);
