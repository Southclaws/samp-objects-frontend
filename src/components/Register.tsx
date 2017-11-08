import * as React from "react";
import { FormGroup, FormControl, Checkbox, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as UsernameValidator from "regex-username";
import * as Mailcheck from "mailcheck";
import { Tooltip, Position } from "@blueprintjs/core";
import * as SHA256 from "js-sha256";

import { ENDPOINT } from "../App";
import { User } from "../types/User";

interface RegisterProps {
    onSuccess: Function;
}

interface RegisterState {
    username: string;
    email: string;
    password: string;
    validUsername: string;
    validPassword: string;
    suggestEmail: string;
    tsAndcs: boolean;
    checkReminder?: boolean;
    generalError: string;
}

interface TokenResponse {
    token: string;
    userID: string;
}

export class Register extends React.Component<RegisterProps, RegisterState> {
    constructor(props: RegisterProps) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            validUsername: "",
            validPassword: "",
            suggestEmail: "",
            tsAndcs: false,
            generalError: ""
        };
    }

    onUpdateUsername(value: string) {
        let validUsername = "";

        if (
            !UsernameValidator().test(value) &&
            this.state.username.length > 0
        ) {
            validUsername = "invalid username";
        }

        this.setState({
            username: value,
            validUsername: validUsername
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
            email: value
        });
    }

    onUpdatePassword(value: string) {
        this.setState({
            password: value,
            validPassword:
                value.length > 10 ? "" : "password must be over 10 characters"
        });
    }

    async onRegister() {
        if (!this.state.tsAndcs) {
            this.setState({ checkReminder: true });
            return;
        }

        let user: User = {
            username: this.state.username,
            email: this.state.email,
            password: SHA256.sha256(this.state.password)
        };

        let raw: Response;
        try {
            raw = await fetch(ENDPOINT + "/v0/accounts/register", {
                method: "post",
                body: JSON.stringify(user),
                mode: "cors",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        } catch (err) {
            this.setState({ generalError: (err as Error).message });
            return;
        }

        if (raw.status !== 200) {
            switch (raw.status) {
                case 409:
                    this.setState({
                        validUsername: "that username is already taken"
                    });
                    break;

                default:
                    this.setState({
                        generalError:
                            "oops, unknown error! info: " + raw.statusText
                    });
                    break;
            }
            return;
        }

        console.log(raw.headers);

        let response = (await raw.json()) as TokenResponse;

        if (response.token === undefined) {
            this.setState({
                generalError: "did not receive a JWT :("
            });
            return;
        }

        if (response.userID === undefined) {
            this.setState({
                generalError: "did not receive a userID :("
            });
            return;
        }

        this.props.onSuccess(response.token, response.userID);
    }

    render() {
        return (
            <div>
                <form>
                    <FormGroup controlId="accountRegisterUsername">
                        <Tooltip
                            content={this.state.validUsername}
                            isOpen={this.state.validUsername.length > 0}
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

                    <Tooltip
                        content={"you must accept the terms and conditions"}
                        isOpen={
                            this.state.checkReminder !== undefined &&
                            this.state.checkReminder
                        }
                    >
                        <Checkbox
                            onClick={e => {
                                this.setState({
                                    tsAndcs: (e.target as HTMLInputElement)
                                        .checked,
                                    checkReminder: false
                                });
                            }}
                        >
                            {"I have read and understood the "}
                            <Link to="/terms">Terms and Conditions</Link>
                        </Checkbox>
                    </Tooltip>
                    <div />
                    <Tooltip
                        content={this.state.generalError}
                        isOpen={this.state.generalError.length > 0}
                        position={Position.RIGHT}
                    >
                        <Button
                            type="submit"
                            onClick={e => {
                                e.preventDefault();
                                this.onRegister();
                            }}
                        >
                            Submit
                        </Button>
                    </Tooltip>
                </form>
            </div>
        );
    }
}
