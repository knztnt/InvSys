import React, { Component } from "react";
import Service from "../../services/service.service";
import AuthService from "../../services/auth.service";

import { Link } from "react-router-dom";

export default class ServicesList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveServices = this.retrieveServices.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveService = this.setActiveService.bind(this);
    // this.removeAllServices = this.removeAllServices.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      service: [],
      currentService: null,
      currentIndex: -1,
      searchName: "",
      showNonacBoard: false,
      showAdminBoard: false,
    };
  }

  componentDidMount() {
    this.retrieveServices();
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        showNonacBoard: user.roles.includes("ROLE_NON-ACADEMIC"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN")
      });
    }
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName,
    });
  }

  retrieveServices() {
    Service.getall()
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

  refreshList() {
    this.retrieveServices();
    this.setState({
      currentService: null,
      currentIndex: -1,
    });
  }

  setActiveService(service, index) {
    this.setState({
      currentService: service,
      currentIndex: index,
    });
  }

  // removeAllServices() {
  //     ServiceDataService.deleteAll()
  //         .then(response => {
  //             console.log(response.data);
  //             this.refreshList();
  //         })
  //         .catch(e => {
  //             console.log(e);
  //         });
  // }

  searchName() {
    Service.findByName(this.state.searchName)
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

  render() {
    const {
      searchName,
      service,
      currentService,
      currentIndex,
      showAdminBoard,
      showNonacBoard
    } = this.state;

    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by Service name"
                value={searchName}
                onChange={this.onChangeSearchName}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-info"
                  type="button"
                  onClick={this.searchName}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <h4>Services</h4>

            <ul className="list-group">
              {service &&
                service.map((service, index) => (
                  <button
                    className={
                      "item-component list-group-item d-flex justify-content-between align-items-center list-group-item-action " +
                      (index === currentIndex ? "active" : "")
                    }
                    onClick={() => this.setActiveService(service, index)}
                    key={index}
                  >
                    {service.service_name}
                  </button>
                ))}
            </ul>
          </div>
          <div className="col-md-6">
            {currentService ? (
              <div>
                <h4>Service</h4>
                <div>
                  <label>
                    <strong>Service number:</strong>
                  </label>{" "}
                  {currentService.service_no}
                </div>
                <div>
                  <label>
                    <strong>Service name:</strong>
                  </label>{" "}
                  {currentService.service_name}
                </div>
                <div>
                  <label>
                    <strong>Description:</strong>
                  </label><br />{" "}
                  {currentService.description}
                </div>
                <br />
                <div>
                  <label>
                    <strong>Status:</strong>
                  </label>{" "}
                  {currentService.availability ? "Available" : "Not available"}
                </div>
                {showAdminBoard || showNonacBoard ? (
                  <Link to={"/update-services/" + currentService.service_no}>
                    <button
                      type="button"
                      className="btn btn-warning"
                    >
                      Update Service
                    </button>
                  </Link>
                ) : (
                    <Link to={"/service/request/" + currentService.service_no}>
                      <button
                        type="button"
                        className="btn btn-info"
                        disabled={(currentService.availability === false ? true : false)}
                      >
                        Request Service
                      </button>
                    </Link>
                  )}
              </div>
            ) : (
                <div>
                  <br />
                  <p>Please click on a Service...</p>
                </div>
              )}
          </div>
        </div>
      </div>
    );
  }
}
