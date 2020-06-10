import React, { Component } from "react";
import ItemDataService from "../../services/item.service";
import UserService from "../../services/user-role.service";
import { Link } from "react-router-dom";

export default class RequestItem extends Component {
  constructor(props) {
    super(props);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.onChangeReason = this.onChangeReason.bind(this);
    this.getItem = this.getItem.bind(this);
    this.getAcademicUsers = this.getAcademicUsers.bind(this);
    this.setSelectedMember = this.setSelectedMember.bind(this);

    this.state = {
      currentItem: {
        item_no: "",
        item_name: "",
        quantity: 0,
        description: "",
        reason: "",
      },
      academicStaff: [],
      currentMember: null,
      currentIndex: -1,
      message: "",
    };
  }

  componentDidMount() {
    this.getItem(this.props.match.params.item_no);
    this.getAcademicUsers();
    console.log(this.props.match.params.item_no);
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
                    value={currentItem.reason || ""}
                    onChange={this.onChangeReason}
                  />
                </div>
              </form>
              <Link to={"/view-items"}>
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
