import React, {useEffect, useState} from "react";
import {Delete, Visibility} from "@material-ui/icons";
import {IconButton} from "@material-ui/core";
import ConfirmationModal from './ConfirmationModal';
import {deleteReport} from "../api";
import {columns} from '../dataSource';

const {useHistory} = require('react-router-dom')
const {useTable, useSortBy} = require('react-table')

const moment = require("moment")
const url = "http://localhost"
const port = 8081

const ReportTable = ({dataTableObj}) => {

    const [reports, setReports] = useState(dataTableObj.reports)
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)
    const [idSelected, setIdSelected] = useState(0);

    const getInitialData = () => reports.map(report => ({
        name: report.title,
        runDate: report.runDate,
        createdDate: report.createdDate,
        category: report.category.title,
        actions: report.id,
    }));

    const [data, setData] = useState(getInitialData)

    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = useTable(
        {columns, data},
        useSortBy);

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
            <table {...getTableProps()} className="table table-bordered margin10 tableReport">
                <thead className="thead-dark">
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps(column.getSortByToggleProps())}
                                onClick={() => column.toggleSortBy(!column.isSortedDesc)}>
                                {column.render('Header')}
                                <span>
                                    {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                                </span>
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            <td>{row.original.name}</td>
                            <td>{getDateFormatted(row.original.runDate)}</td>
                            <td>{getDateFormatted(row.original.createdDate)}</td>
                            <td>{row.original.category}</td>
                            <td>
                                <IconButton onClick={() => handleClick(row.original.actions)}>
                                    <Visibility/>
                                </IconButton>
                                <IconButton onClick={() => handleDeletePopUp(row.original.actions)}>
                                    <Delete/>
                                </IconButton>
                            </td>
                        </tr>
                    )
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