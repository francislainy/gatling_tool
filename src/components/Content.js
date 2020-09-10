import React, {useEffect, useState} from 'react';
import ToolDataService from "../api/ToolDataService";
import Button from "react-bootstrap/Button";
import Popup from "./Popup";
import MainTable from "./MainTable";

function Content() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {

        setShow(true);
    }

    const [dataTableObj, setDataTableObj] = useState({
        table_items: {
            "id": "1",
            "name:": "name1",
            "created_date": "yesterday",
            "run_date": "today",
            "category": "my_cat"
        }, isFetching: false
    });

    useEffect(() => {

        ToolDataService.retrieveTable()

            .then(({data}) =>
                setDataTableObj({table_items: data.table_items, isFetching: true})
            )

    }, [])

    return (

        <div>
            <div>
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
                        <Button variant="primary" onClick={handleShow}>Import Gatling Report</Button>
                        <Popup show={show} onHide={handleClose}/>
                        {/*if at least one item we can try and populate the table..*/}
                        {dataTableObj !== undefined && dataTableObj.table_items[0] !== undefined &&
                        <MainTable dataTableObj={dataTableObj}/>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Content