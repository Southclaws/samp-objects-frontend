import * as React from "react";

export interface ObjectData {
    owner: string;
    id: string;
    rating: number;
    image: string;
}

interface DetailsProps {
    match: { params: { username: string; id: string } };
}

interface DetailsState {}

export class Details extends React.Component<DetailsProps, DetailsState> {
    render() {
        return (
            <div>
                Object Details for {this.props.match.params.id} by{" "}
                {this.props.match.params.username}
            </div>
        );
    }
}
