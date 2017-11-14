import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

// import withTracker from "./withTracker";
import App from "./App";
import "./index.css";
import { unregister } from "./registerServiceWorker";

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById("root") as HTMLElement
);
unregister();
