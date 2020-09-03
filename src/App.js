import React, {Component, useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './simple-sidebar.css'
import Button from "react-bootstrap/Button";
import Popup from "./components/Popup";
import {Visibility, Delete} from '@material-ui/icons';

function App() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const myList = [
        {
            "elem_one": "1",
            "elem_two": "1",
            "elem_three": "1",
            "elem_four": "1",
        },
        {
            "elem_one": "1",
            "elem_two": "1",
            "elem_three": "1",
            "elem_four": "1",
        },
        {
            "elem_one": "1",
            "elem_two": "1",
            "elem_three": "1",
            "elem_four": "1",
        },
    ]


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

                <table className="table">
                    <thead className="thead-light">
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Run Date</th>
                        <th scope="col">Created</th>
                        <th scope="col">Category</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    {/*<tbody>*/}
                    {/*<tr>*/}
                    {/*    <th scope="row">1</th>*/}
                    {/*    <td>Mark</td>*/}
                    {/*    <td>Otto</td>*/}
                    {/*    <td>Otto</td>*/}
                    {/*    <Visibility>Larry</Visibility>*/}
                    {/*    <Delete>@twitter</Delete>*/}
                    {/*</tr>*/}
                    {/*<tr>*/}
                    {/*    <th scope="row">2</th>*/}
                    {/*    <td>Jacob</td>*/}
                    {/*    <td>Thornton</td>*/}
                    {/*    <td>@fat</td>*/}
                    {/*    <Visibility>Larry</Visibility>*/}
                    {/*    <Delete>@twitter</Delete>*/}
                    {/*</tr>*/}
                    {/*<tr>*/}
                    {/*    <th scope="row">3</th>*/}
                    {/*    <td>the Bird</td>*/}
                    {/*    <td>@twitter</td>*/}
                    {/*    <td>@twitter</td>*/}
                    {/*    <Visibility>Larry</Visibility>*/}
                    {/*    <Delete>@twitter</Delete>*/}
                    {/*</tr>*/}

                    <tbody>
                    {myList.map((item, i) => {
                        return [
                            <tr key={i}>
                                <td>{item.elem_one}</td>
                                <td>{item.elem_two}</td>
                                <td>{item.elem_three}</td>
                                <td>{item.elem_four}</td>
                                <Visibility/>
                                <Delete/>
                            </tr>
                        ];
                    })}
                    </tbody>

                </table>

            </div>

        </div>
    )
}

export default App;
