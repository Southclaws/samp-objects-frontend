import * as React from "react";
import { Thumbnail } from "react-bootstrap";
import "./Thumb.css";
import { Button } from "@blueprintjs/core";
// import { LinkContainer } from "react-router-bootstrap";

interface ThumbProps {
    username: string;
    id: string;
}

interface ThumbState {}

export class Thumb extends React.Component<ThumbProps, ThumbState> {
    // <LinkContainer
    //     to={"/" + this.props.username + "/" + this.props.id}
    // >
    // </LinkContainer>
    render() {
        return (
            <Thumbnail src="http://via.placeholder.com/200x200">
                <div className="text-center">
                    <Button iconName="pt-icon-download" className="">
                        Download
                    </Button>
                    <Button iconName="pt-icon-add-to-artifact" className="">
                        Favourite
                    </Button>
                </div>
            </Thumbnail>
        );
    }
}
