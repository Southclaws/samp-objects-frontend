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
    account() {
        if (this.props.user !== undefined) {
            return (
                <NavDropdown
                    eventKey={2}
                    title="Account"
                    id="basic-nav-dropdown"
                >
                    <LinkContainer to={"/" + this.props.user.name}>
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
            );
        } else {
            return (
                <NavDropdown
                    eventKey={2}
                    title="Account"
                    id="basic-nav-dropdown"
                >
                    <LinkContainer to="/register">
                        <NavItem eventKey={2.1}>Register</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/login">
                        <NavItem eventKey={2.2}>Login</NavItem>
                    </LinkContainer>
                </NavDropdown>
            );
        }
    }

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
                            <NavItem eventKey={1}>Upload</NavItem>
                        </LinkContainer>
                        {this.account()}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
