import React, { Component } from "react";
import Avatar from 'react-avatar';
import AuthService from "../services/auth.service";
import ProfileService from "../services/profile.service";

import { Link } from "react-router-dom";

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.getUserProfile = this.getUserProfile.bind(this);

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            currentProfile: {
                username: "",
                first_name: "",
                last_name: "",
                email: "",
                phone_no: "",
                address: "",
                department: ""
            }
        };
    }

    componentDidMount() {
        this.getUserProfile(this.state.currentUser.username);
        console.log(this.state.currentUser.username);
    }

    getUserProfile(username) {
        ProfileService.get(username)
            .then(response => {
                this.setState({
                    currentProfile: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentUser, currentProfile } = this.state;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="card m-2">
                            <div className="d-flex justify-content-center m-3">
                                <Avatar name={currentProfile.first_name + " " + currentProfile.last_name}
                                    size="100" round={true}
                                    color="#094a62d2"
                                />
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">
                                    <i className="far fa-user-circle fa-fw"></i> {currentProfile.first_name} {currentProfile.last_name}
                                </h5>
                                <p className="card-text"><i className="far fa-envelope-open fa-fw"></i> {currentProfile.email}</p>
                                <p className="card-text"><i className="fas fa-phone fa-fw"></i> {currentProfile.phone_no}</p>
                                <Link to={"/profile/edit/" + currentProfile.username}>
                                    <button className="btn btn-primary">
                                        <i className="fas fa-user-edit fa-fw"></i> Edit Profile
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <header>
                            <h3>
                                <strong><i className="far fa-address-card fa-fw"></i> Profile Overview</strong>
                            </h3>
                            <hr />
                        </header>
                        <div className="row">
                            <label className="col-sm-3 font-weight-bolder">Username:</label>
                            <p className="col-sm-9">{currentProfile.username}</p>
                            <label className="col-sm-3 font-weight-bolder">Name:</label>
                            <p className="col-sm-9">{currentProfile.first_name} {currentProfile.last_name}</p>
                            <label className="col-sm-3 font-weight-bolder">Department:</label>
                            <p className="col-sm-9">{currentProfile.department}</p>
                            <label className="col-sm-3 font-weight-bolder">Email:</label>
                            <p className="col-sm-9">{currentProfile.email}</p>
                            <label className="col-sm-3 font-weight-bolder">Phone No:</label>
                            <p className="col-sm-9">{currentProfile.phone_no}</p>
                            <label className="col-sm-3 font-weight-bolder">Address:</label>
                            <p className="col-sm-9">{currentProfile.address}</p>
                            <label className="col-sm-3 font-weight-bolder">User type:</label>
                            <div className="col-sm-9">
                                <ul className="list-inline">
                                    {currentUser.roles &&
                                        currentUser.roles.map((role, index) => <li className="list-inline-item" key={index}>{role}</li>)}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}