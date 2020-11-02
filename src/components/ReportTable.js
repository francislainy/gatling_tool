import React, {useEffect, useState} from "react";
import {Delete} from "@material-ui/icons";
import {IconButton} from "@material-ui/core";
import {deleteReport} from "../api";
import {columns} from '../dataSource';

const {useTable} = require('react-table')

const MainTable = ({dataTableObj}) => {

    const [reports, setReports] = useState(dataTableObj.reports)

    const getInitialData = () => reports.map(report => ({
        name: report.title,
        runDate: report.runDate,
        createdDate: report.createdDate,
        category: report.category.title,
        actions: report.id,
    }));

    const [data, setData] = useState(getInitialData)

    const {
        getTableProps,
        getTableBodyProps,
        rows,
        prepareRow,
    } = useTable(
        {
            columns,
            data,
        }
    );

    useEffect(() => {

        setReports(dataTableObj.reports)

    }, [dataTableObj.reports]);

    const onConfirmDelete = (id) => {

        const axiosParams = {
            url: url,
            port: port,
            id: id
        }

        deleteReport(axiosParams).then(() => {

            const del = reports.filter(report => id !== report.id)
            setReports(del)

        })
    }

    return (
        <div>
            <table {...getTableProps()}>
                <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            <td>{row.original.name}</td>
                            <td>
                                <IconButton onClick={() => onConfirmDelete(row.original.actions)}>
                                    <Delete/>
                                </IconButton>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
                <tbody>
                {/*{reports.map((item) => {*/}
                {/*    return [*/}
                {/*        <tr key={item.id}>*/}
                {/*            <td>{item.title}</td>*/}
                {/*            <td>*/}
                {/*                <IconButton onClick={() => onConfirmDelete(item.id)}>*/}
                {/*                    <Delete/>*/}
                {/*                </IconButton>*/}
                {/*            </td>*/}
                {/*        </tr>*/}
                {/*    ];*/}
                {/*})}*/}
                </tbody>
            </table>
        </div>
    )
}

export default MainTable
