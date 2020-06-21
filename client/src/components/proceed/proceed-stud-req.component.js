import React, { Component } from "react";
import AuthService from "../../services/auth.service";
import ServiceReqService from "../../services/student-service-req.service";
import ProfileService from "../../services/profile.service";
import ServiceDataService from "../../services/service.service";
import ProceedDataService from "../../services/proceed-stud-req.service";
import ReqReviewService from "../../services/review-service-req.service";

export default class IssueItemReq extends Component {
    constructor(props) {
        super(props);
        this.getRequest = this.getRequest.bind(this);
        this.getRequestReview = this.getRequestReview.bind(this);
        this.getStudentProfile = this.getStudentProfile.bind(this);
        this.getService = this.getService.bind(this);
        this.updateRequestReview = this.updateRequestReview.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.pushBack = this.pushBack.bind(this);

        this.state = {
            studentReq: [],
            studentProfile: [],
            service: [],
            nonacademicId: "",
            reqReview: [],
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
        ServiceReqService.get(requestId)
            .then((response) => {
                this.setState({
                    studentReq: response.data,
                });
                console.log(this.state.studentReq);
                this.getStudentProfile();
                this.getService(this.state.studentReq.service_no);
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


    onSubmit() {
        const requestId = this.state.studentReq.requestId;

        const data = {
            requestId: requestId,
            nonacademicId: this.state.nonacademicId
        }
        console.log(data)
        ProceedDataService.create(data.requestId, data.nonacademicId, data.returnBefore)
            .then(
                response => {
                    console.log(response.data);
                    this.updateRequestReview(requestId);
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

    getService(service_no) {
        ServiceDataService.get(service_no)
            .then((response) => {
                this.setState({
                    service: response.data,
                });
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    pushBack() {
        this.props.history.push('/proceed/service/');
    }

    render() {
        const { studentReq, studentProfile, service } = this.state;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <h4>
                            <strong><i className="fas fa-file-export fa-fw"></i> Request for Service #{studentReq.service_no} | {service.service_name}</strong>
                        </h4>
                        <hr />
                        <div className="row">
                            <label className="col-sm-3 font-weight-bolder">Service no:</label>
                            <p className="col-sm-9">{studentReq.service_no}</p>
                            <label className="col-sm-3 font-weight-bolder">Service:</label>
                            <p className="col-sm-9">{service.service_name}</p>
                            <label className="col-sm-3 font-weight-bolder">Service Decription:</label>
                            <p className="col-sm-9">{service.description}</p>
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
                                    <i className="far fa-user-circle fa-fw"></i> Student Profile
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
                                <h4>Service proceeded successfully!</h4>
                                <button className="btn btn-success" onClick={this.pushBack}>
                                    Done
                                </button>
                            </div>
                        ) : (
                                <div>
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