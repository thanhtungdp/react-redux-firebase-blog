import React,{Component} from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

export default (ab,ac,ad)=> {
    return (
        <Navbar inverse>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="#">React-Bootstrap Hello</a>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>
                    <NavItem eventKey={4} href="#/protected-page">Protected Page</NavItem>
                    <NavItem eventKey={4} href="#/profile">Profile</NavItem>

                    <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                        <MenuItem eventKey={3.1}>Action</MenuItem>
                        <MenuItem eventKey={3.2}>Another action</MenuItem>
                        <MenuItem eventKey={3.3}>Something else here</MenuItem>
                        <MenuItem divider/>
                        <MenuItem eventKey={3.3}>Separated link</MenuItem>
                    </NavDropdown>
                </Nav>
                <Nav pullRight>
                    <NavItem eventKey={2} href="#/login">Login</NavItem>
                    <NavItem eventKey={1} href="#/register">Register</NavItem>
                    <NavItem eventKey={3} href="#/logout">Logout</NavItem>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
