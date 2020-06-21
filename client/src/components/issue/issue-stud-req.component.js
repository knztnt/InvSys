import React, { Component } from "react";
import AuthService from "../../services/auth.service";
import ItemReqService from "../../services/student-item-req.service";
import ProfileService from "../../services/profile.service";
import ItemDataService from "../../services/item.service";
import IssueDataService from "../../services/issue-student-req.service";
import ReqReviewService from "../../services/review-item-req.service";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class IssueItemReq extends Component {
    constructor(props) {
        super(props);
        this.getRequest = this.getRequest.bind(this);
        this.getRequestReview = this.getRequestReview.bind(this);
        this.getStudentProfile = this.getStudentProfile.bind(this);
        this.getItem = this.getItem.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.updateRequestReview = this.updateRequestReview.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.pushBack = this.pushBack.bind(this);

        this.state = {
            studentReq: [],
            studentProfile: [],
            item: [],
            nonacademicId: "",
            reqReview: [],
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
        this.getRequestReview(this.props.match.params.requestId);
    }

    getRequest(requestId) {
        ItemReqService.get(requestId)
            .then((response) => {
                this.setState({
                    studentReq: response.data,
                });
                console.log(this.state.studentReq);
                this.getStudentProfile();
                this.getItem(this.state.studentReq.item_no);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    getRequestReview(requestId) {
        ReqReviewService.get(requestId)
            .then((response) => {
                this.setState({
                    reqReview: response.data,
                });
                console.log(this.state.reqReview);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    getStudentProfile() {
        ProfileService.get(this.state.studentReq.studentId)
            .then(response => {
                this.setState({
                    studentProfile: response.data
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
        const requestId = this.state.studentReq.requestId;
        const item_no = this.state.studentReq.item_no;

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
                    this.updateRequestReview(requestId);
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

    updateRequestReview(requestId) {
        const data = { isIssued: true };

        ReqReviewService.update(requestId, data)
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
        const quantiy = this.state.item.quantity - this.state.studentReq.quantity;
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
        this.props.history.push('/issue/item/');
    }

    render() {
        const { studentReq, studentProfile, item } = this.state;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <h4>
                            <strong><i className="fas fa-file-export fa-fw"></i> Request for Component #{studentReq.item_no} | {item.item_name}</strong>
                        </h4>
                        <hr />
                        <div className="row">
                            <label className="col-sm-3 font-weight-bolder">Item no:</label>
                            <p className="col-sm-9">{studentReq.item_no}</p>
                            <label className="col-sm-3 font-weight-bolder">Component:</label>
                            <p className="col-sm-9">{item.item_name}</p>
                            <label className="col-sm-3 font-weight-bolder">Component Decription:</label>
                            <p className="col-sm-9">{item.description}</p>
                            <label className="col-sm-3 font-weight-bolder">Requested Quantity:</label>
                            <p className="col-sm-9">{studentReq.quantity}</p>
                            <label className="col-sm-3 font-weight-bolder">Available Quantity:</label>
                            <p className="col-sm-9">{item.quantity}</p>
                            <label className="col-sm-3 font-weight-bolder">Reason:</label>
                            <p className="col-sm-9">{studentReq.reason}</p>
                            <label className="col-sm-3 font-weight-bolder">Requested Time:</label>
                            <p className="col-sm-9">{studentReq.requestedTime}</p>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">
                                    Student Profile
                                </h5>
                                <hr />
                                <i className="fas fa-id-badge fa-fw"></i> <p className="card-text">{studentProfile.username}</p>
                                <i className="fas fa-pen-alt fa-fw"></i> <p className="card-text">{studentProfile.first_name} {studentProfile.last_name}</p>
                                <i className="far fa-building fa-fw"></i> <p className="card-text">{studentProfile.department}</p>
                                <i className="far fa-envelope-open fa-fw"></i> <p className="card-text">{studentProfile.email}</p>
                                <i className="fas fa-phone fa-fw"></i> <p className="card-text">{studentProfile.phone_no}</p>
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