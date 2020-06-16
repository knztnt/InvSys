import React, { Component } from "react";
import ServiceDataService from '../../services/service.service';

export default class UpdateService extends Component {
    constructor(props) {
        super(props);
        // this.onChangeNumber = this.onChangeNumber.bind(this);
        // this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeAvailability = this.onChangeAvailability.bind(this);
        this.getService = this.getService.bind(this);
        this.updateService = this.updateService.bind(this);
        this.deleteService = this.deleteService.bind(this);

        this.state = {
            currentService: {
                service_no: "",
                service_name: "",
                description: "",
                availability: undefined
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getService(this.props.match.params.service_no);
        console.log(this.props.match.params.service_no);
    }

    getService(service_no) {
        console.log(service_no);
        ServiceDataService.get(service_no)
            .then(response => {
                this.setState({
                    currentService: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    onChangeAvailability(e) {
        const availability = e.target.value;
        console.log(availability);
        this.setState(function (prevState) {
            return {
                currentService: {
                    ...prevState.currentService,
                    availability: availability
                }
            };
        });
    }

    onChangeDescription(e) {
        const description = e.target.value;

        this.setState(function (prevState) {
            return {
                currentService: {
                    ...prevState.currentService,
                    description: description
                }
            };
        });
    }

    updateService() {
        console.log(this.state.currentService);
        ServiceDataService.update(
            this.state.currentService.service_no,
            this.state.currentService
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The Service was updated successfully!"
                });
                this.props.history.push('/view-services')
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteService() {
        ServiceDataService.delete(this.state.currentService.service_no)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/view-services')
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {

        const { currentService } = this.state;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <div className="edit-form">
                            <h4>Update Service</h4>
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
                                        onChange={this.onChangeDescription}
                                    />
                                </div>
                                {/* <div className="form-group">
                                    <label htmlFor="availability">Availability</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="availability"
                                        value={currentService.availability || ""}
                                        onChange={this.onChangeAvailability}
                                    />
                                </div> */}
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
                                        <option defaultValue>Choose..</option>
                                        <option value="true">Available</option>
                                        <option value="false">Not Available</option>
                                    </select>
                                </div>
                            </form>


                            <button
                                className="btn btn-danger mr-2"
                                onClick={this.deleteService}
                            >
                                Delete Service
                            </button>

                            <button
                                type="submit"
                                className="btn btn-success"
                                onClick={this.updateService}
                            >
                                Update Service
                            </button>
                            <p>{this.state.message}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}