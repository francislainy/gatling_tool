import React, {useEffect, useRef, useState} from "react";
import {Card} from "react-bootstrap";
import {Settings} from "@material-ui/icons";
import '../css/CustomStyle.css'
import MyIconButton from "./MyIconButton";
import TableReport from "./TableReport";
import simulation from "../helper/simulation.json"
import ToolDataService from "../api/api";
import ReportPopup from "./ReportPopup";

const Report = ({match}) => {

    const data = simulation

    const [report, setReport] = useState({
        "id": "",
        "title": "",
        "runDate": "",
        "createdDate": "",
        "category": {
            "id": "",
            "title": ""
        }, isFetching: false
    });

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false)
    }

    const onHandleUpdate = (inputValues) => {
        setShow(false)

        let updatedValues = {
            "id": report.id,
            "title": inputValues.reportTitle,
            "runDate": report.runDate,
            "createdDate": report.createdDate,
            "category": {
                "id": inputValues.categoryId,
                "title": inputValues.categoryTitle
            }, isFetching: false
        }

        new ToolDataService().updateReport(match.params.id, updatedValues)

            .then((response) => {

                    setReport(prevState => {
                        return {...prevState, ...updatedValues};
                    });

                    console.log(response)
                }
            ).catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        });
    }


    const handleShow = () => {

        setShow(true);
    }

    useEffect(() => {

        new ToolDataService().retrieveReportItem(match.params.id)

            .then(({data}) => {

                    setReport({...data, isFetching: true})

                    console.log(report.category.title)
                }
            )
    }, [report.id])

    return <div>Hello from report - {match.params.id}

        <Card style={{width: '18rem'}}>
            {report.id !== '' &&
            <Card.Body>
                <Card.Title>Report Details
                    <MyIconButton className="IconButton">
                        <Settings onClick={() => handleShow()}/>
                    </MyIconButton>
                    <ReportPopup
                        show={show}
                        onHide={handleClose}
                        onHandleUpdate={onHandleUpdate}
                        report={report}/>
                </Card.Title>
                <Card.Text>
                    Report name: {report.title}
                </Card.Text>
                <Card.Text>
                    Time Run: {report.runDate}
                </Card.Text>
                <Card.Text>
                    Time Imported: {report.createdDate}
                </Card.Text>
                <Card.Text>
                    Category: {report.category.title}
                </Card.Text>
            </Card.Body>
            }
        </Card>


        <TableReport data={data} match={match}/>

    </div>;
};

export default Report;