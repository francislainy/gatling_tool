import React from 'react';

export default function TableReport(props) {

    const getHeader = function () {
        return (
            <tr>
                <th scope="col">Category</th>
                <th scope="col">Request</th>
                <th scope="col">Endpoint</th>
                <th scope="col">Path</th>
                <th scope="col">RPS</th>
                <th scope="col">95th Percentile</th>
                <th scope="col">99th Percentile</th>
                <th scope="col">Total Requests</th>
                <th scope="col">Failed Requests</th>
                <th scope="col">Actions</th>
            </tr>
        )
    }

    const getRowsData = function () {
        return (
            <tr>
                <td scope="col">{props.data.stats.minResponseTime.total}</td>
                <td scope="col">{props.data.contents.group_login.stats.name}</td>
                <td scope="col">{props.data.stats.minResponseTime.total}</td>
                <td scope="col">{props.data.stats.minResponseTime.total}</td>
                <td scope="col">{props.data.stats.minResponseTime.total}</td>
                <td scope="col">{props.data.stats.percentiles3.total}</td>
                <td scope="col">{props.data.stats.percentiles4.total}</td>
                <td scope="col">{props.data.contents.group_login.stats.numberOfRequests.total}</td>
                <td scope="col">{props.data.contents.group_login.stats.numberOfRequests.ko}</td>
                <td scope="col">{props.data.contents.group_login.stats.numberOfRequests.ko}</td>
            </tr>
        )
    }

    return (
        <table className="table">
            <thead className="thead-light">
            {getHeader()}
            </thead>
            <tbody>
            {getRowsData()}
            </tbody>
        </table>
    );
}