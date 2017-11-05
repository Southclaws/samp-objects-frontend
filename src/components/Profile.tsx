import * as React from "react";

interface ProfileProps {
    match: { params: { username: string } };
}

interface ProfileState {
    username: string;
}

export class Profile extends React.Component<ProfileProps, ProfileState> {
    constructor(props: ProfileProps) {
        super(props);

        this.state = {
            username: this.props.match.params.username
        };
    }

    // async componentDidMount() {}

    render() {
        return <div>{this.state.username}</div>;
    }
}
