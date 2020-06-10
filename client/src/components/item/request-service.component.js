import React, { Component } from "react";
import ServiceDataService from "../../services/service.service";
import UserService from "../../services/user-role.service";
import { Link } from "react-router-dom";

export default class RequestService extends Component {
  constructor(props) {
    super(props);
    this.onChangeReason = this.onChangeReason.bind(this);
    this.getService = this.getService.bind(this);
    this.getAcademicUsers = this.getAcademicUsers.bind(this);
    this.setSelectedMember = this.setSelectedMember.bind(this);

    this.state = {
      currentService: {
        service_no: "",
        service_name: "",
        description: "",
        staffMember: "",
        reason: "",
      },
      academicStaff: [],
      currentMember: null,
      currentIndex: -1,
      message: "",
    };
  }

  componentDidMount() {
    this.getService(this.props.match.params.service_no);
    this.getAcademicUsers();
    console.log(this.props.match.params.service_no);
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
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    value={currentService.description}
                    disabled
                  />
                </div>
                <label htmlFor="description">Relevent Staff Member</label>
                <div className="input-group mb-3">
                  <select className="custom-select" id="inputGroupSelect02">
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
                <label htmlFor="description">Reason for the Request</label>
                <div className="input-group mb-3">
                  <div className="input-group-prepend"></div>
                  <input
                    type="text"
                    className="form-control"
                    id="reason"
                    value={currentService.reason || ""}
                    onChange={this.onChangeReason}
                  />
                </div>
              </form>

              <Link to={"/view-services"}>
                <button className="btn btn-warning mr-2">Cancel</button>
              </Link>
              <button
                type="submit"
                className="btn btn-success"
              // onClick={this.updateItem}
              >
                Confirm Request
              </button>
              <p>{this.state.message}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
