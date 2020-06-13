import React, { Component } from "react";
import ItemRequestView from "../../services/student-item-req.service";

export default class ItemRequest extends Component {
  constructor(props) {
    super(props);

    this.retrieveServices = this.retrieveServices.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveRequest = this.setActiveRequest.bind(this);

    this.state = {
      requests: [],
      currentRequest: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    this.retrieveServices();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName,
    });
  }

  retrieveServices() {
    ItemRequestView.getall()
      .then((response) => {
        this.setState({
          requests: response.data,
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
      currentRequest: null,
      currentIndex: -1,
    });
  }

  setActiveRequest(request, index) {
    this.setState({
      currentRequest: request,
      currentIndex: index,
    });
  }

  render() {
    const { requests, currentRequest, currentIndex } = this.state;

    return (
      <div className="container">
        <div className="row justify-content-center mb-3 mt-5">
          <div className="col-md-6 ">
            <h4>ITEMS REQUEST LIST</h4>
            <div className="list-group mt-4">
              {requests &&
                requests.map((request, index) => (
                  <button
                    className={
                      "item-component list-group-item d-flex justify-content-between align-items-center list-group-item-action " +
                      (index === currentIndex ? "active" : "")
                    }
                    onClick={() => this.setActiveRequest(request, index)}
                    key={index}
                    data-toggle="modal"
                    data-target="#ModalCenter"
                  >
                    {request.item_name}
                  </button>
                ))}
            </div>
          </div>

          <div
            class="modal fade"
            id="ModalCenter"
            tabindex="-1"
            role="dialog"
            aria-labelledby="ModalCenterTitle"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="ModalLongTitle">
                    <b>Student Request for Items </b>
                  </h5>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  {currentRequest ? (
                    <div>
                      <div>
                        <label>
                          <strong>Student ID:</strong>
                        </label>{" "}
                        {currentRequest.studentId}
                      </div>
                      <div>
                        <label>
                          <strong>Request number:</strong>
                        </label>{" "}
                        {currentRequest.item_no}
                      </div>

                      <div>
                        <label>
                          <strong>Item name:</strong>
                        </label>{" "}
                        {currentRequest.item_name}
                      </div>
                      <div>
                        <label>
                          <strong>Description:</strong>
                        </label>{" "}
                        {currentRequest.description}
                      </div>
                      <div>
                        <label>
                          <strong>Quantity:</strong>
                        </label>{" "}
                        {currentRequest.quantity}
                      </div>
                      <div>
                        <label>
                          <strong>Reason: </strong>
                        </label>{" "}
                        {currentRequest.reason}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <br />
                      <p> No Request</p>
                    </div>
                  )}
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" className="btn btn-danger ">
                    Ignore
                  </button>
                  <button type="button" className="btn btn-success">
                    Accept
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
