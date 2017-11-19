import * as React from "react";
import { Alert } from "react-bootstrap";

interface Props {}
interface State {
    errorInfo?: JSX.Element;
}

export class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        this.setState({
            errorInfo: (
                <Alert>
                    <p>Something went wrong:</p>
                    <p>{error}</p>
                    <pre>{info.componentStack}</pre>
                </Alert>
            )
        });
    }

    render() {
        if (this.state.errorInfo !== undefined) {
            return this.state.errorInfo;
        }
        return this.props.children;
    }
}
