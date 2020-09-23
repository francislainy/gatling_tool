import React, {useEffect, useState} from "react";
import {Card} from "react-bootstrap";
import {Settings} from "@material-ui/icons";
import '../css/CustomStyle.css'
import MyIconButton from "./MyIconButton";
import TableReport from "./TableReport";
import simulation from "../helper/simulation.json"
import ToolDataService from "../api/ToolDataService";
import ReportPopup from "./ReportPopup";

const Report = ({match}) => {

    const data = simulation

    const [report, setReport] = useState({
        report: {
            "id": "1051f092-f5fa-438c-8912-7124d1262871",
            "title": "My hardcoded report",
            "runDate": "today",
            "createdDate": "today",
            "category": {
                "id": "25a030ad-ebc7-4749-bd3c-edd004628807",
                "title": "My new category"
            }
        }, isFetching: false
    });

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {

        setShow(true);
    }

    useEffect(() => {

        ToolDataService.retrieveReportItem(match.params.id)

            .then(({data}) =>

                setReport({report: data, isFetching: true})
            )

    }, [])


    return <div>Hello from report - {match.params.id}
        <Card style={{width: '18rem'}}>
            <Card.Body>
                <Card.Title>Report Details
                    <MyIconButton className="IconButton">
                        <Settings onClick={() => handleShow()}/>
                    </MyIconButton>
                    <ReportPopup show={show} onHide={handleClose}/>
                </Card.Title>
                <Card.Text>
                    Report name: {report.report.title}
                </Card.Text>
                <Card.Text>
                    Time Run: {report.report.runDate}
                </Card.Text>
                <Card.Text>
                    Time Imported: {report.report.createdDate}
                </Card.Text>
                <Card.Text>
                    Category: {report.report.category.title}
                </Card.Text>
            </Card.Body>
        </Card>

        <TableReport data={data}/>

    </div>;
};

export default Report;