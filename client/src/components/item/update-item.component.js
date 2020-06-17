import React, { Component } from "react";
import ItemDataService from '../../services/item.service';

export default class UpdateItem extends Component {
    constructor(props) {
        super(props);
        // this.onChangeNumber = this.onChangeNumber.bind(this);
        // this.onChangeName = this.onChangeName.bind(this);
        this.onChangeQuantity = this.onChangeQuantity.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.getItem = this.getItem.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);

        this.state = {
            currentItem: {
                item_no: "",
                item_name: "",
                quantity: 0,
                description: "",
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getItem(this.props.match.params.item_no);
        console.log(this.props.match.params.item_no);
    }

    getItem(item_no) {
        ItemDataService.get(item_no)
            .then(response => {
                this.setState({
                    currentItem: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    onChangeQuantity(e) {
        const quantity = e.target.value;

        this.setState(function (prevState) {
            return {
                currentItem: {
                    ...prevState.currentItem,
                    quantity: quantity
                }
            };
        });
    }

    onChangeDescription(e) {
        const description = e.target.value;

        this.setState(function (prevState) {
            return {
                currentItem: {
                    ...prevState.currentItem,
                    description: description
                }
            };
        });
    }

    updateItem() {
        console.log(this.state.currentItem);
        ItemDataService.update(
            this.state.currentItem.item_no,
            this.state.currentItem
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The Item was updated successfully!"
                });
                this.props.history.push('/view-items')
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteItem() {
        ItemDataService.delete(this.state.currentItem.item_no)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/view-items')
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentItem } = this.state;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <div className="edit-form">
                            <h4>Update Item</h4>
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
                                    <textarea
                                        rows="5"
                                        type="text"
                                        className="form-control"
                                        id="description"
                                        value={currentItem.description}
                                        onChange={this.onChangeDescription}
                                    />
                                </div>
                            </form>


                            <button
                                className="btn btn-danger mr-2"
                                onClick={this.deleteItem}
                            >
                                Delete Item
                            </button>

                            <button
                                type="submit"
                                className="btn btn-success"
                                onClick={this.updateItem}
                            >
                                Update Item
                            </button>
                            <p>{this.state.message}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}