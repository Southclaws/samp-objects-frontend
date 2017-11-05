import * as React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Navigation } from "./components/Navigation";
import { Profile } from "./components/Profile";
import { Upload } from "./components/Upload";
import { Objects } from "./components/Objects";
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
                    <Route exact path="/" component={Objects} />
                    <Route path="/:username" component={Profile} />
                    <Route path="/upload" component={Upload} />
                    <Route path="/settings" component={Upload} />
                    <Route path="/register" component={Register} />
                    <Route path="/login" component={Login} />
                </div>
            </Router>
        );
    }
}

export default App;
