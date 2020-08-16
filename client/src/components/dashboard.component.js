import React, { Component } from "react";

export default class BoardUser extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    {/* main */}
                    <div className="col-12">
                        <div className="row">
                            <div className="col-12">
                                <div>
                                    <div className="card-body">
                                        <div className="mb-4">
                                            <h3 className="card-title display-4">Welcome <span className="text-primary">John Doe</span></h3>
                                            <p className="card-text">This is your dashboard. Aliquet porttitor lacus luctus accumsan tortor. Dolor sed viverra ipsum nunc aliquet.</p>
                                        </div>
                                        <hr />
                                        <div className="my-4">
                                            <div className="row">
                                                <div className="col-12 col-sm-4 mb-3">
                                                    <div className="card" style={{ 'borderColor': '#685CD6', 'height': '100%' }}>
                                                        <div className="card-body" style={{ 'color': '#685CD6' }}>
                                                            <div className="card-title">
                                                                <div className="row">
                                                                    <div className="col-5 col-sm-12 col-lg-5">
                                                                        <i className="fas fa-border-all fa-5x"></i>
                                                                    </div>
                                                                    <div className="col-7 col-sm-12 col-lg-7">
                                                                        <h4 className="display-4">4</h4>
                                                                        <p className="text-muted"> Total Requests</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <hr />
                                                            <a href="#" className="btn btn-outline-info btn-sm">View More</a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-4 mb-3">
                                                    <div className="card" style={{ 'borderColor': '#C00C84', 'height': '100%' }}>
                                                        <div className="card-body" style={{ 'color': '#C00C84' }}>
                                                            <div className="card-title">
                                                                <div className="row">
                                                                    <div className="col-5 col-sm-12 col-lg-5">
                                                                        <i className="fas fa-circle-notch fa-5x"></i>
                                                                    </div>
                                                                    <div className="col-7 col-sm-12 col-lg-7">
                                                                        <h4 className="display-4">1</h4>
                                                                        <p className="text-muted"> Pending Requests</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <hr />
                                                            <a href="#" className="btn btn-outline-danger btn-sm">View More</a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-4 mb-3">
                                                    <div className="card" style={{ 'borderColor': '#2F84B1', 'height': '100%' }}>
                                                        <div className="card-body" style={{ 'color': '#2F84B1' }}>
                                                            <div className="card-title">
                                                                <div className="row">
                                                                    <div className="col-5 col-sm-12 col-lg-5">
                                                                        <i className="fas fa-check fa-5x"></i>
                                                                    </div>
                                                                    <div className="col-7 col-sm-12 col-lg-7">
                                                                        <h4 className="display-4">3</h4>
                                                                        <p className="text-muted"> Reviewed Requests</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <hr />
                                                            <a href="#" className="btn btn-outline-secondary btn-sm">View More</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="my-4">
                                            <h4 className="card-title text-danger">Special Role Notices</h4>
                                            <div className="list-group">
                                                <div className="list-group-item list-group-item-action">
                                                    <div className="d-flex w-100 justify-content-between">
                                                        <h5 className="mb-1">Et magnis dis parturient montes</h5>
                                                        <small>3 days ago</small>
                                                    </div>
                                                    <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                                                    <small>Donec Porta.</small>
                                                </div>
                                                <div className="list-group-item list-group-item-action">
                                                    <div className="d-flex w-100 justify-content-between">
                                                        <h5 className="mb-1">Enim eu turpis egestas pretium aenean pharetra</h5>
                                                        <small>3 days ago</small>
                                                    </div>
                                                    <p className="mb-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis ut diam quam nulla porttitor massa id neque.</p>
                                                    <small>Elit Non.</small>
                                                </div>
                                                <div className="list-group-item list-group-item-action">
                                                    <div className="d-flex w-100 justify-content-between">
                                                        <h5 className="mb-1">Dictum sit amet justo donec enim diam</h5>
                                                        <small>3 days ago</small>
                                                    </div>
                                                    <p className="mb-1">Faucibus purus in massa tempor nec feugiat nisl pretium fusce. Enim eu turpis egestas pretium aenean pharetra magna.</p>
                                                    <small>Non Mipo.</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}