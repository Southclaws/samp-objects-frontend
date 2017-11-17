import * as React from "react";
import ReactStars from "react-stars";

import { ObjectPackage } from "../../types/Object";

interface RatingProps {
    object: ObjectPackage;
    onRate(rating: number): void;
}

interface RatingState {
    value: number;
}

export class Rating extends React.Component<RatingProps, RatingState> {
    constructor(props: RatingProps) {
        super(props);
        this.state = {
            value: this.props.object.rate_value / this.props.object.rate_count
        };
    }

    render() {
        return (
            <ReactStars
                value={this.state.value}
                // onChange={(newRating: number) => {
                //     this.props.onRate(newRating);
                // }}
                onChange={(rate: number) => {
                    this.setState({ value: rate });
                    this.props.onRate(rate);
                }}
            />
        );
    }
}
