import * as React from "react";
import {
    Grid,
    Row,
    Col,
    FormGroup,
    FormControl,
    Button
} from "react-bootstrap";
import { Tooltip, Position } from "@blueprintjs/core";
import FineUploaderTraditional from "fine-uploader-wrappers";
import Gallery from "react-fine-uploader";
import "react-fine-uploader/gallery/gallery.css";
import * as UsernameValidator from "regex-username";

import { Object } from "../types/Object";

interface UploadProps {}

interface UploadState {
    objectID?: string;
    validationError: string;

    object?: Object;
    allTags: string;
}

export class Upload extends React.Component<UploadProps, UploadState> {
    uploader = new FineUploaderTraditional({
        options: {
            chunking: {
                enabled: true
            },
            deleteFile: {
                enabled: true,
                endpoint: "/uploads"
            },
            request: {
                endpoint: "/uploads"
            },
            retry: {
                enableAuto: true
            }
        }
    });

    constructor(props: UploadProps) {
        super(props);
        this.state = {
            objectID: undefined,
            validationError: "",
            object: undefined,
            allTags: ""
        };
    }

    onUpdateName(name: string) {
        let updated: Object;

        if (this.state.object === undefined) {
            updated = { name: "", description: "", category: "", tags: [""] };
        } else {
            updated = this.state.object;
        }
        updated.name = name;

        this.setState({ object: updated });
    }

    onUpdateDesc(description: string) {
        let updated: Object;

        if (this.state.object === undefined) {
            updated = { name: "", description: "", category: "", tags: [""] };
        } else {
            updated = this.state.object;
        }
        updated.description = description;

        this.setState({ object: updated });
    }

    onUpdateCagetory(category: string) {
        let updated: Object;

        if (this.state.object === undefined) {
            updated = { name: "", description: "", category: "", tags: [""] };
        } else {
            updated = this.state.object;
        }
        updated.category = category;

        this.setState({ object: updated });
    }

    onUpdateTags(value: string) {
        let tags: string = "";
        for (let ch = 0; ch < value.length; ch++) {
            const element = value[ch];
            if (element.match(/[a-zA-Z ]/)) {
                tags += element;
            }
        }

        let updated: Object;

        if (this.state.object === undefined) {
            updated = { name: "", description: "", category: "", tags: [""] };
        } else {
            updated = this.state.object;
        }
        updated.tags = tags.split(" ");

        this.setState({
            object: updated,
            allTags: tags
        });
    }

    onSubmit() {
        if (this.state.object === undefined) {
            return;
        }
        if (
            this.state.object.name === "" ||
            this.state.object.category === ""
        ) {
            return;
        }

        console.log(this.state.object);

        if (
            !UsernameValidator().test(this.state.object.name) &&
            this.state.object.name.length > 0
        ) {
            this.setState({ validationError: "invalid name" });
        }
    }

    beforeUploadForm() {
        // todo: get from server
        let categories = [
            "Characters",
            "Buildings (exterior only)",
            "Buildings (walk-in)",
            "Buildings (interior only)",
            "Furniture",
            "Weapons",
            "Vehicle Attachments",
            "Misc"
        ];
        return (
            <Col xs={12} lg={12}>
                <FormGroup controlId="objectName">
                    <FormControl
                        placeholder="name"
                        required
                        autoFocus
                        maxLength={32}
                        onChange={e => {
                            return this.onUpdateName(
                                (e.target as HTMLInputElement).value
                            );
                        }}
                    />
                </FormGroup>
                <FormGroup controlId="objectDesc">
                    <FormControl
                        placeholder="description"
                        componentClass="textarea"
                        required
                        autoFocus
                        maxLength={512}
                        onChange={e => {
                            return this.onUpdateDesc(
                                (e.target as HTMLInputElement).value
                            );
                        }}
                    />
                </FormGroup>
                <FormGroup controlId="objectCategory">
                    <FormControl
                        componentClass="select"
                        placeholder="cagegory"
                        onChange={e => {
                            console.log((e.target as HTMLInputElement).value);
                            return this.onUpdateCagetory(
                                (e.target as HTMLInputElement).value
                            );
                        }}
                    >
                        <option key={0} value="select">
                            select
                        </option>
                        {categories.map(
                            (value: string, index: number, array: string[]) => (
                                <option key={index + 1} value={value}>
                                    {value}
                                </option>
                            )
                        )}
                    </FormControl>
                </FormGroup>
                <FormGroup controlId="objectTags">
                    <FormControl
                        placeholder="tags (separated by spaces)"
                        required
                        autoFocus
                        value={this.state.allTags}
                        maxLength={128}
                        onChange={e => {
                            return this.onUpdateTags(
                                (e.target as HTMLInputElement).value
                            );
                        }}
                    />
                </FormGroup>
                <Tooltip
                    content={this.state.validationError}
                    isOpen={this.state.validationError.length > 0}
                    position={Position.RIGHT}
                >
                    <Button
                        onClick={e => {
                            e.preventDefault();
                            this.onSubmit();
                        }}
                    >
                        Done
                    </Button>
                </Tooltip>
            </Col>
        );
    }
    // todo: ask user for information first, then present uploader after getting an upload URL from backend

    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={12} lg={12}>
                        <h4>Upload Object</h4>
                    </Col>
                </Row>
                <Row>
                    {this.state.objectID === undefined ? (
                        this.beforeUploadForm()
                    ) : (
                        <Col xs={12} lg={12}>
                            <p>Drag .dff and .txd files to the area below.</p>
                            <Gallery uploader={this.uploader} />
                        </Col>
                    )}
                </Row>
            </Grid>
        );
    }
}
