import * as React from "react";
import { Grid, Row, Col, Alert } from "react-bootstrap";
import cookie from "react-cookies";

import { Thumb } from "./Objects/Thumb";
import { ObjectPackage } from "../types/Object";
import { ENDPOINT } from "../App";

interface ObjectsProps {
    userName: string;
    category: string;
    tags: string[];
    sort: string;
}

interface ObjectsState {
    objects: ObjectPackage[];
}

function ObjectRow(props: {
    key: number;
    object: ObjectPackage;
    onRate(rating: number): void;
}) {
    return (
        <Col xs={12} md={2}>
            <Thumb object={props.object} onRate={props.onRate} />
        </Col>
    );
}

export class Objects extends React.Component<ObjectsProps, ObjectsState> {
    constructor(props: ObjectsProps) {
        super(props);
        this.state = {
            objects: []
        };
    }

    async componentDidMount() {
        let query: string[] = [];

        if (this.props.userName !== "") {
            query.push("userName=" + this.props.userName);
        }
        if (this.props.category !== "") {
            query.push("category=" + this.props.category);
        }
        if (this.props.tags !== undefined) {
            if (this.props.tags.length > 0) {
                query.push("tags=" + this.props.tags.join(","));
            }
        }

        let queryString = query.join("&");

        let response = await fetch(ENDPOINT + "/v0/objects?" + queryString, {
            method: "get",
            credentials: "include",
            mode: "cors",
            headers: [["Content-Type", "application/json"]]
        });
        let objects = await response.json();
        console.log(objects);
        this.setState({ objects: objects });
    }

    async onRate(rate: number, object: ObjectPackage) {
        let resp: Response;

        try {
            resp = await fetch(ENDPOINT + "/v0/ratings/" + object.id, {
                method: "post",
                credentials: "include",
                mode: "cors",
                headers: [
                    ["Content-Type", "application/json"],
                    ["Authorization", "Bearer " + cookie.load("token")]
                ],
                body: JSON.stringify({
                    value: rate
                })
            });
        } catch (e) {
            console.log("failed to post ratings endpoint: " + e);
            return;
        }

        switch (resp.status) {
            case 201:
                // added rating
                break;
            case 202:
                // removed rating
                break;
            case 400 || 500:
                console.log((await resp.json()).error);
                break;

            default:
                break;
        }
    }

    render() {
        if (this.state.objects === null) {
            return (
                <Grid fluid>
                    <Row>
                        <Col xs={12} md={6} mdOffset={3}>
                            <Alert>There are no objects listed.</Alert>
                        </Col>
                    </Row>
                </Grid>
            );
        } else {
            return (
                <Grid fluid>
                    <Row>
                        {this.state.objects.map(
                            (
                                value: ObjectPackage,
                                index: number,
                                array: ObjectPackage[]
                            ) => {
                                return (
                                    <ObjectRow
                                        key={index}
                                        object={value}
                                        onRate={props => {
                                            this.onRate(props, value);
                                        }}
                                    />
                                );
                            }
                        )}
                    </Row>
                </Grid>
            );
        }
    }
}
