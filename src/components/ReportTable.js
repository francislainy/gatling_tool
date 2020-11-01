import React, {useEffect, useState} from "react";
import {Delete, Visibility} from "@material-ui/icons";
import {IconButton} from "@material-ui/core";
import ConfirmationModal from './ConfirmationModal';
import {deleteReport} from "../api";
import {columns} from '../dataSource';
import * as PropTypes from "prop-types";

const {useHistory} = require('react-router-dom')
const {useTable, useSortBy, usePagination} = require('react-table')

const moment = require("moment")
const url = "http://localhost"
const port = 8081

class TablePagination extends React.Component {
    render() {
        return <div>
            <button className="paging" onClick={this.props.onClick} disabled={!this.props.canPreviousPage}>
                {"<<"}
            </button>
            {" "}
            <button onClick={this.props.onClick1} disabled={!this.props.canPreviousPage}>
                {"<"}
            </button>
            {" "}
            <button onClick={this.props.onClick2} disabled={!this.props.canNextPage}>
                {">"}
            </button>
            {" "}
            <button onClick={this.props.onClick3} disabled={!this.props.canNextPage}>
                {">>"}
            </button>
            {" "}
            <span>
          Page{" "}
                <strong>
            {this.props.pageIndex + 1} of {this.props.pageOptions.length}
          </strong>{" "}
        </span>
            <span>
          | Go to page:{" "}
                <input
                    type="number"
                    defaultValue={this.props.pageIndex + 1}
                    onChange={this.props.onChange}
                    style={{width: "100px"}}
                />
        </span>{" "}
            <select
                value={this.props.value}
                onChange={this.props.onChange1}
            >
                {[5, 10, 20, 30, 40, 50].map(this.props.callbackfn)}
            </select>
        </div>;
    }
}

TablePagination.propTypes = {
    onClick: PropTypes.func,
    canPreviousPage: PropTypes.any,
    onClick1: PropTypes.func,
    onClick2: PropTypes.func,
    canNextPage: PropTypes.any,
    onClick3: PropTypes.func,
    pageIndex: PropTypes.any,
    pageOptions: PropTypes.any,
    onChange: PropTypes.func,
    value: PropTypes.any,
    onChange1: PropTypes.func,
    callbackfn: PropTypes.func
};
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
            initialState: {pageIndex: 0}
        },
        useSortBy,
        usePagination);

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
            <TablePagination onClick={() => gotoPage(0)} canPreviousPage={canPreviousPage}
                             onClick1={() => previousPage()} onClick2={() => nextPage()} canNextPage={canNextPage}
                             onClick3={() => gotoPage(pageCount - 1)} pageIndex={pageIndex} pageOptions={pageOptions}
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