import * as React from "react";
import { Grid, Row, Col, Alert } from "react-bootstrap";

interface ProfileProps {
    match: { params: { username: string } };
}

interface ProfileState {
    username: string;
}

export class Profile extends React.Component<ProfileProps, ProfileState> {
    constructor(props: ProfileProps) {
        super(props);

        this.state = {
            username: this.props.match.params.username
        };
    }

    // async componentDidMount() {}

    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={12} lg={12}>
                        <Alert>
                            <p>User profile pages aren't quite done yet!</p>
                            <p>
                                Coming soon: Average ratings, List of objects,
                                Special badges for top users and much more!
                            </p>
                        </Alert>
                    </Col>
                </Row>
            </Grid>
        );
    }
}
