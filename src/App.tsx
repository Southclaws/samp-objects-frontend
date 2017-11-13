import * as React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Alert } from "react-bootstrap";
import cookie from "react-cookies";
import * as ReactGA from "react-ga";

import { User } from "./types/User";
import { ObjectPackage } from "./types/Object";
import { Navigation } from "./components/Navigation";
import { Profile } from "./components/Profile";
import { Settings } from "./components/Settings";
import { Terms } from "./components/Terms";
import { Upload } from "./components/Upload";
import { Objects } from "./components/Objects";
import { Details } from "./components/Objects/Details";
import { Register } from "./components/Register";
import { Login } from "./components/Login";
import { Logout } from "./components/Logout";

export const HOST = "samp-objects.com";
export const API_SCHEME = "https";
export const API_HOST = "api.samp-objects.com";
export const API_PORT = "443";
// export const HOST = "localhost";
// export const API_SCHEME = "http";
// export const API_HOST = "localhost";
// export const API_PORT = "8080";

export const ENDPOINT = API_SCHEME + "://" + API_HOST + ":" + API_PORT;

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
    ready: boolean;
    error?: string | JSX.Element;
    token: string;
    userID?: string;
    user?: User;
}

class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);

        let token = cookie.load("token");
        let userID = cookie.load("userID");

        ReactGA.initialize("UA-78828365-2", {
            debug: false,
            titleCase: false,
            gaOptions: {
                userId: userID
            }
        });
        ReactGA.pageview(window.location.pathname + window.location.search);

        this.state = {
            ready: false,
            token: token,
            userID: userID
        };
    }

    async componentDidMount() {
        let error: string | JSX.Element | undefined = undefined;
        let user: User | undefined;

        try {
            let index = await this.aliveCheck();
            console.log(index);
        } catch (e) {
            this.setState({
                ready: true,
                error: (
                    <div>
                        <p>Connection to the API server failed</p>
                        <p>{(e as Error).message}</p>
                        <p>
                            It may be offline temporarily for maintenance so
                            please retry in a few minutes. If this problem
                            persists, please let Southclaws know via SA:MP
                            Forum, Discord or Twitter
                        </p>
                    </div>
                )
            });
            return;
        }

        if (this.state.userID !== undefined) {
            try {
                user = await this.getUserInfo();
            } catch (e) {
                cookie.remove("token", COOKIE_OPTIONS);
                cookie.remove("userID", COOKIE_OPTIONS);
                cookie.remove("userAuthData", COOKIE_OPTIONS);
                error = (
                    <div>
                        <p>Failed to get user information</p>
                        <p>{(e as Error).message}</p>
                        <p>
                            Cookies may be corrupted, the app has attempted to
                            resolve the issue so try refreshing the page. If the
                            problem persists, try clearing your cookies for this
                            site. If the problem persists, please let Southclaws
                            know via SA:MP Forum, Discord or Twitter.
                        </p>
                    </div>
                );
            }
        }

        this.setState({
            ready: true,
            user: user,
            error: error
        });
    }

    async aliveCheck() {
        console.log("connecting to endpoint:", ENDPOINT);
        let rawIndex = await fetch(ENDPOINT + "/v0/index", {
            method: "get",
            credentials: "include",
            mode: "cors",
            headers: [["Content-Type", "application/json"]]
        });
        return await rawIndex.json();
    }

    async getUserInfo() {
        let rawUser: Response;

        rawUser = await fetch(ENDPOINT + "/v0/accounts/info", {
            method: "get",
            credentials: "include",
            mode: "cors",
            headers: [
                ["Content-Type", "application/json"],
                ["Authorization", "Bearer " + this.state.token]
            ]
        });

        if (rawUser.status !== 200) {
            throw "failed to get user info: " +
                rawUser.statusText +
                (await rawUser.text());
        }

        let user = (await rawUser.json()) as User;

        if (user.id !== this.state.userID) {
            throw "user ID does not match returned user object";
        }

        return user;
    }

    loggedIn() {
        return this.state.user !== undefined;
    }

    onReceiveToken(token: string, userID: string) {
        let options = COOKIE_OPTIONS;

        const expires = new Date();
        expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 14);
        options.expires = expires;

        cookie.save("token", token, options);
        cookie.save("userID", userID, options);

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

    onUploadDone(object: ObjectPackage) {
        if (this.state.user === undefined) {
            return;
        }
        location.href = "/" + this.state.user.name + "/" + object.name;
    }

    onError(err: string | JSX.Element) {
        console.log("Error event:", err);
        this.setState({ error: err });
    }

    render() {
        console.log("state on render", this.state);

        let mainContent: JSX.Element;

        if (!this.state.ready) {
            mainContent = (
                <Alert bsStyle="success">Connecting to API server...</Alert>
            );
        } else {
            if (this.state.error === undefined) {
                mainContent = (
                    <Switch>
                        // Object list
                        <Route exact path="/" component={Objects} />
                        // Terms and Conditions
                        <Route exact path="/terms" component={Terms} />
                        // Upload
                        {this.state.user === undefined ? (
                            <Route
                                exact
                                path="/upload"
                                render={props => <Redirect to="/login" />}
                            />
                        ) : (
                            <Route
                                path="/upload"
                                render={p => {
                                    return (
                                        <Upload
                                            token={this.state.token}
                                            onDone={this.onUploadDone.bind(
                                                this
                                            )}
                                        />
                                    );
                                }}
                            />
                        )}
                        // Settings
                        {this.state.user === undefined ? (
                            <Route
                                exact
                                path="/settings"
                                render={props => <Redirect to="/login" />}
                            />
                        ) : (
                            <Route
                                path="/settings"
                                render={p => {
                                    return <Settings />;
                                }}
                            />
                        )}
                        // Register
                        {this.state.user === undefined ? (
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
                        ) : (
                            <Route
                                exact
                                path="/register"
                                render={props => <Redirect to="/" />}
                            />
                        )}
                        // Login
                        {this.state.user === undefined ? (
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
                        ) : (
                            <Route
                                exact
                                path="/login"
                                render={props => <Redirect to="/" />}
                            />
                        )}
                        // Logout
                        {this.state.user === undefined ? (
                            <Route
                                exact
                                path="/logout"
                                render={props => <Redirect to="/login" />}
                            />
                        ) : (
                            <Route
                                path="/logout"
                                render={props => (
                                    <Logout
                                        onLogout={this.onLogout.bind(this)}
                                    />
                                )}
                            />
                        )}
                        // Object page
                        <Route
                            path="/:userName/:objectName"
                            component={Details}
                        />
                        // User profile page
                        <Route path="/:userName" component={Profile} />
                    </Switch>
                );
            } else {
                mainContent = (
                    <Alert bsStyle="danger">{this.state.error}</Alert>
                );
            }
        }
        return (
            <div>
                <Navigation user={this.state.user} />
                {mainContent}
            </div>
        );
    }
}

export default App;
