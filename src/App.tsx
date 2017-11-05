import * as React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Navigation } from "./components/Navigation";

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
                    <Route
                        exact
                        path="/"
                        component={({ match: {} }) => {
                            return <div>home</div>;
                        }}
                    />
                    <Route
                        path="/objects"
                        component={({ match: {} }) => {
                            return <div>objects</div>;
                        }}
                    />
                </div>
            </Router>
        );
    }
}

export default App;
