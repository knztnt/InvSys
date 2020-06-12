import React, { Component } from "react";
import ItemDataService from "../../services/item.service";
import UserService from "../../services/user-role.service";
import ItemReqService from "../../services/student-item-req.service";
import AcaItemReqService from "../../services/academic-item-req.service";
import AuthService from "../../services/auth.service";
import { Link } from "react-router-dom";

export default class RequestItem extends Component {
  constructor(props) {
    super(props);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.onChangeReason = this.onChangeReason.bind(this);
    this.getItem = this.getItem.bind(this);
    this.getAcademicUsers = this.getAcademicUsers.bind(this);
    this.setSelectedMember = this.setSelectedMember.bind(this);
    this.onChangeStaffMember = this.onChangeStaffMember.bind(this);
    this.saveRequest = this.saveRequest.bind(this);
    this.saveAcademicRequest = this.saveAcademicRequest.bind(this);
    this.pushBack = this.pushBack.bind(this);

    this.state = {
      currentItem: {
        item_no: "",
        item_name: "",
        quantity: 0,
        description: "",
        staffId: "",
        reason: "",
      },
      userId: "",
      academicStaff: [],
      staffMember: null,
      currentIndex: -1,
      message: "",
      isStudent: false
    };
  }

  componentDidMount() {
    this.getItem(this.props.match.params.item_no);
    this.getAcademicUsers();
    console.log(this.props.match.params.item_no);
    this.setState({
      userId: AuthService.getCurrentUser().username,
      isStudent: AuthService.getCurrentUser().roles.includes("ROLE_STUDENT")
    });
  }

  getItem(item_no) {
    ItemDataService.get(item_no)
      .then((response) => {
        this.setState({
          currentItem: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  onChangeQuantity(e) {
    const quantity = e.target.value;

    this.setState(function (prevState) {
      return {
        currentItem: {
          ...prevState.currentItem,
          quantity: quantity,
        },
      };
    });
  }

  onChangeReason(e) {
    const reason = e.target.value;

    this.setState(function (prevState) {
      return {
        currentItem: {
          ...prevState.currentItem,
          reason: reason,
        },
      };
    });
  }

  onChangeStaffMember(e) {
    const staffId = e.target.value;

    this.setState(function (prevState) {
      return {
        currentItem: {
          ...prevState.currentItem,
          staffId: staffId,
        },
      };
    });
    console.log(this.state.currentItem);
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
      staffMember: member,
      currentIndex: index,
    });
  }

  saveRequest() {
    console.log(this.state.userId);
    ItemReqService.create(
      this.state.userId,
      this.state.currentItem.item_no,
      this.state.currentItem.item_name,
      this.state.currentItem.quantity,
      this.state.currentItem.description,
      this.state.currentItem.staffId,
      this.state.currentItem.reason
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
    AcaItemReqService.create(
      this.state.userId,
      this.state.currentItem.item_no,
      this.state.currentItem.item_name,
      this.state.currentItem.quantity,
      this.state.currentItem.description,
      this.state.currentItem.reason
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
    const { currentItem, academicStaff } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <div className="edit-form">
              <h4>Request Item</h4>
              <hr />
              <form>
                <div className="form-group">
                  <label htmlFor="item_no">Item Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="item_no"
                    value={currentItem.item_no}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="item_name">Item Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="item_name"
                    value={currentItem.item_name}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="quantity">Quantity</label>
                  <input
                    type="number"
                    className="form-control"
                    id="quantity"
                    value={currentItem.quantity}
                    onChange={this.onChangeQuantity}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    value={currentItem.description}
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
                              onClick={() => { this.setSelectedMember(member, index); }}
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
                  <input
                    type="text"
                    className="form-control"
                    id="reason"
                    value={currentItem.reason || ""}
                    onChange={this.onChangeReason}
                  />
                </div>
              </form>
              <Link to={"/view-items"}>
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

              {this.state.submitted && (
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
      </div >
    );
  }
}
