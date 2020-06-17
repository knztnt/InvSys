import React, { Component } from "react";
import Service from "../../services/service.service";

export default class AddService extends Component {
  constructor(props) {
    super(props);
    this.onChangeNumber = this.onChangeNumber.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeAvailability = this.onChangeAvailability.bind(this);
    this.saveService = this.saveService.bind(this);
    this.newService = this.newService.bind(this);

    this.state = {
      service_no: "",
      service_name: "",
      description: "",
      availability: true,

      submitted: false,
    };
  }

  onChangeNumber(e) {
    this.setState({
      service_no: e.target.value,
    });
  }

  onChangeName(e) {
    this.setState({
      service_name: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeAvailability(e) {
    this.setState({
      availability: e.target.value,
    });
  }

  saveService() {
    Service.create(
      this.state.service_no,
      this.state.service_name,
      this.state.description,
      this.state.availability
    )
      .then((response) => {
        this.setState({
          service_no: response.data.service_no,
          service_name: response.data.service_name,
          description: response.data.description,
          availability: response.data.availability,

          submitted: true,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newService() {
    this.setState({
      service_no: "",
      service_name: "",
      description: "",
      availability: true,

      submitted: false,
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <h4>Add New Service</h4>
            <hr />
            <div className="submit-form">
              {this.state.submitted ? (
                <div>
                  <h4>You submitted successfully!</h4>
                  <button className="btn btn-success" onClick={this.newService}>
                    Add
                  </button>
                </div>
              ) : (
                  <div>
                    <div className="form-group">
                      <label htmlFor="item_name">Service Number</label>
                      <input
                        type="text"
                        className="form-control"
                        id="service_no"
                        required
                        value={this.state.service_no}
                        onChange={this.onChangeNumber}
                        name="service_no"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="item_name">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="service_name"
                        required
                        value={this.state.service_name}
                        onChange={this.onChangeName}
                        name="service_name"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="description">Description</label>
                      <textarea
                        rows="5"
                        type="text"
                        className="form-control"
                        id="description"
                        required
                        value={this.state.description}
                        onChange={this.onChangeDescription}
                        name="description"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="description">Availability</label>
                      <select
                        type="text"
                        className="form-control"
                        id="availability"
                        required
                        value={this.state.availability}
                        onChange={this.onChangeAvailability}
                        name="availability"
                      >
                        <option value="true">Available</option>
                        <option value="false">Not Available</option>
                      </select>
                    </div>

                    <button
                      onClick={this.saveService}
                      className="btn btn-success"
                    >
                      Submit
                  </button>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
