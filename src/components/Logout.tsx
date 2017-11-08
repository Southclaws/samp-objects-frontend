import * as React from "react";

interface LogoutProps {
    onLogout: Function;
}

interface LogoutState {}

export class Logout extends React.Component<LogoutProps, LogoutState> {
    componentDidMount() {
        this.props.onLogout();
    }
    render() {
        return <div />;
    }
}
