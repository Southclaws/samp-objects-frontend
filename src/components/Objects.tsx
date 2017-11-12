import * as React from "react";
import { Grid, Row, Col, Alert } from "react-bootstrap";

import { Thumb } from "./Objects/Thumb";
import { ObjectPackage } from "../types/Object";
import { ENDPOINT } from "../App";
interface ObjectsProps {}

interface ObjectsState {
    objects: ObjectPackage[];
}

function ObjectRow(props: { key: number; object: ObjectPackage }) {
    return (
        <Col xs={12} md={2}>
            <Thumb object={props.object} />
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
        let response = await fetch(ENDPOINT + "/v0/objects", {
            method: "get",
            credentials: "include",
            mode: "cors",
            headers: [["Content-Type", "application/json"]]
        });
        let objects = await response.json();
        console.log(objects);
        this.setState({ objects: objects });
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
                                return <ObjectRow key={index} object={value} />;
                            }
                        )}
                    </Row>
                </Grid>
            );
        }
    }
}
