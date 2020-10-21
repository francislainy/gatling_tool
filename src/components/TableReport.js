import React, {useEffect, useState} from 'react';
import api from "../api/api";

export default function TableReport({match, onRetrieveInfo}) {

    const [stats, setStats] = useState({
            "stats": [
                {
                    "name": "name",
                    "id": "id",
                    "reportId": "reportId",
                    "numberOfRequests": {
                        "total": 2683,
                        "ok": 2683,
                        "ko": 0
                    },
                    "percentiles1": {
                        "total": 0,
                        "ok": 0,
                        "ko": 0
                    },
                    "percentiles2": {
                        "total": 0,
                        "ok": 0,
                        "ko": 0
                    },
                    "percentiles3": {
                        "total": 0,
                        "ok": 0,
                        "ko": 0
                    },
                    "percentiles4": {
                        "total": 0,
                        "ok": 0,
                        "ko": 0
                    }
                }
            ]
        , isFetching: false
    });

    useEffect(() => {

        new api().retrieveStatsForReport(match.params.id)

            .then(({data}) => {

                    const newData = {
                        ...data

                    }

                    setStats({stats: newData, isFetching: true})

                    onRetrieveInfo(data)
                }
            )

    }, [])

    const getHeader = function () {
        return (
            <tr>
                <th scope="col">Category</th>
                <th scope="col">Request</th>
                <th scope="col">Endpoint</th>
                <th scope="col">Path</th>
                <th scope="col">RPS</th>
                <th scope="col">50th Percentile</th>
                <th scope="col">75th Percentile</th>
                <th scope="col">95th Percentile</th>
                <th scope="col">99th Percentile</th>
                <th scope="col">Total Requests</th>
                <th scope="col">Failed Requests</th>
                <th scope="col">Actions</th>
            </tr>
        )
    }

    const getRowsData = () => {
        return stats.stats.map((stats, i) => {
            return <>
                <tbody>
                {/*First item is the global info already displayed on the top of the page*/}
                {i !== 0 &&
                <tr>
                    <td scope="col">Set category name here</td>
                    <td scope="col">{stats.name}</td>
                    <td scope="col">Set endpoint</td>
                    <td scope="col">Set path</td>
                    <td scope="col">Set RPS</td>
                    <td scope="col">{stats.percentiles1.ok}</td>
                    <td scope="col">{stats.percentiles2.ok}</td>
                    <td scope="col">{stats.percentiles3.ok}</td>
                    <td scope="col">{stats.percentiles4.ok}</td>
                    <td scope="col">{stats.numberOfRequests.total}</td>
                    <td scope="col">{stats.numberOfRequests.ko}</td>
                </tr>
                }
                </tbody>
            </>;
        })
    }

    return (
        <table className="table">
            <thead className="thead-light">
            {getHeader()}
            </thead>
            {getRowsData()}
        </table>
    );
}