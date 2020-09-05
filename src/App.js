import React, {useEffect, useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './simple-sidebar.css'
import Button from "react-bootstrap/Button";
import Popup from "./components/Popup";
import MainTable from "./components/MainTable";
import ToolDataService from './components/api/ToolDataService'
import axios from 'axios';


function App() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [data, setData] = useState({total: [], isFetching: false});


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setData({total: data.total, isFetching: true});
                const response = await axios.get('http://localhost:8081/gatling_tool/t');
                console.log(response)
                setData({total: response.data.total, isFetching: false});
            } catch (e) {
                console.log(e);
                setData({users: data.users, isFetching: false});
            }
        };
        fetchUsers();
    }, []);

    ToolDataService.retrieveToolItem()
        .then(response => console.log(response.data))

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
                <h1>{data.total}</h1>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div><a href="#" className="navbar-brand">Gatling Reporting Tool</a></div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
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
                    {data.users}
                    Import Gatling Report
                </Button>

                <Popup show={show} onHide={handleClose}/>

                <MainTable/>

            </div>

        </div>
    )
}

export default App;
