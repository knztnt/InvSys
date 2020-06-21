import React, { Component } from "react";
import AuthService from "../../services/auth.service";
import ItemReqService from "../../services/student-item-req.service";
import ReqReviewService from "../../services/review-item-req.service";

import { Link } from 'react-router-dom';

export default class ViewAcReq extends Component {
    constructor(props) {
        super(props);
        this.getApprovedRequests = this.getApprovedRequests.bind(this);
        this.getRequests = this.getRequests.bind(this);
        this.renderTablePending = this.renderTablePending.bind(this);
        this.renderTableIssued = this.renderTableIssued.bind(this);
        this.getReviewedReq = this.getReviewedReq.bind(this);

        this.state = {
            approvedReq: [],
            studentReq: [],
            issuedReqs: [],
            currentUser: "",
            pending: 0
        };
    }

    componentDidMount() {
        this.setState({
            currentUser: AuthService.getCurrentUser().username
        });
        this.getApprovedRequests();
        this.getReviewedReq();
    }

    getApprovedRequests() {
        ReqReviewService.getApproved()
            .then((response) => {
                this.setState({
                    approvedReq: response.data,
                });
                console.log(this.state.approvedReq);
                this.getRequests(this.state.approvedReq);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    getRequests(reqList) {
        reqList.map((request) => {
            var requestId = request.requestId;
            ItemReqService.get(requestId)
                .then((response) => {
                    request = response.data;
                    this.setState({
                        studentReq: this.state.studentReq.concat(request)
                    });
                })
                .catch((e) => {
                    console.log(e);
                });

            return null;
        })
    }

    getReviewedReq() {
        ReqReviewService.getIssued()
            .then((response) => {
                this.setState({
                    issuedReqs: response.data
                });
            })
            .catch((e) => {
                console.log(e);
            });
    }

    renderTablePending() {
        return this.state.studentReq.map((request) => {
            const condition = this.state.issuedReqs.map((id) => { return (id.requestId === request.requestId) });
            console.log(this.state.studentReq);
            // console.log(condition);
            if (condition) {
                const { requestId, studentId, item_no, quantity, reason } = request //destructuring
                return (
                    <tr key={requestId}>
                        <td>{studentId}</td>
                        <td>{item_no}</td>
                        <td>{quantity}</td>
                        <td>{reason}</td>
                        <td>{<Link to={"/issue/item/" + requestId}>Proceed Request</Link>}</td>
                    </tr >
                )
            }
            else { return null; }
        })
    }

    renderTableIssued() {
        return this.state.studentReq.map((request) => {
            const condition = this.state.issuedReqs.map((id) => { return (id.requestId === request.requestId) })
            // console.log(condition)
            if (condition) {
                const { requestId, studentId, item_no, quantity, reason } = request //destructuring
                return (
                    <tr key={requestId}>
                        <td>{studentId}</td>
                        <td>{item_no}</td>
                        <td>{quantity}</td>
                        <td>{reason}</td>
                    </tr >
                )
            }
            else { return null; }
        })
    }

    render() {
        return (
            <div className="container">
                <h4>Component Requests</h4>
                <hr />
                <ul className="nav nav-pills mb-3" id="myTab" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" id="pending-tab" data-toggle="tab" href="#pending" role="tab" aria-controls="pending" aria-selected="true">Pending Requests</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="reviewed-tab" data-toggle="tab" href="#reviewed" role="tab" aria-controls="reviewed" aria-selected="false">Issued Requests</a>
                    </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="pending" role="tabpanel" aria-labelledby="pending-tab">
                        <table className="table">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Academic Id</th>
                                    <th scope="col">Item</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Reason</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderTablePending()}
                            </tbody>
                        </table>
                    </div>
                    <div className="tab-pane fade" id="reviewed" role="tabpanel" aria-labelledby="reviewed-tab">
                        <table className="table">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Student</th>
                                    <th scope="col">Item</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Reason</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderTableIssued()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}