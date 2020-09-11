import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './simple-sidebar.css'
import Report from "./components/Report";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Content from "./components/Content";

function App() {

    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Content}/>
                <Route path="/report/:id" exact component={Report}/>
                <Route path="/report" exact component={Report}/>
            </Switch>
        </Router>
    );
}

export default App;