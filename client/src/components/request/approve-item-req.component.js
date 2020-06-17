import React, { Component } from "react";
import AuthService from "../../services/auth.service";
import ItemReqService from "../../services/student-item-req.service";

export default class ApproveItemReq extends Component {
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
        ItemReqService.findByAcId(staffId)
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
            const { requestId, studentId, item_no, quantity, reason } = request //destructuring
            return (
                <tr key={requestId}>
                    <td>{studentId}</td>
                    <td>{item_no}</td>
                    <td>{quantity}</td>
                    <td>{reason}</td>
                </tr>
            )
        })
    }

    render() {

        return (
            <div className="container">
                <h4>Component Requests</h4>
                <hr />
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
                        {this.renderTableData()}
                    </tbody>
                </table>
            </div>
        );
    }
}