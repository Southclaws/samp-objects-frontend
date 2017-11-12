import * as React from "react";
import { Grid, Row, Col, Label, Alert, Panel, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

import { ENDPOINT } from "../../App";
import { ObjectPackage } from "../../types/Object";

interface DetailsProps {
    match: { params: { userName: string; objectName: string } };
}

interface DetailsState {
    object?: ObjectPackage;
}

export class Details extends React.Component<DetailsProps, DetailsState> {
    constructor(props: DetailsProps) {
        super(props);
    }

    async componentDidMount() {
        let response = await fetch(
            ENDPOINT +
                "/v0/objects/" +
                this.props.match.params.userName +
                "/" +
                this.props.match.params.objectName,
            {
                method: "get",
                credentials: "include",
                mode: "cors",
                headers: [["Content-Type", "application/json"]]
            }
        );
        let object = await response.json();
        this.setState({ object: object });
    }

    getImageURLs() {
        let id: string;
        let images: string[];
        if (this.state.object !== undefined) {
            if (this.state.object.id === undefined) {
                return;
            }
            if (this.state.object.images === undefined) {
                return;
            }
            id = this.state.object.id;
            images = this.state.object.images;
        } else {
            return;
        }

        let urls: string[] = [];

        images.forEach(imageName => {
            urls.push(ENDPOINT + "/v0/images/" + id + "/" + imageName);
        });

        return urls;
    }

    render() {
        if (this.state === null) {
            return <Alert>Loading...</Alert>;
        } else if (this.state.object === undefined) {
            return <Alert>Loading...</Alert>;
        } else {
            let images = this.getImageURLs();
            if (images === undefined) {
                images = [];
            }

            return (
                <Grid fluid>
                    <Row>
                        <Col xs={12} lg={12}>
                            <h2>
                                <Link
                                    to={
                                        "/" +
                                        this.props.match.params.userName +
                                        "/" +
                                        this.props.match.params.objectName
                                    }
                                >
                                    <strong>
                                        {this.props.match.params.userName}
                                        /{this.props.match.params.objectName}
                                    </strong>
                                </Link>
                            </h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} lg={12}>
                            {this.state.object.tags === null ? (
                                <Label>(no tags)</Label>
                            ) : (
                                <div>
                                    {this.state.object.tags.map(
                                        (
                                            value: string,
                                            index: number,
                                            array: string[]
                                        ) => {
                                            return (
                                                <span key={index}>
                                                    {" "}
                                                    <Label>{value}</Label>{" "}
                                                </span>
                                            );
                                        }
                                    )}
                                </div>
                            )}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} lg={6}>
                            <Panel>
                                <h4>Description</h4>
                                <p>{this.state.object.description}</p>
                            </Panel>
                        </Col>
                        <Col xs={12} lg={6}>
                            <Panel>
                                <h4>Images</h4>
                                {images.map(
                                    (
                                        value: string,
                                        index: number,
                                        array: string[]
                                    ) => {
                                        return (
                                            <div key={index}>
                                                <Image src={value} responsive />
                                            </div>
                                        );
                                    }
                                )}
                            </Panel>
                        </Col>
                    </Row>
                </Grid>
            );
        }
    }
}
