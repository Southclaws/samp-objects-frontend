import * as React from "react";
import { FormGroup, FormControl, Checkbox, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as UsernameValidator from "regex-username";
import * as Mailcheck from "mailcheck";
import { Tooltip, Position } from "@blueprintjs/core";

interface RegisterProps {}

interface RegisterState {
    username: string;
    email: string;
    password: string;
    validUsername: "none" | "valid" | "invalid";
    validEmail: "none" | "valid" | "invalid";
    validPassword: "none" | "valid" | "invalid";
    suggestEmail: string;
}

export class Register extends React.Component<RegisterProps, RegisterState> {
    constructor(props: RegisterProps) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            validUsername: "none",
            validEmail: "none",
            validPassword: "none",
            suggestEmail: ""
        };
    }

    onUpdateUsername(value: string) {
        this.setState({
            username: value,
            validUsername: UsernameValidator().test(value) ? "valid" : "invalid"
        });
    }

    onUpdateEmail(value: string) {
        Mailcheck.run({
            email: value,
            suggested: (suggestion: MailcheckModule.ISuggestion) => {
                this.setState({ suggestEmail: suggestion.full });
            }
        });

        this.setState({
            email: value,
            validEmail: "valid"
        });
    }

    onUpdatePassword(value: string) {
        this.setState({
            password: value,
            validPassword: value.length > 10 ? "valid" : "invalid"
        });
    }

    render() {
        console.log(this.state.validUsername);
        return (
            <div>
                <form>
                    <FormGroup controlId="accountRegisterUsername">
                        <Tooltip
                            content={"invalid username"}
                            isOpen={
                                this.state.validUsername === "invalid" &&
                                this.state.username.length > 0
                            }
                            hoverOpenDelay={1000000}
                            position={Position.RIGHT}
                        >
                            <FormControl
                                type="username"
                                placeholder="username"
                                required
                                autoFocus
                                onChange={e => {
                                    return this.onUpdateUsername(
                                        (e.target as HTMLInputElement).value
                                    );
                                }}
                            />
                        </Tooltip>
                    </FormGroup>
                    <FormGroup controlId="accountRegisterEmail">
                        <Tooltip
                            content={
                                "did you mean " + this.state.suggestEmail + "?"
                            }
                            isOpen={
                                this.state.suggestEmail.length > 0 &&
                                this.state.email.length > 0 &&
                                this.state.email !== this.state.suggestEmail
                            }
                            hoverOpenDelay={1000000}
                            position={Position.RIGHT}
                        >
                            <FormControl
                                type="email"
                                placeholder="email"
                                required
                                onChange={e => {
                                    return this.onUpdateEmail(
                                        (e.target as HTMLInputElement).value
                                    );
                                }}
                            />
                        </Tooltip>
                    </FormGroup>
                    <FormGroup controlId="accountRegisterPassword">
                        <Tooltip
                            content={"password must be at least 10 characters"}
                            isOpen={
                                this.state.validPassword === "invalid" &&
                                this.state.password.length > 0
                            }
                            hoverOpenDelay={1000000}
                            position={Position.RIGHT}
                        >
                            <FormControl
                                type="password"
                                placeholder="password"
                                required
                                onChange={e => {
                                    return this.onUpdatePassword(
                                        (e.target as HTMLInputElement).value
                                    );
                                }}
                            />
                        </Tooltip>
                    </FormGroup>

                    <Checkbox>
                        I have read and understood the{" "}
                        <Link to="/terms">Terms and Conditions</Link>
                    </Checkbox>

                    <Button type="submit">Submit</Button>
                </form>
            </div>
        );
    }
}
