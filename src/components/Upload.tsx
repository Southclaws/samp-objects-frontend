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
    tags: string[];
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
            tags: [] as string[]
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

    onTagsUpdate(tags: string[]) {
        console.log(tags);
        // this.setState({ tags: ["tag"] });
    }

    onSubmit() {
        if (this.state.object === undefined) {
            return;
        }

        if (
            !UsernameValidator().test(this.state.object.name) &&
            this.state.object.name.length > 0
        ) {
            this.setState({ validationError: "invalid name" });
        }
    }

    beforeUploadForm() {
        return (
            <Col xs={12} lg={12}>
                <FormGroup controlId="objectName">
                    <FormControl
                        placeholder="name"
                        required
                        autoFocus
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
                        required
                        autoFocus
                        onChange={e => {
                            return this.onUpdateName(
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
