import * as React from "react";
import { Grid, Row, Col } from "react-bootstrap";

import { ObjectData } from "./Objects/Details";
import { Thumb } from "./Objects/Thumb";

interface ObjectsProps {}

interface ObjectsState {
    objects: ObjectData[];
}

function ObjectRow(props: { key: number; object: ObjectData }) {
    return (
        <Col xs={12} md={3}>
            <Thumb object={props.object} />
        </Col>
    );
}

export class Objects extends React.Component<ObjectsProps, ObjectsState> {
    constructor(props: ObjectsProps) {
        super(props);
        this.state = {
            objects: [
                {
                    owner: "J0shES",
                    id: "some-bullshit",
                    rating: 0.5,
                    image:
                        // tslint:disable-next-line
                        "https://media.discordapp.net/attachments/376371371795546112/376808208041508869/unknown.png?width=200&height=200"
                },
                {
                    owner: "TommyB",
                    id: "wtf",
                    rating: 3,
                    image:
                        // tslint:disable-next-line
                        "https://media.discordapp.net/attachments/376371371795546112/376802253819871233/unknown.png?width=200&height=200"
                },
                {
                    owner: "Southclaws",
                    id: "redis-statue",
                    rating: 5,
                    image:
                        // tslint:disable-next-line
                        "https://d1q6f0aelx0por.cloudfront.net/product-logos/89e5782a-76ea-4b94-a561-39e331c281a5-redis.png"
                },
                {
                    owner: "Vince0789",
                    id: "roads-ftw",
                    rating: 4.3,
                    image:
                        // tslint:disable-next-line
                        "https://cdn.discordapp.com/attachments/376371371795546112/376819755291508736/modular_roads.jpg"
                }
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
                            return <ObjectRow key={index} object={value} />;
                        }
                    )}
                </Row>
            </Grid>
        );
    }
}
