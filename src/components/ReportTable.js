import React, {useEffect, useState} from "react";
import {Delete, Visibility} from "@material-ui/icons";
import {IconButton} from "@material-ui/core";
import ConfirmationModal from './ConfirmationModal';
import {deleteReport} from "../api";
import {columns} from '../dataSource';
import {TablePagination} from "./TablePagination";
import DefaultColumnFilter from "./FilterInputTable";

const {useHistory} = require('react-router-dom')
const {useTable, useSortBy, usePagination, useFilters, useGlobalFilter} = require('react-table')

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

    const filterTypes = React.useMemo(
        () => ({
            text: (rows, id, filterValue) => {
                return rows.filter(row => {
                    const rowValue = row.values[id];
                    return rowValue !== undefined
                        ? String(rowValue)
                            .toLowerCase()
                            .startsWith(String(filterValue).toLowerCase())
                        : true;
                });
            }
        }),
        []
    );

    const defaultColumn = React.useMemo(
        () => ({
            Filter: DefaultColumnFilter
        }),
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: {pageIndex, pageSize}
    } = useTable(
        {
            columns,
            data,
            initialState: {pageIndex: 0},
            defaultColumn,
            filterTypes
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination,
    );

    const onHide = () => setShowConfirmationModal(false);

    useEffect(() => {

        setReports(dataTableObj.reports)

    }, [dataTableObj.reports]);

    let history = useHistory();

    const handleClick = (id) => {
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

    const getDateFormatted = (dateTimeStamp) => {

        const date = moment(dateTimeStamp).format('DD-MM-YYYY HH:mm:ss');

        return <> {date}</>;
    }

    return (
        <div className="margin10">
            <table {...getTableProps()} className="table table-bordered tableReport">
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
                                {
                                    column.Header !== "Actions" &&
                                    <div>{column.canFilter ? column.render("Filter") : null}</div>
                                }
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {page.map((row, i) => {
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
            <div className="tablePagination">
                <TablePagination onClick={() => gotoPage(0)} canPreviousPage={canPreviousPage}
                                 onClick1={() => previousPage()} onClick2={() => nextPage()} canNextPage={canNextPage}
                                 onClick3={() => gotoPage(pageCount - 1)} pageIndex={pageIndex}
                                 pageOptions={pageOptions}
                                 onChange={e => {
                                     const page = e.target.value ? Number(e.target.value) - 1 : 0;
                                     gotoPage(page);
                                 }} value={pageSize} onChange1={e => {
                    setPageSize(Number(e.target.value));
                }} callbackfn={pageSize => (
                    <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                    </option>
                )}/>
            </div>
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