import React, { Component } from "react";
import AuthService from "../../services/auth.service";
import ServiceReqService from "../../services/student-service-req.service";

import { Link } from "react-router-dom";

export default class ApproveServiceReq extends Component {
    constructor(props) {
        super(props);
        this.getRequests = this.getRequests.bind(this);
        this.renderTableData = this.renderTableData.bind(this);

        this.state = {
            studentReq: [],
            staffId: ""
        };
    }

    componentDidMount() {
        this.setState({
            staffId: AuthService.getCurrentUser().username
        });
        this.getRequests(AuthService.getCurrentUser().username);
    }

    getRequests(staffId) {
        ServiceReqService.findByAcId(staffId)
            .then((response) => {
                this.setState({
                    studentReq: response.data,
                });
                console.log(this.state.studentReq);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    renderTableData() {
        return this.state.studentReq.map((request, index) => {
            const { requestId, studentId, service_no, reason } = request //destructuring
            return (
                <tr key={requestId}>
                    <td>{studentId}</td>
                    <td>{service_no}</td>
                    <td>{reason}</td>
                    <td>{<Link to={"/approve/service-requests/" + requestId}>Review Request</Link>}</td>
                </tr>
            )
        })
    }

    render() {

        return (
            <div className="container">
                <h4>Service Requests</h4>
                <hr />
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Student</th>
                            <th scope="col">Service</th>
                            <th scope="col">Reason</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTableData()}
                    </tbody>
                </table>
            </div>
        );
    }
}