import * as React from "react";
import { Thumbnail } from "react-bootstrap";
import { Button, Tooltip } from "@blueprintjs/core";
import { Link } from "react-router-dom";

import { ENDPOINT } from "../../App";
import { ObjectPackage } from "../../types/Object";
import { Rating } from "./Rating";

import "./Thumb.css";

interface ThumbProps {
    object: ObjectPackage;
    onRate(rating: number): void;
}

interface ThumbState {}

export class Thumb extends React.Component<ThumbProps, ThumbState> {
    render() {
        return (
            <Thumbnail src={ENDPOINT + "/v0/images/" + this.props.object.id}>
                <div className="text-center">
                    <div>
                        <p className="small">
                            <Link
                                to={
                                    "/" +
                                    this.props.object.owner_name +
                                    "/" +
                                    this.props.object.name
                                }
                            >
                                {this.props.object.owner_name} /{" "}
                                {this.props.object.name}
                            </Link>
                        </p>
                    </div>
                    <div className="pt-button-group">
                        {/* <Tooltip content="Download All (coming soon!)">
                            <Button iconName="pt-icon-download" />
                        </Tooltip>
                        <Tooltip content="Share (coming soon!)">
                            <Button iconName="pt-icon-share" />
                        </Tooltip> */}
                        <Tooltip content="Favourite (coming soon!)">
                            <Button iconName="pt-icon-add-to-artifact" />
                        </Tooltip>
                    </div>

                    <span className="thumb-stuff-separator">---</span>

                    <Tooltip content="Rate">
                        <Rating
                            object={this.props.object}
                            onRate={this.props.onRate}
                        />
                    </Tooltip>
                </div>
            </Thumbnail>
        );
    }
}
