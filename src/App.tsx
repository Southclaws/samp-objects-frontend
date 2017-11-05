import * as React from "react";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Grid } from "react-bootstrap";

import { Navigation } from "./components/Navigation";
import { Profile } from "./components/Profile";
import { Upload } from "./components/Upload";
import { Objects } from "./components/Objects";
import { Details } from "./components/Objects/Details";
import { Register } from "./components/Register";
import { Login } from "./components/Login";

interface AppState {
    loggedIn: boolean;
}

class App extends React.Component<{}, AppState> {
    componentDidMount() {
        //
    }

    render() {
        return (
            <Router>
                <div>
                    <Navigation />
                    <Grid>
                        <Switch>
                            <Route exact path="/" component={Objects} />
                            <Route path="/upload" component={Upload} />
                            <Route path="/settings" component={Upload} />
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
