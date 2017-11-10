import * as React from "react";
import { Grid, Row, Col } from "react-bootstrap";
import FineUploaderTraditional from "fine-uploader-wrappers";
import Gallery from "react-fine-uploader";
import "react-fine-uploader/gallery/gallery.css";

interface UploadProps {}

interface UploadState {}

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
    }

    // todo: ask user for information first, then present uploader after getting an upload URL from backend

    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={12} md={4}>
                        <h4>Upload Content</h4>
                        <p>Drag .dff and .txd files to the area below.</p>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={4}>
                        <Gallery uploader={this.uploader} />
                    </Col>
                </Row>
            </Grid>
        );
    }
}
