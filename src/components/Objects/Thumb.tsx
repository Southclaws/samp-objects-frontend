import * as React from "react";
import { Thumbnail } from "react-bootstrap";
import { Button, Tooltip } from "@blueprintjs/core";
import { Link } from "react-router-dom";
import ReactStars from "react-stars";
import { Textfit } from "react-textfit";

import "./Thumb.css";
import { ObjectPackage } from "../../types/Object";
import { ENDPOINT } from "../../App";

interface ThumbProps {
    object: ObjectPackage;
}

interface ThumbState {}

export class Thumb extends React.Component<ThumbProps, ThumbState> {
    render() {
        return (
            <Thumbnail src={ENDPOINT + "/v0/images/" + this.props.object.id}>
                <div className="text-center">
                    <div>
                        <Textfit>
                            <p>
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
                        </Textfit>
                    </div>
                    <div className="pt-button-group">
                        <Tooltip
                            useSmartPositioning
                            content="Download All (coming soon!)"
                        >
                            <Button iconName="pt-icon-download" />
                        </Tooltip>
                        <Tooltip
                            useSmartPositioning
                            content="Share (coming soon!)"
                        >
                            <Button iconName="pt-icon-share" />
                        </Tooltip>
                        <Tooltip
                            useSmartPositioning
                            content="Favourite (coming soon!)"
                        >
                            <Button iconName="pt-icon-add-to-artifact" />
                        </Tooltip>
                    </div>

                    <span className="thumb-stuff-separator">---</span>

                    <Tooltip useSmartPositioning content="Rate (coming soon!)">
                        <ReactStars
                            edit={false}
                            value={2.5} // this.props.object.rating
                        />
                    </Tooltip>
                </div>
            </Thumbnail>
        );
    }
}
