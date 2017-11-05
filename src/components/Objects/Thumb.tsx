import * as React from "react";
import { Thumbnail, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

interface ThumbProps {
    username: string;
    id: string;
}

interface ThumbState {}

export class Thumb extends React.Component<ThumbProps, ThumbState> {
    render() {
        return (
            <Thumbnail src="http://via.placeholder.com/200x200" alt="200x200">
                <h4>Object</h4>
                <LinkContainer
                    to={"/" + this.props.username + "/" + this.props.id}
                >
                    <Button bsStyle="primary" bsSize="xsmall">
                        Get
                    </Button>
                </LinkContainer>
            </Thumbnail>
        );
    }
}
