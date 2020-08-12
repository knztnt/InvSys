import React, { Component } from "react";

import UserService from "../services/user.service";

import backImage from './images/landing-img.png';
import image1 from './images/component.jpg';
import image2 from './images/services.jpg';
import image3 from './images/track.jpg';
import image4 from './images/updates.jpg';


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
                <div className="row"
                    style={{
                        backgroundImage: `url(${backImage})`,
                        backgroundRepeat: 'no-repeat',
                        height: '60vh',
                        width: 'auto',
                        backgroundSize: 'cover'
                    }}>
                    <div className="ml-5" style={{ height: '100%', width: '100%' }}>
                        <div className="row align-items-center text-primary" style={{ height: '100%', width: '50%' }}>
                            <span>
                                <h3 className="display-4">
                                    Inventory Management <br />
                                    System
                                </h3>
                                <p>
                                    Department of Computer Engineering <br />
                                    Faculty of Engineering, University of Peradeniya
                                </p>
                            </span>
                        </div>
                    </div>
                </div>

                <div className="row align-items-center">
                    <div className="col-sm-3 p-3 text-center text-primary">
                        <img src={image1} height="120" width="120" alt="home-icon"></img>
                        <h5><br />Borrow Components</h5>
                    </div>
                    <div className="col-sm-3 p-3 text-center text-primary">
                        <img src={image2} height="120" width="120" alt="home-icon"></img>
                        <h5><br />Request Services</h5>
                    </div>
                    <div className="col-sm-3 p-3 text-center text-primary">
                        <img src={image3} height="120" width="120" alt="home-icon"></img>
                        <h5><br />Track Deadlines</h5>
                    </div>
                    <div className="col-sm-3 p-3 text-center text-primary">
                        <img src={image4} height="120" width="120" alt="home-icon"></img>
                        <h5><br />Get Latest Inventory Updates</h5>
                    </div>
                </div>

                <div className="row home-footer" style={{ height: '20vh', width: 'auto', backgroundColor: '#094b62' }}>
                    <div className="ml-5" style={{ height: '100%', width: '100%' }}>
                        <div className="row align-items-center" style={{ height: '100%', width: '100%' }}>
                            <span style={{ color: 'white' }}>
                                <b>Contact us:</b><br />
                                1234567890<br />
                                abc@abc.com</span>
                        </div>
                    </div>
                </div>
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