import * as React from "react";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

import { User } from "../types/User";

interface Props {
    user?: User;
}

interface State {}

export class Navigation extends React.Component<Props, State> {
    render() {
        return (
            <Navbar staticTop collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">SA:MP Objects</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <LinkContainer to="/upload">
                            <NavItem eventKey={1} href="#">
                                Upload
                            </NavItem>
                        </LinkContainer>
                    </Nav>
                    <Nav pullRight>
                        {this.props.user !== undefined ? (
                            <NavDropdown
                                eventKey={2}
                                title="Account"
                                id="basic-nav-dropdown"
                            >
                                <LinkContainer
                                    to={"/" + this.props.user.username}
                                >
                                    <MenuItem eventKey={2.1}>Profile</MenuItem>
                                </LinkContainer>

                                <LinkContainer to="/settings">
                                    <MenuItem eventKey={2.2}>Settings</MenuItem>
                                </LinkContainer>

                                <MenuItem divider />

                                <LinkContainer to="/logout">
                                    <MenuItem eventKey={2.3}>Log Out</MenuItem>
                                </LinkContainer>
                            </NavDropdown>
                        ) : (
                            <LinkContainer to="/register">
                                <NavItem eventKey={1} href="#">
                                    Register
                                </NavItem>
                            </LinkContainer>
                        )}
                        {this.props.user !== undefined ? null : (
                            <LinkContainer to="/login">
                                <NavItem eventKey={1} href="#">
                                    Login
                                </NavItem>
                            </LinkContainer>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
