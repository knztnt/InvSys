import React from 'react';
import { shallow, mount } from 'enzyme';
import { render } from "@testing-library/react";
import { Route, Link, MemoryRouter } from "react-router-dom"
import renderer from 'react-test-renderer';

import App from './App';
import Home from './components/home.component';
import Login from './components/login.component';
import Navbar from './components/navbar.component';
import Sidebar from "./components/sidebar.component";
import Dashboard from "./components/dashboard.component";
import Register from './components/register.component';
import { required, validatePassword, validateUsername } from './components/register.component';

describe ("Component Testing", () => {

  it("App renders without crashing", () => {
    shallow(<App />);
  });

  it("Home renders without crashing", () => {
    shallow(<Home />);
  });

  it("Login renders without crashing", () => {
    shallow(<Login />);
  });

  it("Navbar renders without crashing", () => {
    shallow(<Navbar />);
  });

  it("Navbar renders without crashing", () => {
    shallow(<Register />);
  });

  it("Sidebar renders without crashing", () => {
    shallow(<Sidebar />);
  });

  // it("Dashboard renders without crashing", () => {
  //   shallow(<Dashboard />);
  // });

  // const currentUser = {username: "testuser"};
  // const showStudentBoard = true;
  // const currentIndex = 99;

  it("renders Dashboard link", () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.find("h3").text()).toContain("Inventory Management System");
  });


})


describe("State Testing", ()=> {

  const currentUser = {roles: "ROLE_STUDENT"};
  const currentProfile = {username: ""}


  // const wrapper = shallow(<Profile />);

  // it('includes link to Dashboard', () => {
  //   const wrapper = shallow(<MemoryRouter><Sidebar /></MemoryRouter>);
  //   expect(wrapper.find(Link).props().to).toBe('./components/dashboard.component');
  //  });



  // it("Renders profile name", () => {
  //   const wrapper = shallow(<Profile />);
  //   expect(wrapper.find("#username").text()).toBe(null);
  // })


})

describe("Valid Input Testing", () => {

  it("Validate Required", () => {
      expect(required('')).toStrictEqual(
      <div className="alert alert-danger" role="alert">This field is required!</div>);
  })

  it("Validate Password Less Characters", () => {
    expect(validatePassword(
      'a')).toStrictEqual(
      <div className="alert alert-warning" role="alert">The password must be between 4 and 40 characters.</div>);
  })

  it("Validate Password More Characters", () => {
    expect(validatePassword(
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')).toStrictEqual(
      <div className="alert alert-warning" role="alert">The password must be between 4 and 40 characters.</div>);
  })

  it("Validate UserName Less Characters", () => {
    expect(validateUsername(
      'a')).toStrictEqual(
        <div className="alert alert-warning" role="alert">The username must be between 3 and 20 characters.</div>);
  })

  it("Validate Password More Characters", () => {
    expect(validateUsername(
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')).toStrictEqual(
      <div className="alert alert-warning" role="alert">The username must be between 3 and 20 characters.</div>);
  })
});
