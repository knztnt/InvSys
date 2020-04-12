import React, { Component } from 'react';

class Landing extends Component {
  render() {
    return (
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="jumbotron mt-5">
            <h3 className="display-4">Inventory Management System</h3>
            <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
            <hr className="my-4" />
            <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
            <p className="lead">
              <a className="btn btn-primary btn-lg" href="/login" role="button">Login</a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
