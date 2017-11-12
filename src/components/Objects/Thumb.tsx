import * as React from "react";
import { Thumbnail } from "react-bootstrap";
import { Button, Tooltip } from "@blueprintjs/core";
import { Link } from "react-router-dom";
import ReactStars from "react-stars";

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
                        <Link
                            to={
                                "/" +
                                this.props.object.owner_name +
                                "/" +
                                this.props.object.name
                            }
                        >
                            {this.props.object.owner_name}/{this.props.object.name}
                        </Link>
                    </div>
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
                            value={2.5} // this.props.object.rating
                        />
                    </Tooltip>
                </div>
            </Thumbnail>
        );
    }
}
