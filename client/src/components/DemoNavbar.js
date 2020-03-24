import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';




const DemoNavbar = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);


    return (
        <>
            <div>
                <Navbar className="navbar navbar-expand-lg navbar-dark bg-primary" expand="md">
                    <NavbarBrand className="navbar-brand" href="/">InvSys</NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="mr-auto navbar" navbar>
                            <NavItem className="">
                                <NavLink href="/contact/">Contact Us</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/about/">About</NavLink>
                            </NavItem>
                            {/* <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Useful Links
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        Option 1
                                    </DropdownItem>
                                    <DropdownItem>
                                        Option 2
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown> */}
                        </Nav>
                        {/* <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/about/">About</NavLink>
                            </NavItem>
                        </Nav> */}
                    </Collapse>
                </Navbar>
            </div>
        </>
    );

}

export default DemoNavbar;