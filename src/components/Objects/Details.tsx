import * as React from "react";
import { Grid, Row, Col } from "react-bootstrap";

interface DetailsProps {
    match: { params: { userName: string; objectName: string } };
}

interface DetailsState {}

export class Details extends React.Component<DetailsProps, DetailsState> {
    render() {
        return (
            <Grid>
                <Row>
                    <Col>
                        Object Details for {this.props.match.params.objectName}{" "}
                        by {this.props.match.params.userName}
                    </Col>
                </Row>
            </Grid>
        );
    }
}
