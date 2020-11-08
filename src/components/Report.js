import React, {useEffect, useState} from "react";
import {Card} from "react-bootstrap";
import {Settings} from "@material-ui/icons";
import '../css/CustomStyle.css'
import StatsTable from "./StatsTable";
import ReportPopup from "./ReportPopup";
import {CSVLink} from "react-csv";
import {retrieveReportItem, updateReport} from "../api";
import IconButton from "@material-ui/core/IconButton";

const moment = require("moment");
const url = "http://localhost"
const port = 8081

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
        },
        "numberOfUsers": '',
        "duration": ''
        , isFetching: false
    });

    const [show, setShow] = useState(false);

    const handleHide = () => {
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
            },
            "numberOfUsers": report.numberOfUsers,
            "duration": report.duration,
            isFetching: false
        }

        const urlAndPort = {
            url: url,
            port: port,
            id: match.params.id,
            payload: updatedValues
        }

        updateReport(urlAndPort)

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

        const urlAndPort = {
            url: url,
            port: port,
            id: match.params.id
        }

        retrieveReportItem(urlAndPort)

            .then(({data}) => {

                    setReport({...data, isFetching: true})
                }
            )
    }, [report.id])

    function getDateFormatted(dateTimeStamp) {

        const date = moment(dateTimeStamp).format('DD-MMM-YYYY HH:mm:ss');

        return <> {date}</>;
    }

    function getGlobalStats(data) {

        let index
        data.stats.forEach((stats, i) => {
            if (stats.name === 'Global Information') {
                index = i
            }
        })

        return (
            <div>
                {data.stats !== undefined && index !== undefined &&
                <div>
                    <div> Total Requests: {data.stats[index].numberOfRequests.total}</div>
                    <div>Total Failed Requests: {data.stats[index].numberOfRequests.ko}</div>
                    <div>Number of users: {report.numberOfUsers}</div>
                    <div>Duration: {report.duration} seconds</div>
                </div>
                }
            </div>
        )
    }

    const onRetrieveInfo = (data) => {
        setData(data)
    }

    const headers = [
        {label: "id", key: "id"},
        {label: "reportId", key: "reportId"},
        {label: "name", key: "name"},
        {label: "number of requests", key: "numberOfRequests.total"},
        {label: "number of successful requests", key: "numberOfRequests.ok"},
        {label: "number of failed requests", key: "numberOfRequests.ko"},
        {label: "min Response time total", key: "minResponseTime.total"},
        {label: "min Response time ok", key: "minResponseTime.ok"},
        {label: "min Response time ko", key: "minResponseTime.ko"},
        {label: "max Response time total", key: "maxResponseTime.total"},
        {label: "max Response time ok", key: "maxResponseTime.ok"},
        {label: "max Response time ko", key: "maxResponseTime.ko"},
        {label: "mean Response time total", key: "meanResponseTime.total"},
        {label: "mean Response time ok", key: "meanResponseTime.ok"},
        {label: "mean Response time ko", key: "meanResponseTime.ko"},
        {label: "standard deviation total", key: "standardDeviation.total"},
        {label: "standard deviation ok", key: "standardDeviation.ok"},
        {label: "standard deviation ko", key: "standardDeviation.ko"},
        {label: "percentiles1 total", key: "percentiles1.total"},
        {label: "percentiles 1 ok", key: "percentiles1.ok"},
        {label: "percentiles 1 ko", key: "percentiles1.ko"},
        {label: "percentiles2 total", key: "percentiles2.total"},
        {label: "percentiles 2 ok", key: "percentiles2.ok"},
        {label: "percentiles 2 ko", key: "percentiles2.ko"},
        {label: "percentiles3 total", key: "percentiles3.total"},
        {label: "percentiles 3 ok", key: "percentiles3.ok"},
        {label: "percentiles 3 ko", key: "percentiles3.ko"},
        {label: "percentiles4 total", key: "percentiles4.total"},
        {label: "percentiles 4 ok", key: "percentiles4.ok"},
        {label: "percentiles 4 ko", key: "percentiles4.ko"},
        {label: "group1 name", key: "group1.name"},
        {label: "group1 count", key: "group1.count"},
        {label: "group1 percentage", key: "group1.percentage"},
        {label: "group2 name", key: "group2.name"},
        {label: "group2 count", key: "group2.count"},
        {label: "group2 percentage", key: "group2.percentage"},
        {label: "group3 name", key: "group3.name"},
        {label: "group3 count", key: "group3.count"},
        {label: "group3 percentage", key: "group3.percentage"},
        {label: "group4 name", key: "group4.name"},
        {label: "group4 count", key: "group4.count"},
        {label: "group4 percentage", key: "group4.percentage"},
        {label: "meanNumberOfRequestsPerSecond total", key: "meanNumberOfRequestsPerSecond.total"},
        {label: "meanNumberOfRequestsPerSecond ok", key: "meanNumberOfRequestsPerSecond.ok"},
        {label: "meanNumberOfRequestsPerSecond ko", key: "meanNumberOfRequestsPerSecond.ko"},
    ];

    return <div style={{margin: '10px 10px'}}>
        <div style={{display: 'flex', marginBottom: '10px'}}>
            <Card style={{width: '18rem'}}>
                {report.id !== '' &&
                <Card.Body>
                    <Card.Title>Report Details
                        <IconButton className="IconButton" onClick={() => handleShow()}>
                            <Settings/>
                        </IconButton>
                        <ReportPopup
                            show={show}
                            onHide={handleHide}
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
            <Card style={{width: '18rem', marginLeft: '10px', alignSelf: 'baseline'}}>
                {report.id !== '' &&
                <Card.Body>
                    <Card.Title>Information</Card.Title>
                    {data !== undefined &&
                    <Card.Text>
                        {getGlobalStats(data)}
                    </Card.Text>
                    }
                </Card.Body>
                }
            </Card>
            <Card style={{width: '18rem', marginLeft: '10px', alignSelf: 'baseline'}}>
                {report.id !== '' &&
                <Card.Body>
                    <Card.Title>Actions</Card.Title>
                    {data !== undefined &&
                    <Card.Text>
                        <CSVLink
                            style={{textDecoration: 'none'}}
                            className="button"
                            data={data.stats} headers={headers}>
                            Download CSV
                        </CSVLink>
                    </Card.Text>
                    }
                </Card.Body>
                }
            </Card>
        </div>
        <StatsTable match={match} onRetrieveInfo={onRetrieveInfo}/>
    </div>;
};

export default Report;