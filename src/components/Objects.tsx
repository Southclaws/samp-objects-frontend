import * as React from "react";
import { Grid, Row, Col } from "react-bootstrap";

import { ObjectData } from "./Objects/Details";
import { Thumb } from "./Objects/Thumb";

interface ObjectsProps {}

interface ObjectsState {
    objects: ObjectData[];
}

function ObjectRow(props: { key: number }) {
    return (
        <Col xs={12} md={2}>
            <Thumb username="Southclaws" id="someobjectid" />
        </Col>
    );
}

export class Objects extends React.Component<ObjectsProps, ObjectsState> {
    constructor(props: ObjectsProps) {
        super(props);
        this.state = {
            objects: [
                { owner: "Southclaws", id: "id" },
                { owner: "Southclaws", id: "id" },
                { owner: "Southclaws", id: "id" }
            ]
        };
    }

    componentDidMount() {
        //
    }

    render() {
        return (
            <Grid fluid>
                <Row>
                    {this.state.objects.map(
                        (
                            value: ObjectData,
                            index: number,
                            array: ObjectData[]
                        ) => {
                            return <ObjectRow key={index} />;
                        }
                    )}
                </Row>
            </Grid>
        );
    }
}
