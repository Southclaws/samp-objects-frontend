import * as React from "react";
import {
    Grid,
    Row,
    Col,
    FormGroup,
    FormControl,
    Button,
    Alert
} from "react-bootstrap";
import FineUploaderTraditional from "fine-uploader-wrappers";
import Gallery from "react-fine-uploader";
import "react-fine-uploader/gallery/gallery.css";
import * as UsernameValidator from "regex-username";

import { ObjectPackage } from "../types/Object";
import { ENDPOINT } from "../App";

interface UploadProps {
    token: string;
    onDone(object: Object): void;
}

interface UploadState {
    generalError: string;

    object?: ObjectPackage;
    allTags: string;
    readyToUpload: boolean;

    uploader?: any;
}

export class Upload extends React.Component<UploadProps, UploadState> {
    constructor(props: UploadProps) {
        super(props);
        this.state = {
            generalError: "",
            object: undefined,
            allTags: "",
            readyToUpload: false
        };
    }

    onUpdateName(name: string) {
        let updated: ObjectPackage;

        if (this.state.object === undefined) {
            updated = {
                name: "",
                owner_id: "",
                owner_name: "",
                description: "",
                category: "",
                tags: [""]
            };
        } else {
            updated = this.state.object;
        }
        updated.name = name;

        this.setState({ object: updated });
    }

    onUpdateDesc(description: string) {
        let updated: ObjectPackage;

        if (this.state.object === undefined) {
            updated = {
                name: "",
                owner_id: "",
                owner_name: "",
                description: "",
                category: "",
                tags: [""]
            };
        } else {
            updated = this.state.object;
        }
        updated.description = description;

        this.setState({ object: updated });
    }

    onUpdateCagetory(category: string) {
        let updated: ObjectPackage;

        if (this.state.object === undefined) {
            updated = {
                name: "",
                owner_id: "",
                owner_name: "",
                description: "",
                category: "",
                tags: [""]
            };
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

        let updated: ObjectPackage;

        if (this.state.object === undefined) {
            updated = {
                name: "",
                owner_id: "",
                owner_name: "",
                description: "",
                category: "",
                tags: [""]
            };
        } else {
            updated = this.state.object;
        }
        updated.tags = tags.split(" ");

        this.setState({
            object: updated,
            allTags: tags
        });
    }

    async onSubmit() {
        if (this.state.object === undefined) {
            return;
        }
        if (
            this.state.object.name === "" ||
            this.state.object.category === "" ||
            this.state.object.category === "select"
        ) {
            this.setState({
                generalError: "invalid object in state"
            });
            return;
        }

        if (
            !UsernameValidator().test(this.state.object.name) &&
            this.state.object.name.length > 0
        ) {
            this.setState({
                generalError:
                    "invalid model name, valid characters are: alphanumerics and hyphens"
            });
            return;
        }

        let raw: Response;
        try {
            raw = await fetch(ENDPOINT + "/v0/object", {
                method: "post",
                body: JSON.stringify(this.state.object),
                mode: "cors",
                credentials: "include",
                headers: [
                    ["Content-Type", "application/json"],
                    ["Authorization", "Bearer " + this.props.token]
                ]
            });
        } catch (err) {
            this.setState({ generalError: (err as Error).message });
            return;
        }

        if (raw.status > 299) {
            switch (raw.status) {
                default:
                    this.setState({
                        generalError:
                            "unknown error! info: " +
                            raw.statusText +
                            ": " +
                            (await raw.text())
                    });
                    break;
            }
            return;
        }

        let object = await raw.json();
        if (object === undefined || object === null) {
            this.setState({ generalError: "received bad response" });
            return;
        }

        let uploader = new FineUploaderTraditional({
            options: {
                callbacks: {
                    onComplete: (
                        id: number,
                        name: string,
                        responseJson: {
                            success: boolean;
                            error: string;
                            object: ObjectPackage;
                        },
                        xhr: any
                    ) => {
                        this.onSuccessfulUpload(responseJson.object);
                    }
                },
                cors: {
                    expected: true,
                    sendCredentials: true
                },
                chunking: {
                    enabled: true
                },
                request: {
                    endpoint: ENDPOINT + "/v0/upload/" + object.id,
                    customHeaders: {
                        Authorization: "Bearer " + this.props.token
                    }
                },
                retry: {
                    enableAuto: true
                }
            }
        });

        this.setState({
            readyToUpload: true,
            object: object,
            uploader: uploader
        });
    }

    async onSuccessfulUpload(object: ObjectPackage) {
        if (this.state.object === undefined) {
            return;
        }

        console.log("received confirmation of successful upload", object);
        let updated = this.state.object;

        if (object.images !== undefined) {
            if (updated.images === undefined) {
                updated.images = [];
            }
            updated.images.concat(object.images);
        }

        if (object.models !== undefined) {
            if (updated.models === undefined) {
                updated.models = [];
            }
            updated.models.concat(object.models);
        }

        if (object.textures !== undefined) {
            if (updated.textures === undefined) {
                updated.textures = [];
            }
            updated.textures.concat(object.textures);
        }

        console.log(
            "old",
            this.state.object,
            "recv",
            object,
            "merged",
            updated
        );

        this.setState({ object: updated });
    }

    async onDone() {
        if (this.state.object === undefined) {
            this.setState({
                generalError:
                    "No object metadata specified, try reloading the page"
            });
            return;
        }

        if (
            this.state.object.models === undefined ||
            this.state.object.textures === undefined ||
            this.state.object.models === null ||
            this.state.object.textures === null
        ) {
            this.setState({
                generalError: "You must add at least one .dff and one .txd"
            });
            return;
        }

        if (
            this.state.object.models.length === 0 ||
            this.state.object.textures.length === 0
        ) {
            this.setState({
                generalError:
                    "You must add at least one .dff, one .txd and one image"
            });
            return;
        }

        this.props.onDone(this.state.object);
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
                <Button
                    onClick={e => {
                        e.preventDefault();
                        this.onSubmit();
                    }}
                >
                    Done
                </Button>
            </Col>
        );
    }

    upload() {
        if (this.state.object === undefined) {
            return;
        }

        return (
            <Row>
                <Col xs={12} lg={6}>
                    <p>Drag .dff and .txd files to the area below.</p>
                    <Gallery uploader={this.state.uploader} />
                </Col>
                <Col xs={12} lg={6}>
                    <Button onClick={e => this.onDone()}>Done</Button>
                </Col>
            </Row>
        );
    }
    render() {
        console.log("upload state", this.state);
        return (
            <Grid>
                <Row>
                    <Col xs={12} lg={12}>
                        <h4>Upload Objects and Textures</h4>
                    </Col>
                </Row>
                {this.state.readyToUpload === false
                    ? this.beforeUploadForm()
                    : this.upload()}
                <Row>
                    <Col xs={12} lg={12}>
                        {this.state.generalError.length > 0 ? (
                            <Alert bsStyle="danger">
                                {this.state.generalError}
                            </Alert>
                        ) : null}
                    </Col>
                </Row>
            </Grid>
        );
    }
}
