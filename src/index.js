import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import App from "./App"
import { MainContextProvider } from "./context/mainContext"
import "./styles.css"

ReactDOM.render(
    <MainContextProvider>
        <Router>
            <App />
        </Router>
    </MainContextProvider>
    ,
    document.getElementById("root"))
