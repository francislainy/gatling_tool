import React, {useEffect, useState} from "react";
import {Card} from "react-bootstrap";
import {Settings} from "@material-ui/icons";
import '../css/CustomStyle.css'
import MyIconButton from "./MyIconButton";
import TableReport from "./TableReport";
import api from "../api/api";
import ReportPopup from "./ReportPopup";

const moment = require("moment");

const Report = ({match}) => {

    const [data, setData] = useState()

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
        console.log('entered handle update')

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

        new api().updateReport(match.params.id, updatedValues)

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

        new api().retrieveReportItem(match.params.id)

            .then(({data}) => {

                    setReport({...data, isFetching: true})
                }
            )
    }, [report.id])

    function getDateFormatted(dateTimeStamp) {

        const date = moment(dateTimeStamp).format('MM-DD-YYYY HH:mm:ss');

        return <> {date}</>;
    }

    function getGlobalStats(data) {
        return <div>
            {/*first of the list is the total global amount*/}
            <div> Total Requests: {data.stats[0].numberOfRequests.total}</div>
            <div>Total Failed Requests: {data.stats[0].numberOfRequests.ko}</div>
        </div>;
    }

    const onRetrieveInfo = (data) => {
        setData(data)
    }

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
                    Time Run: {getDateFormatted(report.runDate)}
                </Card.Text>
                <Card.Text>
                    Time Imported: {getDateFormatted(report.createdDate)}
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