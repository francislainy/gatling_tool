import React, {useEffect, useState} from 'react';
import api from "../api/api";

export default function TableReport({match}) {

    const [stats, setStats] = useState({
        stats: {
            "stats": [
                {
                    "name": "name",
                    "id": "id",
                    "reportId": "reportId",
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
        }, isFetching: false
    });

    useEffect(() => {

        new api().retrieveStatsForReport(match.params.id)

            .then(({data}) =>

                setStats({stats: data, isFetching: true})
            )

        console.log(stats.stats[0])

    }, [])


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

    const getRowsData = () => {
        return stats.stats.stats.map(stats => {
            return <>
                <tbody>
                <tr>
                    <td scope="col">Set category name here</td>
                    <td scope="col">{stats.name}</td>
                    <td scope="col">Set endpoint</td>
                    <td scope="col">Set path</td>
                    <td scope="col">Set RPS</td>
                    <td scope="col">{stats.percentiles3.ok}</td>
                    <td scope="col">{stats.percentiles4.ok}</td>
                </tr>
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