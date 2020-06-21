import React, { Component } from "react";
import AuthService from "../../services/auth.service";
import ItemReqService from "../../services/academic-item-req.service";
import ProfileService from "../../services/profile.service";
import ItemDataService from "../../services/item.service";
import IssueDataService from "../../services/issue-ac-req.service";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class IssueItemReq extends Component {
    constructor(props) {
        super(props);
        this.getRequest = this.getRequest.bind(this);
        this.getStaffProfile = this.getStaffProfile.bind(this);
        this.getItem = this.getItem.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.updateRequest = this.updateRequest.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.pushBack = this.pushBack.bind(this);

        this.state = {
            staffReq: [],
            academicProfile: [],
            item: [],
            nonacademicId: "",
            returnBefore: undefined,
            submitted: false
        };
    }


    componentDidMount() {
        this.getRequest(this.props.match.params.requestId);
        this.setState({
            nonacademicId: AuthService.getCurrentUser().username,
            returnBefore: new Date()
        });
    }

    getRequest(requestId) {
        ItemReqService.get(requestId)
            .then((response) => {
                this.setState({
                    staffReq: response.data,
                });
                console.log(this.state.staffReq);
                this.getStaffProfile(this.state.staffReq.academicId);
                this.getItem(this.state.staffReq.item_no);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    getStaffProfile() {
        ProfileService.get(this.state.staffReq.academicId)
            .then(response => {
                this.setState({
                    academicProfile: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    onChangeDate(date) {
        this.setState({
            returnBefore: date
        });
    }

    onSubmit() {
        const requestId = this.state.staffReq.requestId;
        const item_no = this.state.staffReq.item_no;

        const data = {
            requestId: requestId,
            nonacademicId: this.state.nonacademicId,
            returnBefore: this.state.returnBefore
        }
        console.log(data)
        IssueDataService.create(data.requestId, data.nonacademicId, data.returnBefore)
            .then(
                response => {
                    console.log(response.data);
                    this.updateRequest(requestId);
                    this.updateItem(item_no);
                    this.setState({
                        submitted: true
                    });
                }
            )
            .catch(
                e => {
                    console.log(e);
                }
            );
    }

    updateRequest(requestId) {
        const data = { isIssued: true };

        ItemReqService.update(requestId, data)
            .then(
                response => {
                    console.log(response.data);
                }
            )
            .catch(e => {
                console.log(e);
            });
    }

    updateItem(item_no) {
        const quantiy = this.state.item.quantity - this.state.staffReq.quantity;
        const data = { quantity: quantiy };

        ItemDataService.update(item_no, data)
            .then(
                response => {
                    console.log(response.data);
                }
            )
            .catch(e => {
                console.log(e);
            });
    }

    getItem(item_no) {
        ItemDataService.get(item_no)
            .then((response) => {
                this.setState({
                    item: response.data,
                });
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    pushBack() {
        this.props.history.push('/issue/item/ac/');
    }

    render() {
        const { staffReq, academicProfile, item } = this.state;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <h4>
                            <strong><i className="fas fa-file-export fa-fw"></i> Request for Component #{staffReq.item_no} | {item.item_name}</strong>
                        </h4>
                        <hr />
                        <div className="row">
                            <label className="col-sm-3 font-weight-bolder">Item no:</label>
                            <p className="col-sm-9">{staffReq.item_no}</p>
                            <label className="col-sm-3 font-weight-bolder">Component:</label>
                            <p className="col-sm-9">{item.item_name}</p>
                            <label className="col-sm-3 font-weight-bolder">Component Decription:</label>
                            <p className="col-sm-9">{item.description}</p>
                            <label className="col-sm-3 font-weight-bolder">Requested Quantity:</label>
                            <p className="col-sm-9">{staffReq.quantity}</p>
                            <label className="col-sm-3 font-weight-bolder">Available Quantity:</label>
                            <p className="col-sm-9">{item.quantity}</p>
                            <label className="col-sm-3 font-weight-bolder">Reason:</label>
                            <p className="col-sm-9">{staffReq.reason}</p>
                            <label className="col-sm-3 font-weight-bolder">Requested Time:</label>
                            <p className="col-sm-9">{staffReq.requestedTime}</p>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">
                                    Academic Profile
                                </h5>
                                <hr />
                                <i className="fas fa-id-badge fa-fw"></i> <p className="card-text">{academicProfile.username}</p>
                                <i className="fas fa-pen-alt fa-fw"></i> <p className="card-text">{academicProfile.first_name} {academicProfile.last_name}</p>
                                <i className="far fa-building fa-fw"></i> <p className="card-text">{academicProfile.department}</p>
                                <i className="far fa-envelope-open fa-fw"></i> <p className="card-text">{academicProfile.email}</p>
                                <i className="fas fa-phone fa-fw"></i> <p className="card-text">{academicProfile.phone_no}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="submit-form col-lg-8">
                        {this.state.submitted ? (
                            <div>
                                <h4>Component issued successfully!</h4>
                                <button className="btn btn-success" onClick={this.pushBack}>
                                    Done
                                </button>
                            </div>
                        ) : (
                                <div>
                                    <div className="row form-group">
                                        <label htmlFor="remarks" className="col-sm-3 font-weight-bolder">Return Date</label>
                                        <div>
                                            <DatePicker
                                                selected={this.state.returnBefore}
                                                onChange={this.onChangeDate}
                                                minDate={new Date()}
                                                dateFormat={"dd-MM-yyyy"}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-3"></div>
                                        <div className="col-sm-9 d-flex justify-content-center">
                                            <button onClick={this.onSubmit} className="btn btn-success">
                                                Proceed
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                    </div>
                </div>
            </div>
        );
    }
}