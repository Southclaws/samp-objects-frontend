import * as React from "react";
import "./App.scss";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { Grid } from "react-bootstrap";
import cookie from "react-cookies";

import { User } from "./types/User";
import { Navigation } from "./components/Navigation";
import { Profile } from "./components/Profile";
import { Settings } from "./components/Settings";
import { Upload } from "./components/Upload";
import { Objects } from "./components/Objects";
import { Details } from "./components/Objects/Details";
import { Register } from "./components/Register";
import { Login } from "./components/Login";
import { Logout } from "./components/Logout";

export const HOST = "localhost";
export const API_PORT = "8080";
export const SELFURL = "http://" + HOST + ":3000";
export const ENDPOINT = "http://" + HOST + ":" + API_PORT;
const COOKIE_OPTIONS: {
    path?: string;
    expires?: Date;
    maxAge?: number;
    domain?: string;
    secure?: boolean;
    httpOnly?: boolean;
} = {
    path: HOST,
    domain: HOST
};

interface AppProps {}

interface AppState {
    token: string;
    userID?: string;
    user?: User;
}

class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);

        let token = cookie.load("token");
        let userID = cookie.load("userID");

        this.state = {
            token: token,
            userID: userID
        };
    }

    async componentDidMount() {
        let rawIndex = await fetch(ENDPOINT + "/v0/index", {
            method: "get",
            credentials: "include",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            }
        });
        let resp = await rawIndex.json();

        console.log({
            index: resp,
            token: this.state.token
        });

        if (this.state.userID !== undefined) {
            let rawUser = await fetch(ENDPOINT + "/v0/accounts/info", {
                method: "get",
                credentials: "include",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + this.state.token
                }
            });

            if (rawUser.status !== 200) {
                console.log(
                    "failed to get user info:",
                    rawUser.statusText,
                    await rawUser.text()
                );
                return;
            }

            let user = (await rawUser.json()) as User;

            if (user.id !== this.state.userID) {
                console.log("user ID does not match returned user object");
                return;
            }

            this.setState({ user: user });
        }
    }

    loggedIn() {
        return this.state.user !== undefined;
    }

    // IfLoggedIn is a TypeScript version of:
    // https://reacttraining.com/react-router/web/example/auth-workflow
    // it's just a stateless component that takes path and component (similar to <Route>)
    // and renders the component if the user is logged in, if not, it redirects to /login
    IfLoggedIn = (thisProps: { path: string; component: Function }) => {
        return (
            <Route
                render={props =>
                    this.state.user !== undefined ? (
                        thisProps.component
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: props.location }
                            }}
                        />
                    )}
            />
        );
    };

    onReceiveToken(token: string, userID: string) {
        let options = COOKIE_OPTIONS;

        const expires = new Date();
        expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 14);
        options.expires = expires;

        let r = cookie.save("token", token, options);
        r = cookie.save("userID", userID, options);

        this.setState({
            token: token,
            userID: userID
        });
        location.href = "/";
    }

    onLogout() {
        console.log("logging user out");
        cookie.remove("token", COOKIE_OPTIONS);
        cookie.remove("userID", COOKIE_OPTIONS);
        cookie.remove("userAuthData", COOKIE_OPTIONS);

        this.setState({
            token: "",
            userID: undefined,
            user: undefined
        });
        location.href = "/";
    }

    render() {
        return (
            <Router>
                <div>
                    <Navigation user={this.state.user} />
                    <Grid>
                        <Switch>
                            <Route exact path="/" component={Objects} />
                            <this.IfLoggedIn
                                path="/upload"
                                component={Upload}
                            />
                            <this.IfLoggedIn
                                path="/settings"
                                component={Settings}
                            />
                            <Route
                                path="/register"
                                render={props => (
                                    <Register
                                        onSuccess={this.onReceiveToken.bind(
                                            this
                                        )}
                                    />
                                )}
                            />
                            <Route
                                path="/login"
                                render={props => (
                                    <Login
                                        onSuccess={this.onReceiveToken.bind(
                                            this
                                        )}
                                    />
                                )}
                            />
                            <Route
                                path="/logout"
                                render={props => (
                                    <Logout
                                        onLogout={this.onLogout.bind(this)}
                                    />
                                )}
                            />
                            <Route path="/:username/:id" component={Details} />
                            <Route path="/:username" component={Profile} />
                        </Switch>
                    </Grid>
                </div>
            </Router>
        );
    }
}

export default App;
