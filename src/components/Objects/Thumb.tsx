import * as React from "react";
import { Thumbnail } from "react-bootstrap";
import "./Thumb.css";
import { Button, Tooltip } from "@blueprintjs/core";
import ReactStars from "react-stars";

import { ObjectData } from "./Details";

interface ThumbProps {
    object: ObjectData;
}

interface ThumbState {}

export class Thumb extends React.Component<ThumbProps, ThumbState> {
    // <LinkContainer
    //     to={"/" + this.props.username + "/" + this.props.id}
    // >
    // </LinkContainer>
    render() {
        return (
            <Thumbnail
                bsSize="xs"
                width={200}
                height={200}
                src={this.props.object.image}
            >
                <div className="text-center">
                    <p>
                        {this.props.object.owner}/{this.props.object.id}
                    </p>
                    <div className="pt-button-group">
                        <Tooltip content="Details">
                            <Button iconName="pt-icon-search-template" />
                        </Tooltip>
                        <Tooltip content="Download">
                            <Button iconName="pt-icon-download" />
                        </Tooltip>
                        <Tooltip content="Share">
                            <Button iconName="pt-icon-share" />
                        </Tooltip>
                        <Tooltip content="Favourite">
                            <Button iconName="pt-icon-add-to-artifact" />
                        </Tooltip>
                    </div>

                    <span className="thumb-stuff-separator">---</span>

                    <Tooltip content="Rate">
                        <ReactStars
                            edit={false}
                            value={this.props.object.rating}
                        />
                    </Tooltip>
                </div>
            </Thumbnail>
        );
    }
}
