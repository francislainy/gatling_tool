import React, {useEffect, useState} from "react";
import {Delete, Visibility} from "@material-ui/icons";
import {IconButton} from "@material-ui/core";
// import {useHistory} from "react-router-dom";
import ConfirmationModal from './ConfirmationModal';
import api from "../api/api";
import {deleteReport} from "../api";
const {useHistory} = require('react-router-dom')

const moment = require("moment")
const url = "http://localhost"
const port = 8081

const ReportTable = ({dataTableObj}) => {

    const [reports, setReports] = useState(dataTableObj.reports)
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)
    const [idSelected, setIdSelected] = useState(0);

    const onHide = () => setShowConfirmationModal(false);

    useEffect(() => {

        setReports(dataTableObj.reports)

    }, [dataTableObj.reports]);

    let history = useHistory();

    function handleClick(id) {
        history.push(`/report/${id}`);
    }

    const handleDeletePopUp = (id) => {

        setIdSelected(id)

        setShowConfirmationModal(true)
    }

    const onConfirmDelete = () => {

        const urlAndPort = {
            url: url,
            port: port,
            id: idSelected
        }

        deleteReport(urlAndPort).then(() => {

            const del = reports.filter(report => idSelected !== report.id)
            setReports(del)

            setShowConfirmationModal(false)
        })
    }


    function getDateFormatted(dateTimeStamp) {

        const date = moment(dateTimeStamp).format('DD-MM-YYYY HH:mm:ss');

        return <> {date}</>;
    }

    return (
        <div>
            <table className="table table-bordered margin10 tableReport">
                <thead className="thead-dark">
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Run Date</th>
                    <th scope="col">Created</th>
                    <th scope="col">Category</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {reports.map((item) => {
                    return [
                        <tr key={item.id}>
                            <td>{item.title}</td>
                            <td>{getDateFormatted(item.runDate)}</td>
                            <td>{getDateFormatted(item.createdDate)}</td>
                            <td>{item.category.title}</td>
                            <td><IconButton onClick={() => handleClick(item.id)}>
                                <Visibility/>
                            </IconButton>
                                <IconButton onClick={() => handleDeletePopUp(item.id)}>
                                    <Delete/>
                                </IconButton>
                            </td>
                        </tr>
                    ];
                })}
                </tbody>
            </table>
            <ConfirmationModal
                showHeader={false}
                show={showConfirmationModal}
                onHide={onHide}
                onConfirm={onConfirmDelete}
                ok={'OK'}
                cancel={'Cancel'}
                body={'Are you sure you want to delete this item?'}
            />
        </div>
    )
}

export default ReportTable