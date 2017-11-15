import * as React from "react";
import { Grid, Row, Col, Alert, Panel } from "react-bootstrap";
import { Link } from "react-router-dom";

import { ENDPOINT } from "../App";
import { User } from "../types/User";
import { Objects } from "./Objects";

interface ProfileProps {
    match: { params: { userName: string } };
}

interface ProfileState {
    userName: string;
    user?: User;
    error?: string;
}

export class Profile extends React.Component<ProfileProps, ProfileState> {
    constructor(props: ProfileProps) {
        super(props);

        this.state = {
            userName: props.match.params.userName
        };
    }

    async componentDidMount() {
        let user: User;
        try {
            user = await this.getUser(this.state.userName);
        } catch (e) {
            this.setState({
                error: "Failed to get user: " + e
            });
            return;
        }

        this.setState({ user: user });
    }

    async getUser(userName: string) {
        let resp = await fetch(ENDPOINT + "/v0/users/" + userName, {
            method: "get",
            mode: "cors",
            credentials: "include",
            headers: [["Content-Type", "application/json"]]
        });

        switch (resp.status) {
            case 200:
                break;

            case 404:
                throw "User not found";

            default:
                throw "Unknown error: " + resp.statusText;
        }

        return (await resp.json()) as User;
    }

    render() {
        if (this.state.error !== undefined) {
            return (
                <Grid>
                    <Row>
                        <Col xs={12} lg={12}>
                            <Alert bsStyle="danger">
                                <p>An error occurred:</p>
                                <p>{this.state.error}</p>
                            </Alert>
                        </Col>
                    </Row>
                </Grid>
            );
        }

        if (this.state.user === undefined) {
            console.log("this.state.user undefined");
            return null;
        }

        return (
            <Grid>
                <Row>
                    <Col xs={12} lg={12}>
                        <h2>
                            <Link to={"/" + this.props.match.params.userName}>
                                <strong>
                                    {this.props.match.params.userName}
                                </strong>
                            </Link>
                        </h2>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} lg={12}>
                        <Panel>
                            <h3>Objects</h3>
                            <Objects
                                userName={this.state.userName}
                                category=""
                                tags={[]}
                                sort=""
                            />
                        </Panel>
                    </Col>
                </Row>
            </Grid>
        );
    }
}
