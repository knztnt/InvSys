import React, { Component } from "react";
import ItemDataService from '../../services/item.service';


export default class AddItem extends Component {
    constructor(props) {
        super(props);
        this.onChangeNumber = this.onChangeNumber.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.saveItem = this.saveItem.bind(this);
        this.newItem = this.newItem.bind(this);

        this.state = {
            item_no: "",
            item_name: "",
            quantity: 0,
            description: "",

            submitted: false
        };
    }

    onChangeNumber(e) {
        this.setState({
            item_no: e.target.value
        });
    }

    onChangeName(e) {
        this.setState({
            item_name: e.target.value
        });
    }

    onChangeQuantity(e) {
        this.setState({
            quantity: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    saveItem() {
        ItemDataService.create(
            this.state.item_no,
            this.state.item_name,
            this.state.quantity,
            this.state.description,
        )
            .then(response => {
                this.setState({
                    item_no: response.data.item_no,
                    item_name: response.data.item_name,
                    quantity: response.data.quantity,
                    description: response.data.description,

                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newItem() {
        this.setState({
            item_no: "",
            item_name: "",
            quantity: 0,
            description: "",

            submitted: false
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <h4>Add New Item</h4>
                        <hr />
                        <div className="submit-form">
                            {this.state.submitted ? (
                                <div>
                                    <h4>You submitted successfully!</h4>
                                    <button className="btn btn-success" onClick={this.newItem}>
                                        Add
                                    </button>
                                </div>
                            ) : (
                                    <div>
                                        <div className="form-group">
                                            <label htmlFor="item_name">Item Number</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="item_no"
                                                required
                                                value={this.state.item_no}
                                                onChange={this.onChangeNumber}
                                                name="item_no"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="item_name">Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="item_name"
                                                required
                                                value={this.state.item_name}
                                                onChange={this.onChangeName}
                                                name="item_name"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="item_name">Quantity</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                item_no="quantity"
                                                required
                                                value={this.state.quantity}
                                                onChange={this.onChangeQuantity}
                                                name="quantity"
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

                                        <button onClick={this.saveItem} className="btn btn-success">
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
