import React,{Component} from 'react';
import {Navbar, Nav, Col, Grid, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import Logo from './Logo';

export default class Header extends Component {
    render() {
        const {auth: {guest, user, profile}} = this.props;
        return (
            <Navbar className="navbar-custom">
                <Col md={10} mdOffset={1}>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">
                                <Logo />
                            </a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavItem eventKey={4} href="#/posts"><i className="icon-notebook"/> Posts</NavItem>
                            <NavItem eventKey={4} href="#/posts/create"><i className="icon-plus"/> New post</NavItem>
                            <NavItem eventKey={4} href="https://github.com/thanhtungdp/react-redux-firebase-blog"><i className="fa fa-github"/> Github</NavItem>
                            <NavItem eventKey={4} href="https://github.com/thanhtungdp/redux-500api"><i className="icon-layers"/> Starter kit</NavItem>
                        </Nav>
                        { guest ?
                            <Nav pullRight>
                                <NavItem eventKey={2} href="#/auth/login"><i className="icon-login"></i> Login</NavItem>
                                <NavItem eventKey={1} href="#/auth/register"><i className="icon-user-follow"></i> Register</NavItem>
                            </Nav> :
                            profile.updated_at?
                            <Nav pullRight>
                                <NavItem eventKey={2} href="#/auth/profile"><i className="icon-user"></i> {profile.first_name?profile.first_name:'No name'}</NavItem>
                                <NavItem eventKey={3} href="#/auth/logout">Logout <i className="icon-login"></i></NavItem>
                            </Nav>
                            :null
                        }
                    </Navbar.Collapse>
                </Col>
            </Navbar>
        )
    }
}
