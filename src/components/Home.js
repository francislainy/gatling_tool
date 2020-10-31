import React, {useEffect, useState} from 'react';
import Button from "react-bootstrap/Button";
import Popup from "./Popup";
import ReportTable from "./ReportTable";
import api from "../api/api";
import {createReport, retrieveTable} from "../api";

const moment = require("moment");
const url = "http://localhost"
const port = 8081

class Navbar extends React.Component {
    render() {
        return <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
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
        </nav>;
    }
}

class Sidebar extends React.Component {
    render() {
        return <div className="bg-light border-right" id="sidebar-wrapper">
            <div className="sidebar-heading">Start Bootstrap</div>
            <div className="list-group list-group-flush">
                <a href="#" className="list-group-item list-group-item-action bg-light">Dashboard</a>
                <a href="#" className="list-group-item list-group-item-action bg-light">Shortcuts</a>
                <a href="#" className="list-group-item list-group-item-action bg-light">Overview</a>
            </div>
        </div>;
    }
}

function Home() {
    const [show, setShow] = useState(false);
    const [file, setFile] = useState()

    const [dataTableObj, setDataTableObj] = useState({
        "reports": [
            {
                "id": "",
                "title": "",
                "createdDate": "",
                "runDate": "",
                "category": {
                    "id": "",
                    "title:": ""
                }
            }
        ]
        , isFetching: false
    });

    const onHide = () => setShow(false);
    const onShow = () => {

        setShow(true);
    }

    const onFileAdded = (selectedFile) => {

        if (selectedFile !== null) {
            console.log('has file')
            setFile(selectedFile)
        }
    }

    const onConfirm = (inputValues) => {

        const currentDateTimestamp = moment().valueOf()

        let values = {
            "title": 'na',
            "runDate": file.lastModified,
            "createdDate": currentDateTimestamp,
            "category": {
                "id": inputValues.categoryId,
            }
        }

        const urlAndPort = {
            url: url,
            port: port,
            payload: values
        }

        createReport(urlAndPort)

            .then((response) => {

                    const reportId = response.data.id

                    new api().submitJsonStats(reportId, file).then((response) => {
                            console.log('report id ' + reportId + ' successfully created')
                        }
                    )

                    onHide()
                }
            ).catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        });

    }

    useEffect(() => {

        const urlAndPort = {
            url: url,
            port: port,
        }

        retrieveTable(urlAndPort)

            .then(({data}) => {
                    setDataTableObj({...data, isFetching: true})
                }
            ).catch(reason => {
            console.log(reason + ' reason for failure on retrieving report table items')
        })

    }, [show === false])

    return (
        <div>
            <div>
                <div className="d-flex" id="wrapper">
                    <Sidebar/>
                    <div id="page-content-wrapper">
                        <Navbar/>
                        <div style={{padding: 10}}>
                            <Button variant="warning" onClick={onShow}>Import Gatling Report</Button>
                        </div>
                        <Popup
                            show={show}
                            onHide={onHide}
                            onConfirm={onConfirm}
                            onFileAdded={onFileAdded}
                        />
                        {/*if at least one item we can try and populate the table..*/}
                        {dataTableObj.reports[0].id !== '' &&
                        <ReportTable dataTableObj={dataTableObj}/>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home