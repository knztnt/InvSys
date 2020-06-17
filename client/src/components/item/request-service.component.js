import React, { Component } from "react";
import ServiceDataService from "../../services/service.service";
import UserService from "../../services/user-role.service";
import ServReqService from "../../services/student-service-req.service";
import AcaServReqService from "../../services/academic-service-req.service";
import AuthService from "../../services/auth.service";
import { Link } from "react-router-dom";

export default class RequestService extends Component {
  constructor(props) {
    super(props);
    this.onChangeReason = this.onChangeReason.bind(this);
    this.getService = this.getService.bind(this);
    this.getAcademicUsers = this.getAcademicUsers.bind(this);
    this.setSelectedMember = this.setSelectedMember.bind(this);
    this.setSelectedMember = this.setSelectedMember.bind(this);
    this.onChangeStaffMember = this.onChangeStaffMember.bind(this);
    this.saveRequest = this.saveRequest.bind(this);
    this.saveAcademicRequest = this.saveAcademicRequest.bind(this);
    this.pushBack = this.pushBack.bind(this);

    this.state = {
      currentService: {
        service_no: "",
        service_name: "",
        description: "",
        staffMember: "",
        reason: "",
      },
      userId: "",
      academicStaff: [],
      currentMember: null,
      currentIndex: -1,
      message: "",
      isStudent: false
    };
  }

  componentDidMount() {
    this.getService(this.props.match.params.service_no);
    this.getAcademicUsers();
    console.log(this.props.match.params.service_no);
    this.setState({
      userId: AuthService.getCurrentUser().username,
      isStudent: AuthService.getCurrentUser().roles.includes("ROLE_STUDENT")
    });
  }

  getService(service_no) {
    console.log(service_no);
    ServiceDataService.get(service_no)
      .then((response) => {
        this.setState({
          currentService: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  onChangeReason(e) {
    const reason = e.target.value;

    this.setState(function (prevState) {
      return {
        currentService: {
          ...prevState.currentService,
          reason: reason,
        },
      };
    });
  }

  onChangeStaffMember(e) {
    const staffId = e.target.value;

    this.setState(function (prevState) {
      return {
        currentService: {
          ...prevState.currentService,
          staffId: staffId,
        },
      };
    });
    console.log(this.state.currentService);
  }

  getAcademicUsers() {
    UserService.getallAcademic()
      .then((response) => {
        this.setState({
          academicStaff: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  setSelectedMember(member, index) {
    this.setState({
      currentMember: member,
      currentIndex: index,
    });
  }

  saveRequest() {
    console.log(this.state.userId);
    ServReqService.create(
      this.state.userId,
      this.state.currentService.service_no,
      this.state.currentService.staffId,
      this.state.currentService.reason
    )
      .then(response => {
        this.setState({
          currentService: response.data,
          message: "The Request was submitted successfully!",
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        this.setState({
          message: "The Request cannot be submitted!",
          submitted: false
        });
        console.log(e);
      });
    // this.pushBack();
  }

  saveAcademicRequest() {
    console.log(this.state.userId);
    AcaServReqService.create(
      this.state.userId,
      this.state.currentService.service_no,
      this.state.currentService.reason
    )
      .then(response => {
        this.setState({
          currentService: response.data,
          message: "The Request was submitted successfully!",
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        this.setState({
          message: "The Request cannot be submitted!",
          submitted: false
        });
        console.log(e);
      });
    // this.pushBack();
  }

  pushBack() {
    this.props.history.push('/view-items');
  }

  render() {
    const { currentService, academicStaff } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <div className="edit-form">
              <h4>Request Service</h4>
              <hr />
              <form>
                <div className="form-group">
                  <label htmlFor="service_no">Service Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="service_no"
                    value={currentService.service_no}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="service_name">Service Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="service_name"
                    value={currentService.service_name}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    rows="5"
                    type="text"
                    className="form-control"
                    id="description"
                    value={currentService.description}
                    disabled
                  />
                </div>
                {this.state.isStudent && (
                  <div>
                    <label htmlFor="description">Relevent Staff Member</label>
                    <div className="input-group mb-3">
                      <select
                        className="custom-select"
                        id="inputGroupSelect02"
                        onChange={this.onChangeStaffMember}>
                        <option defaultValue>Choose...</option>
                        {academicStaff &&
                          academicStaff.map((member, index) => (
                            <option
                              onClick={() => this.setSelectedMember(member, index)}
                              key={index}
                              value={member.username}
                            >
                              {member.username}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>)}
                <label htmlFor="description">Reason for the Request</label>
                <div className="input-group mb-3">
                  <div className="input-group-prepend"></div>
                  <textarea
                    rows="4"
                    type="text"
                    className="form-control"
                    id="reason"
                    value={currentService.reason || ""}
                    onChange={this.onChangeReason}
                  />
                </div>
              </form>

              <Link to={"/view-services"}>
                <button className="btn btn-secondary mr-2">Back</button>
              </Link>
              <button
                type="submit"
                className="btn btn-success"
                disabled={(this.state.message ? true : false)}
                onClick={this.state.isStudent ? this.saveRequest : this.saveAcademicRequest}
              >
                Confirm Request
              </button>

              {this.state.message && (
                <div className="form-group">
                  <div
                    className={
                      this.state.submitted
                        ? "alert alert-success"
                        : "alert alert-danger"
                    }
                    role="alert"
                  >
                    <p>{this.state.message}</p>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    );
  }
}
