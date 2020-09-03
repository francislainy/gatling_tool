import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './simple-sidebar.css'
import Button from "react-bootstrap/Button";
import Popup from "./components/Popup";
import MainTable from "./components/MainTable";

function App() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="d-flex" id="wrapper">

            <div className="bg-light border-right" id="sidebar-wrapper">
                <div className="sidebar-heading">Start Bootstrap</div>
                <div className="list-group list-group-flush">
                    <a href="#" className="list-group-item list-group-item-action bg-light">Dashboard</a>
                    <a href="#" className="list-group-item list-group-item-action bg-light">Shortcuts</a>
                    <a href="#" className="list-group-item list-group-item-action bg-light">Overview</a>
                </div>
            </div>

            <div id="page-content-wrapper">

                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div><a href="#" className="navbar-brand">Gatling Reporting Tool</a></div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="#">Dashboard</a>
                            </li>
                        </ul>
                    </div>
                </nav>

                <Button variant="primary" onClick={handleShow}>
                    Import Gatling Report
                </Button>

                <Popup show={show} onHide={handleClose}/>

                <MainTable/>

            </div>

        </div>
    )
}

export default App;
