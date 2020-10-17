import React, {useEffect, useState} from 'react';
import Button from "react-bootstrap/Button";
import Popup from "./Popup";
import MainTable from "./MainTable";
import api from "../api/api";

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

function Content() {
    const [show, setShow] = useState(false);

    const onHide = () => setShow(false);
    const onShow = () => {

        setShow(true);
    }

    const onConfirm = (inputValues) => {

        let values = {
            "title": 'na',
            "runDate": 'today',
            "createdDate": 'today',
            "category": {
                "id": inputValues.categoryId,
            }
        }

        new api().createReport(values)

            .then((response) => {

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

    const [dataTableObj, setDataTableObj] = useState({
        reports: {
            "id": "1",
            "title:": "name1",
            "created_date": "yesterday",
            "run_date": "today",
            "category": {
                "id": "25a030ad-ebc7-4749-bd3c-edd004628807",
                "title:": "name1"
            }
        }, isFetching: false
    });

    useEffect(() => {

        new api().retrieveTable()

            .then(({data}) =>
                setDataTableObj({reports: data.reports, isFetching: true})
            )

    }, [])

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
                        />
                        {/*if at least one item we can try and populate the table..*/}
                        {dataTableObj !== undefined && dataTableObj.reports[0] !== undefined &&
                        <MainTable dataTableObj={dataTableObj}/>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Content