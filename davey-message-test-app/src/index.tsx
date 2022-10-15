import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import CssBaseline from "@material-ui/core/CssBaseline";
import { StylesProvider } from "@material-ui/core/styles";

ReactDOM.render(
    <React.StrictMode>
        <StylesProvider injectFirst>
            <CssBaseline />
            <App />
        </StylesProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
