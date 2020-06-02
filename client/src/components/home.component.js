import React, { Component } from "react";

import UserService from "../services/user.service";

import backImage from './Untitled.jpg';




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
                <div className="row" style={{backgroundImage:`url(${backImage})`, backgroundRepeat:'no-repeat', 
                height:'70vh', width:'100vw', backgroundSize: 'cover', backgroundPosition: ('left','top')}}>
                    {/*<div style={{height:'100%', width:'100%', backgroundColor: 'rgba:(0,0,0,0.5)'}}>*/}
                        <div className="ml-4" style={{height:'100%', width:'100%'}}>
                            <div className="row align-items-center" style={{height:'100%'}}>
                                <div className="col">
                                    <h3 className="display-4" style={{color:'#094b62'}}> Inventory Management System</h3>
                                    <p style={{color:'#094b62'}}> Department of Computer Engineering </p>
                                    <p style={{color:'#094b62'}}> Faculty of Engineering, University of Peradeniya </p>
                                </div>
                                <div className="col"></div>
                                
                            </div>
                            
                        </div>
            
                        
                    
                
                </div>
                <div className="row" style={{height:'20vh', width:'auto',backgroundColor: '#094b62'}}></div>
                
                
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