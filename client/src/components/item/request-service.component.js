import React, { Component } from "react";
import ServiceDataService from "../../services/service.service";
import { Link } from "react-router-dom";

export default class RequestService extends Component {
  constructor(props) {
    super(props);
    // this.onChangeNumber = this.onChangeNumber.bind(this);
    // this.onChangeName = this.onChangeName.bind(this);
    this.onChangeReason = this.onChangeReason.bind(this);
    this.getService = this.getService.bind(this);
    // this.updateService = this.updateService.bind(this);
    // this.deleteService = this.deleteService.bind(this);

    this.state = {
      currentService: {
        service_no: "",
        service_name: "",
        description: "",
        staffMember: "",
        reason: "",
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getService(this.props.match.params.service_no);
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

  //   onChangeAvailability(e) {
  //     const availability = e.target.value;

  //     this.setState(function (prevState) {
  //       return {
  //         currentService: {
  //           ...prevState.currentService,
  //           availability: availability,
  //         },
  //       };
  //     });
  //   }

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

  //   updateService() {
  //     console.log(this.state.currentService);
  //     ServiceDataService.update(
  //       this.state.currentService.service_no,
  //       this.state.currentService
  //     )
  //       .then((response) => {
  //         console.log(response.data);
  //         this.setState({
  //           message: "The Service was updated successfully!",
  //         });
  //         this.props.history.push("/view-services");
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //   }

  //   deleteService() {
  //     ServiceDataService.delete(this.state.currentService.service_no)
  //       .then((response) => {
  //         console.log(response.data);
  //         this.props.history.push("/view-services");
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //   }

  render() {
    const { currentService } = this.state;

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
                <div class="input-group mb-3">
                  <select class="custom-select" id="inputGroupSelect02">
                    <option selected>Choose...</option>
                    <option value="1">Dhammika Alkaduwa</option>
                    <option value="2">Janaka Alawathugoda </option>
                    <option value="3">Sampath Deegalla</option>
                  </select>
                </div>
                <label htmlFor="description">Reason for the Request</label>
                <div class="input-group mb-3">
                  <div class="input-group-prepend"></div>
                  <input
                    type="text"
                    class="form-control"
                    id="reason"
                    value={currentService.reason}
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
