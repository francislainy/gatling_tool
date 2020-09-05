import React, {useEffect, useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './simple-sidebar.css'
import Button from "react-bootstrap/Button";
import Popup from "./components/Popup";
import MainTable from "./components/MainTable";
import ToolDataService from './components/api/ToolDataService'
import {Delete, Visibility} from "@material-ui/icons";

function App() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [data, setData] = useState({total: [], isFetching: false});
    // const [dataTableObj, setDataTableObj] = useState({table_items: {}, isFetching: false});
    const [dataTableObj, setDataTableObj] = useState({
        table_items: {
            "name:": "name1",
            "created_date": "yesterday",
            "run_date": "today",
            "category": "my_cat"
        }, isFetching: false
    });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setData({total: data.total, isFetching: true});

                ToolDataService.retrieveToolItem()
                    .then(response => setData({total: response.data.total, isFetching: false}))

            } catch (e) {
                console.log(e);
                setData({total: data.total, isFetching: false});
            }
        };
        fetchUsers().then(r => console.log(r))
    }, []);


    useEffect(() => {

        ToolDataService.retrieveTable()

            .then(({data}) =>
                setDataTableObj({table_items: data.table_items, isFetching: true})
            )

    }, [])

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

                {/*<MainTable/>*/}

                {dataTableObj !== undefined && dataTableObj.table_items[0] !== undefined &&
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

                    <tbody>
                    {dataTableObj.table_items.map((item, i) => {
                        return [
                            <tr key={i}>
                                <td>{item.name}</td>
                                <td>{item.created_date}</td>
                                <td>{item.category}</td>
                                <td>{item.run_date}</td>
                                <Visibility/>
                                <Delete/>
                            </tr>
                        ];
                    })}
                    </tbody>

                </table>
                }

            </div>

        </div>
    )
}

export default App;
