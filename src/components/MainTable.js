import React, {useState} from "react";
import {Delete, Visibility} from "@material-ui/icons";
import {IconButton} from "@material-ui/core";
import api from "../api/api";
import {useHistory} from "react-router-dom";
import ConfirmationModal from './ConfirmationModal';

const MainTable = ({dataTableObj}) => {

    const [reports, setReports] = useState(dataTableObj.reports)
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)

    const onHide = () => setShowConfirmationModal(false);

    const [idSelected, setIdSelected] = useState(0);

    let history = useHistory();

    function handleClick(id) {
        history.push(`/report/${id}`);
    }

    const handleDeletePopUp = (id) => {

        setIdSelected(id)

        setShowConfirmationModal(true)
    }

    const onConfirm = () => {
        new api().deleteReport(idSelected).then(() => {

            const del = reports.filter(report => idSelected !== report.id)
            setReports(del)

            setShowConfirmationModal(false)
        })
    }

    return (
        <div>
            <table className="table">
                <thead className="thead-light">
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
                            <td>{item.runDate}</td>
                            <td>{item.createdDate}</td>
                            <td>{item.category.title}</td>
                            <IconButton>
                                <Visibility onClick={() => handleClick(item.id)}/>
                            </IconButton>
                            <IconButton>
                                <Delete onClick={() => handleDeletePopUp(item.id)}/>
                            </IconButton>
                        </tr>
                    ];
                })}
                </tbody>
            </table>
            <ConfirmationModal
                showHeader={false}
                show={showConfirmationModal}
                onHide={onHide}
                onConfirm={onConfirm}
                ok={'OK'}
                cancel={'Cancel'}
                body={'Are you sure you want to delete this item?'}
            />
        </div>
    )
}

export default MainTable