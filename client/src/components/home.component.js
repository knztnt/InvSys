import React, { Component } from "react";

import UserService from "../services/user.service";

import backImage from './images/landing-img.png';

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ""
        };
    }

    componentDidMount() {
        UserService.getPublicContent().then(
            response => {
                this.setState({
                    content: response.data
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response && error.response.data) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }


    render() {

        return (
            <div className="container-fluid">
                <div className="row landing-backdrop">
                    <div className="col-12 col-sm-4">
                        <div className="d-flex align-content-center flex-wrap text-light vh-100 ml-4">
                            <span>
                                <h3 className="display-4">
                                    Inventory Management System
                                </h3>
                                <blockquote className="blockquote">
                                    <p>
                                        Department of Computer Engineering
                                        Faculty of Engineering, University of Peradeniya
                                    </p>
                                </blockquote>
                                <hr className="bg-secondary mb-4 mt-0 d-inline-block mx-auto" style={{ 'width': '150px', 'height': '3px' }}></hr>
                                <div className="row ml-1">
                                    <a href={"/login"}>
                                        <button
                                            type="button"
                                            className="btn btn-light btn-lg">
                                            Login
                                     <i className="fas fa-sign-in-alt fa-fw"></i>
                                        </button>
                                    </a>
                                </div>
                            </span>
                        </div>
                    </div>
                    <div className="col-8 d-none d-sm-block"
                        style={{
                            backgroundImage: `url(${backImage})`,
                            backgroundRepeat: 'no-repeat',
                            height: '100vh',
                            width: 'auto',
                            backgroundSize: 'cover'
                        }}>
                    </div>
                </div>


                <div className="row align-items-center">
                    <div className="col-12 mt-5">
                        <div className="col-12 p-3 text-center text-info">
                            <h2 className="text-center display-4">The Online Inventory Management System</h2>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="container mb-5">
                            <div className="col-12">
                                <p className="text-center" style={{ fontSize: "18px" }}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br />
                                    Vivamus arcu felis bibendum ut tristique et egestas. Aliquet porttitor lacus luctus accumsan tortor. Dolor sed viverra ipsum nunc aliquet.
                                    Felis imperdiet proin fermentum leo vel orci. Hendrerit gravida rutrum quisque non tellus. Ac tortor vitae purus faucibus. Viverra accumsan in nisl nisi scelerisque eu ultrices.
                                    Laoreet sit amet cursus sit amet dictum sit amet justo. Morbi tristique senectus et netus et malesuada fames ac. Ligula ullamcorper malesuada proin libero nunc consequat interdum varius.
                                </p>
                            </div>
                        </div>
                        <div className="row mb-5">
                            <div className="col-sm-3 p-3 text-center text-info">
                                <div className="" style={{ 'fontSize': '0.6rem' }}>
                                    <i className="fas fa-microchip fa-10x m-3"></i>
                                </div>
                                <h4 className="text-center">Request Components</h4>
                            </div>
                            <div className="col-sm-3 p-3 text-center text-info">
                                <div className="" style={{ 'fontSize': '0.6rem' }}>
                                    <i className="fas fa-cogs fa-10x m-3"></i>
                                </div>
                                <h4 className="text-center">Request Services</h4>
                            </div>
                            <div className="col-sm-3 p-3 text-center text-info">
                                <div className="" style={{ 'fontSize': '0.6rem' }}>
                                    <i className="fas fa-calendar-day fa-10x m-3"></i>
                                </div>
                                <h4 className="text-center">Track Deadlines</h4>
                            </div>
                            <div className="col-sm-3 p-3 text-center text-info">
                                <div className="" style={{ 'fontSize': '0.6rem' }}>
                                    <i className="fas fa-info-circle fa-10x m-3"></i>
                                </div>
                                <h4 className="text-center">Get Latest Updates</h4>
                            </div>
                        </div>
                    </div>
                </div>

                <footer className="pt-4 row home-footer">
                    <div className="row container-fluid text-center text-light text-md-left mx-5">
                        <div className="col-12 col-md-4 mb-md-0 mb-3">
                            <h5>Contact Us</h5>
                            <hr className="bg-secondary mb-4 mt-0 d-inline-block mx-auto" style={{ 'width': '60px' }}></hr>
                            <ul className="list-unstyled">
                                <a href="tel:+94812393240" className="text-light text-decoration-none">
                                    <p><i className="fas fa-phone fa-fw"></i> Tel. 0812345678</p>
                                </a>
                                <a href="mailto:invsys@eng.pdn.ac.lk" className="text-light text-decoration-none">
                                    <p><i className="fas fa-envelope fa-fw"></i> invsys@eng.pdn.ac.lk</p>
                                </a>
                                <p><i className="fas fa-map-marker-alt fa-fw"></i> Faculty of Engineering,<br />
                                    <span className="ml-4">University of Peradeniya,</span><br />
                                    <span className="ml-4">Peradeniya 20400, Sri Lanka.</span></p>
                            </ul>
                        </div>
                        <div className="col-12 col-md-4 mb-md-0 mb-3">
                            <h5>Useful Links</h5>
                            <hr className="bg-secondary mb-4 mt-0 d-inline-block mx-auto" style={{ 'width': '60px' }}></hr>
                            <ul className="list-unstyled">
                                <blockquote className="blockquote">
                                    <li className="pb-2">
                                        <a href="http://www.ce.pdn.ac.lk/" target="blank" className="text-secondary">
                                            <h6>
                                                <i className="far fa-building fa-fw mr-1"></i>
                                                    Department Website
                                                </h6>
                                        </a>
                                    </li>
                                    <li className="pb-2">
                                        <a href="http://eng.pdn.ac.lk/" target="blank" className="text-secondary">
                                            <h6>
                                                <i className="fas fa-globe fa-fw mr-1"></i>
                                                    Faculty Website
                                            </h6>
                                        </a>
                                    </li>
                                    <li className="pb-2">
                                        <a href="https://aces.ce.pdn.ac.lk/" target="blank" className="text-secondary">
                                            <h6>
                                                <i className="fas fa-users fa-fw mr-1"></i>
                                                     ACES
                                            </h6>
                                        </a>
                                    </li>
                                </blockquote>
                            </ul>
                        </div>
                        <div className="col-12 col-md-4 mb-md-0">
                            <h5>Visit Us</h5>
                            <hr className="bg-secondary mb-4 mt-0 d-inline-block mx-auto" style={{ 'width': '60px' }}></hr>
                            <div className="m-2">
                                <iframe title="location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d494.73483926590507!2d80.59112873164031!3d7.254642164071207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae368d4d8ff2d7b%3A0xc4bb2a3c76b588ac!2sDepartment%20of%20Computer%20Engineering!5e0!3m2!1sen!2slk!4v1597256835883!5m2!1sen!2slk" width="300" height="200" frameBorder="0" style={{ 'border': '0' }} allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>



            /*<div className="container-fluid" style={{height:'100vh', width:'100vw'}}>

                

                {/*<div className="row" >
                    <div >
                        <div style={{height:'100%', width:'100%', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                            
                            <div className="row" style={{backgroundPositionY: 'center'}}>
                                <h3 className="display-4" style={{color:'white'}}>Inventory Management System</h3> 
                            </div>

                {/*<div className="row justify-content-md-center"> 
                    <div className="jumbotron mt-5"  > 
                        
                        {/*}                     
                            <p> 
                                Department of Computer Engineering
                            </p>
                            <p> 
                                Faculty of Engineering, University of Peradeniya 
                            </p>
                            <hr className="my-4" />
                            <p className="lead">
                                Some ABOUT content should be added
                            </p>

                            {/* dynamic content from server 
                            <p>{this.state.content}</p>
                        
                        {/* <p className="lead">
                            <a className="btn btn-primary btn-lg" href="/login" role="button">
                                Login
                             </a>
                        </p>  
                        </div>
                </div>
            </div> */

        );
    }
}