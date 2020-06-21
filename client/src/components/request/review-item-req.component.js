import React, { Component } from "react";
import AuthService from "../../services/auth.service";
import ItemReqService from "../../services/student-item-req.service";
import ProfileService from "../../services/profile.service";
import ItemDataService from "../../services/item.service";
import ReviewDataService from "../../services/review-item-req.service";

export default class ReviewItemReq extends Component {
    constructor(props) {
        super(props);
        this.getRequest = this.getRequest.bind(this);
        this.getStudentProfile = this.getStudentProfile.bind(this);
        this.getItem = this.getItem.bind(this);
        this.onApproveRequest = this.onApproveRequest.bind(this);
        this.onDeclineRequest = this.onDeclineRequest.bind(this);
        this.onChangeRemarks = this.onChangeRemarks.bind(this);
        this.updateRequest = this.updateRequest.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.pushBack = this.pushBack.bind(this);

        this.state = {
            studentReq: [],
            studentProfile: [],
            item: [],
            staffId: "",
            remarks: "",
            submitted: false
        };
    }


    componentDidMount() {
        this.getRequest(this.props.match.params.requestId);
        this.setState({
            staffId: AuthService.getCurrentUser().username
        });
    }

    getRequest(requestId) {
        ItemReqService.get(requestId)
            .then((response) => {
                this.setState({
                    studentReq: response.data,
                });
                console.log(this.state.studentReq);
                this.getStudentProfile(this.state.studentReq.studentId);
                this.getItem(this.state.studentReq.item_no);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    getStudentProfile(username) {
        ProfileService.get(username)
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

    onApproveRequest() {
        const isApproved = true;
        this.onSubmit(isApproved);
    }

    onDeclineRequest() {
        const isApproved = false;
        this.onSubmit(isApproved);
    }

    onSubmit(param) {
        const requestId = this.state.studentReq.requestId;
        const isApproved = param;

        const data = {
            requestId: requestId,
            isApproved: isApproved,
            remarks: this.state.remarks
        }

        ReviewDataService.create(data.requestId, data.remarks, data.isApproved)
            .then(
                response => {
                    console.log(response.data);
                    this.updateRequest(requestId);
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

    onChangeRemarks(e) {
        this.setState({
            remarks: e.target.value
        });
        console.log(this.state.remarks);
    }

    updateRequest(requestId) {
        const data = { isReviewed: true };

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
        this.props.history.push('/approve/item-requests');
    }

    render() {
        const { studentReq, studentProfile, item } = this.state;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <h4>
                            <strong>Request for Component #{studentReq.item_no} | {item.item_name}</strong>
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
                                <h4>Request reviewed successfully!</h4>
                                <button className="btn btn-success" onClick={this.pushBack}>
                                    Done
                                </button>
                            </div>
                        ) : (
                                <div>
                                    <div className="row form-group">
                                        <label htmlFor="remarks" className="col-sm-3 font-weight-bolder">Remarks</label>
                                        <textarea
                                            type="text"
                                            className="form-control col-sm-9"
                                            id="remarks"
                                            rows="5"
                                            required
                                            value={this.state.remarks}
                                            onChange={this.onChangeRemarks}
                                            name="remarks"
                                        />
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-3"></div>
                                        <div className="col-sm-9 d-flex justify-content-center">
                                            <button onClick={this.onDeclineRequest} className="btn btn-secondary mr-3">
                                                Decline Request
                                            </button>
                                            <button onClick={this.onApproveRequest} className="btn btn-success">
                                                Approve Request
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