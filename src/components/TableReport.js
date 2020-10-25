import React, {useEffect, useState} from 'react';
import api from "../api/api";
import {IconButton} from "@material-ui/core";
import {Edit, Delete, Save} from "@material-ui/icons";
import ConfirmationModal from "./ConfirmationModal";

export default function TableReport({match, onRetrieveInfo}) {

    const [stats, setStats] = useState({
        "stats": [
            {
                "name": "",
                "id": "",
                "reportId": "",
                "endpoint": "",
                "numberOfRequests": {
                    "total": 0,
                    "ok": 0,
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
        ], isFetching: false
    });

    const [endpoint, setEndpoint] = useState({"endpoint": ""});
    const [idSelected, setIdSelected] = useState(0);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)
    const onHide = () => setShowConfirmationModal(false);
    const [showInputEndpoint, setShowInputEndpoint] = useState(false)

    useEffect(() => {

        new api().retrieveStatsForReport(match.params.id)

            .then(({data}) => {

                    setStats({stats: data.stats, isFetching: true})

                    onRetrieveInfo(data)
                }
            )

    }, [showInputEndpoint === false])

    const handleShowUpdateStats = () => {

        setShowInputEndpoint(true)
    }

    const updateStats = (idSelected) => {

        setShowInputEndpoint(true)

        new api().updateStatsEndpoint(idSelected, endpoint)

            .then((response) => {
                    setEndpoint(endpoint);
                    setShowInputEndpoint(false)
                }
            ).catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        });

    }

    const onConfirmDelete = () => {
        new api().deleteStats(idSelected).then(() => {

            const del = stats.stats.filter(stats => idSelected !== stats.id)

            setStats({stats: del, isFetching: true});

            setShowConfirmationModal(false)
        })
    }

    const handleDeletePopUp = (id) => {

        setIdSelected(id)

        setShowConfirmationModal(true)
    }

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
                    <td scope="col">{handleEndpoint(stats.endpoint)}</td>
                    <td scope="col">Set path</td>
                    <td scope="col">Set RPS</td>
                    <td scope="col">{stats.percentiles1.ok}</td>
                    <td scope="col">{stats.percentiles2.ok}</td>
                    <td scope="col">{stats.percentiles3.ok}</td>
                    <td scope="col">{stats.percentiles4.ok}</td>
                    <td scope="col">{stats.numberOfRequests.total}</td>
                    <td scope="col">{stats.numberOfRequests.ko}</td>
                    <IconButton onClick={() => {
                        handleDeletePopUp(stats.id)
                    }}>
                        <Delete/>
                    </IconButton>
                    {!showInputEndpoint && <IconButton onClick={() => {
                        handleShowUpdateStats()
                    }}>
                        <Edit/>
                    </IconButton>
                    }
                    {showInputEndpoint && <IconButton onClick={() => {
                        updateStats(stats.id)
                    }}>
                        <Save/>
                    </IconButton>
                    }
                </tr>
                }
                </tbody>
            </>;
        })
    }

    const onChangeHandler = event => {
        const {value} = event.target;

        setEndpoint({endpoint: value});
    };

    const handleEndpoint = (endpoint) => {

        if (showInputEndpoint) {
            return <input defaultValue={endpoint} onChange={onChangeHandler}/>
        } else {
            return <span>{endpoint}</span>
        }
    }

    return (
        <div>
            <table className="table">
                <thead className="thead-dark">
                {getHeader()}
                </thead>
                {getRowsData()}
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
    );
}