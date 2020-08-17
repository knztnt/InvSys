import React, { Component } from "react";
import ItemDataService from "../../services/item.service";
import AuthService from "../../services/auth.service";

import { Link } from "react-router-dom";

export default class ItemsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveItems = this.retrieveItems.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveItem = this.setActiveItem.bind(this);
    // this.removeAllItems = this.removeAllItems.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      items: [],
      currentItem: null,
      currentIndex: -1,
      searchName: "",
      showNonacBoard: false,
      showAdminBoard: false,
    };
  }

  componentDidMount() {
    this.retrieveItems();

    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        showNonacBoard: user.roles.includes("ROLE_NON-ACADEMIC"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName,
    });
  }

  retrieveItems() {
    ItemDataService.getall()
      .then((response) => {
        this.setState({
          items: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveItems();
    this.setState({
      currentItem: null,
      currentIndex: -1,
    });
  }

  setActiveItem(item, index) {
    this.setState({
      currentItem: item,
      currentIndex: index,
    });
  }

  // removeAllItems() {
  //     ItemDataService.deleteAll()
  //         .then(response => {
  //             console.log(response.data);
  //             this.refreshList();
  //         })
  //         .catch(e => {
  //             console.log(e);
  //         });
  // }

  searchName() {
    ItemDataService.findByName(this.state.searchName)
      .then(response => {
        this.setState({
          items: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchName, items, currentItem, currentIndex, showNonacBoard, showAdminBoard } = this.state;

    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search by item name"
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
            <h4>Components</h4>
            <div className="list-group">
              {items &&
                items.map((item, index) => (
                  <button
                    className={
                      "item-component list-group-item d-flex justify-content-between align-items-center list-group-item-action " +
                      (index === currentIndex ? "active" : "")
                    }
                    onClick={() => this.setActiveItem(item, index)}
                    key={index}
                  >
                    {item.item_name}
                    <span className={"badge badge-pill " + (item.quantity === 0 ? "badge-warning" : "badge-primary")}>{item.quantity}</span>
                  </button>
                ))}
            </div>
          </div>
          <div className="col-md-6">
            {currentItem ? (
              <div>
                <h4>Description</h4>
                <div>
                  <label>
                    <strong>Item number:</strong>
                  </label>{" "}
                  {currentItem.item_no}
                </div>
                <div>
                  <label>
                    <strong>Item name:</strong>
                  </label>{" "}
                  {currentItem.item_name}
                </div>
                <div>
                  <label>
                    <strong>Description:</strong>
                  </label><br />{" "}
                  {currentItem.description}
                </div>
                <br />
                <div>
                  <label>
                    <strong>Quantity:</strong>
                  </label>{" "}
                  {currentItem.quantity}
                </div>
                <div>
                  <label>
                    <strong>Status:</strong>
                  </label>{" "}
                  {currentItem.quantity === 0 ? "Not available" : "Available"}
                </div>

                {showAdminBoard || showNonacBoard ? (
                  <Link to={"/update-items/" + currentItem.item_no}>
                    <button
                      type="button"
                      className="btn btn-warning"
                    >
                      Update Item
                    </button>
                  </Link>
                ) : (
                    <Link to={"/item/request/" + currentItem.item_no}>
                      <button
                        type="button"
                        className="btn btn-info"
                        disabled={(currentItem.quantity === 0 ? true : false)}
                      >
                        Request Item
                      </button>
                    </Link>
                  )}

              </div>
            ) : (
                <div>
                  <br />
                  <p>Please click on a Item...</p>
                </div>
              )}
          </div>
        </div>
      </div>
    );
  }
}
