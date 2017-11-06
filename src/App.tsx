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

import { Navigation } from "./components/Navigation";
import { Profile } from "./components/Profile";
import { Upload } from "./components/Upload";
import { Objects } from "./components/Objects";
import { Details } from "./components/Objects/Details";
import { Register } from "./components/Register";
import { Login } from "./components/Login";

const ENDPOINT = "http://localhost:8080";

interface AppState {
    token: string;
    loggedIn: boolean;
}

class App extends React.Component<{}, AppState> {
    constructor(props: {}) {
        super(props);

        let token = cookie.load("token");

        this.state = {
            token: token,
            loggedIn: token === undefined ? false : true
        };

        console.log(this.state);
    }
    componentDidMount() {
        console.log(ENDPOINT);
    }

    loggedIn() {
        return this.state.loggedIn;
    }

    // IfLoggedIn is a TypeScript version of:
    // https://reacttraining.com/react-router/web/example/auth-workflow
    // it's just a stateless component that takes path and component (similar to <Route>)
    // and renders the component if the user is logged in, if not, it redirects to /login
    IfLoggedIn = (thisProps: { path: string; component: Function }) => {
        return (
            <Route
                render={props =>
                    this.state.loggedIn ? (
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

    render() {
        return (
            <Router>
                <div>
                    <Navigation loggedIn={this.state.loggedIn} />
                    <Grid>
                        <Switch>
                            <Route exact path="/" component={Objects} />
                            <this.IfLoggedIn
                                path="/upload"
                                component={Upload}
                            />
                            <this.IfLoggedIn
                                path="/settings"
                                component={Upload}
                            />
                            <Route path="/register" component={Register} />
                            <Route path="/login" component={Login} />
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
