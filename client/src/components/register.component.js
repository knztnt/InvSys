import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const validateUsername = value => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-warning" role="alert">
                The username must be between 3 and 20 characters.
            </div>
        );
    }
};

const validatePassword = value => {
    if (value.length < 4 || value.length > 40) {
        return (
            <div className="alert alert-warning" role="alert">
                The password must be between 4 and 40 characters.
            </div>
        );
    }
};

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeRoleValue = this.onChangeRoleValue.bind(this);

        this.state = {
            username: "",
            password: "",
            roleValue: "",
            roles: [],
            successful: false,
            loading: false,
            message: ""
        };
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onChangeRoleValue(e) {
        // console.log(e.target.value);
        this.setState({
            roleValue: e.target.value
        });
        this.onAddRole();
    }

    onAddRole = () => {
        this.setState(state => {
            let roles = [];
            if (!state.roles.includes(state.roleValue)) {
                roles = state.roles.concat(state.roleValue);
            }
            else {
                roles = state.roles.filter(function (item) { return state.roleValue !== item; });
            }

            return {
                roles,
                roleValue: "",
            };
        });
    };

    handleRegister(e) {
        // console.log(this.state);
        e.preventDefault();

        this.setState({
            message: "",
            successful: false
        });

        this.form.validateAll();

        this.setState({
            loading: true
        });

        if (this.checkBtn.context._errors.length === 0) {
            AuthService.register(
                this.state.username,
                this.state.password,
                this.state.roles
            ).then(
                response => {
                    this.setState({
                        message: response.data.message,
                        successful: true
                    });
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        successful: false,
                        loading: false,
                        message: resMessage
                    });
                }
            );
        } else {
            this.setState({
                loading: false
            });
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        {/* <img
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-img"
                        className="profile-img-card"
                    /> */}

                        <Form
                            onSubmit={this.handleRegister}
                            ref={c => {
                                this.form = c;
                            }}
                        >
                            <h1 className="h3 mb-3 font-weight-normal">Register</h1>
                            {!this.state.successful && (
                                <div>
                                    <div className="form-group">
                                        <label htmlFor="username">Username</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="username"
                                            placeholder="Username or Registration Number"
                                            value={this.state.username}
                                            onChange={this.onChangeUsername}
                                            validations={[required, validateUsername]}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <Input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            placeholder="Password"
                                            value={this.state.password}
                                            onChange={this.onChangePassword}
                                            validations={[required, validatePassword]}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="rolecheck-inline">Role</label>
                                        <div name="rolecheck-inline">
                                            <div className="form-check form-check-inline">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    name="roleValue"
                                                    value={this.setState.roleValue = "admin"}
                                                    onChange={this.onChangeRoleValue}
                                                    id="admin" />

                                                <label
                                                    className="form-check-label"
                                                    htmlFor="admin">
                                                    Admin
                                            </label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    name="roleValue"
                                                    value={this.setState.roleValue = "non-academic"}
                                                    onChange={this.onChangeRoleValue}
                                                    id="non-academic" />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="non-academic">
                                                    Non-Academic
                                            </label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    name="roleValue"
                                                    value={this.setState.roleValue = "academic"}
                                                    onChange={this.onChangeRoleValue}
                                                    id="academic" />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="academic">
                                                    Academic
                                            </label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    name="roleValue"
                                                    value={this.setState.roleValue = "student"}
                                                    onChange={this.onChangeRoleValue}
                                                    id="student" />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="student">
                                                    Student
                                            </label>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <div className="form-group">
                                        <label htmlFor="roleValue">Role</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="roleValue"
                                            placeholder="Role"
                                            value={this.state.roleValue}
                                            onChange={this.onChangeRoleValue}
                                        />
                                    </div> */}

                                    <div className="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
                                        <button
                                            className="btn btn-primary"
                                            disabled={this.state.loading}
                                        >
                                            {this.state.loading && (
                                                <span className="spinner-border spinner-border-sm"></span>
                                            )}
                                            <span>Sign Up</span>
                                        </button>
                                    </div>
                                </div>
                            )}

                            {this.state.message && (
                                <div className="form-group">
                                    <div
                                        className={
                                            this.state.successful
                                                ? "alert alert-success"
                                                : "alert alert-danger"
                                        }
                                        role="alert"
                                    >
                                        {this.state.message}
                                    </div>
                                </div>
                            )}
                            <CheckButton
                                style={{ display: "none" }}
                                ref={c => {
                                    this.checkBtn = c;
                                }}
                            />
                        </Form>
                    </div>
                </div>
            </div >
        );
    }
}