import * as React from "react";
import { FormGroup, FormControl, Button } from "react-bootstrap";
import { Tooltip, Position } from "@blueprintjs/core";
import * as UsernameValidator from "regex-username";
// import * as SHA256 from "js-sha256";

// import { ENDPOINT } from "../App";
// import { User } from "../types/User";

interface LoginProps {
    onSuccess: Function;
}

interface LoginState {
    username: string;
    password: string;
    validUsername: string;
    validPassword: string;
    generalError: string;
    done?: boolean;
}

export class Login extends React.Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props);
        this.state = {
            username: "",
            password: "",
            validUsername: "",
            validPassword: "",
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

    onUpdatePassword(value: string) {
        this.setState({
            password: value,
            validPassword:
                value.length > 10 ? "" : "password must be over 10 characters"
        });
    }

    async onLogin() {
        //
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
                    <FormGroup controlId="accountRegisterPassword">
                        <Tooltip
                            content={this.state.validPassword}
                            isOpen={this.state.password.length > 0}
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
                        content={this.state.generalError}
                        isOpen={this.state.generalError.length > 0}
                        position={Position.RIGHT}
                    >
                        <Button
                            type="submit"
                            onClick={e => {
                                e.preventDefault();
                                this.onLogin();
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
