import * as React from "react";

interface LogoutProps {
    onLogout: Function;
}

interface LogoutState {}

export class Logout extends React.Component<LogoutProps, LogoutState> {
    constructor(props: LogoutProps) {
        super(props);
    }

    componentDidMount() {
        console.log("logout");
        this.props.onLogout();
    }
    render() {
        return <div />;
    }
}
