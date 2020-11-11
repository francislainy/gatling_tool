import React, {useEffect, useState} from 'react';
import Button from "react-bootstrap/Button";
import Popup from "./Popup";
import ReportTable from "./ReportTable";
import api from "../api/api";
import {createReport, deleteReport, retrieveReports} from "../api";
import ConfirmationModal from "./ConfirmationModal";

const {useHistory} = require('react-router-dom')

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
    let history = useHistory();

    const [showImportModal, setShowImportModal] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)
    const [file, setFile] = useState()
    const [idSelected, setIdSelected] = useState(0);
    const handleClick = (id) => {
        history.push(`/report/${id}`);
    }

    const handleDeletePopUp = (id) => {

        setIdSelected(id)

        setShowConfirmationModal(true)
    }

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

    const [reports, setReports] = useState(dataTableObj.reports)

    const onHide = (section) => {

        switch (section) {
            case 'import':
                setShowImportModal(false)
                break
            case 'delete':
                setShowConfirmationModal(false)
                break
        }
    }

    const onShow = () => {
        setShowImportModal(true);
    }

    const onFileAdded = (selectedFile) => {

        if (selectedFile !== null) {
            console.log('has file')
            setFile(selectedFile)
        }
    }

    const onConfirm = (inputValues) => {

        console.log('here')
        const currentDateTimestamp = moment().valueOf()

        let values = {
            "title": 'UNDEFINED',
            "runDate": file[0].lastModified, // Any index, as all the files are modified on the same test run
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
                            new api().submitHtmlIndex(reportId, file).then((response) => {
                                    console.log('report id ' + reportId + ' successfully created')
                                    onHide('import')
                                }
                            ).catch(reason => {
                                console.log(reason + ' reason here')
                            })
                        }
                    ).catch(reason => {
                        console.log(reason + ' reason here')
                    })
                }
            ).catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        });

    }

    const onConfirmDelete = () => {

        const urlAndPort = {
            url: "http://localhost",
            port: 8081,
            id: idSelected
        }

        deleteReport(urlAndPort).then(() => {

            const del = reports.filter(report => idSelected !== report.id)
            setReports(del)

            setShowConfirmationModal(false)
        })
    }

    useEffect(() => {

        const urlAndPort = {
            url: url,
            port: port,
        }

        retrieveReports(urlAndPort)

            .then(({data}) => {
                    setDataTableObj({...data, isFetching: true})
                }
            ).catch(reason => {
            console.log(reason + ' reason for failure on retrieving report table items')
        })

    }, [showImportModal === false])

    useEffect(() => {

        setReports(dataTableObj.reports)

    }, [dataTableObj.reports.length])

    return (
        <div>
            <div>
                <div className="d-flex" id="wrapper">
                    {/*<Sidebar/>*/}
                    <div id="page-content-wrapper">
                        <Navbar/>
                        <div style={{padding: 10}}>
                            <Button variant="warning" onClick={onShow}>Import Gatling Report</Button>
                        </div>
                        <Popup
                            show={showImportModal}
                            onHide={() => onHide("import")}
                            onConfirm={onConfirm}
                            onFileAdded={onFileAdded}
                        />
                        {/*if at least one item we can try and populate the table..*/}
                        {reports[0].id !== "" &&
                        <ReportTable
                            data={reports}
                            handleClick={handleClick}
                            handleDeletePopUp={handleDeletePopUp}
                        />
                        }
                        <ConfirmationModal
                            showHeader={false}
                            show={showConfirmationModal}
                            onHide={() => onHide("delete")}
                            onConfirm={onConfirmDelete}
                            ok={'OK'}
                            cancel={'Cancel'}
                            body={'Are you sure you want to delete this item?'}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home