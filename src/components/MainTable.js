import React from "react";
import {Delete, Visibility} from "@material-ui/icons";
import {IconButton} from "@material-ui/core";
import api from "../api/api";
import {useHistory} from "react-router-dom";

const MainTable = ({dataTableObj}) => {
    let history = useHistory();

    function handleClick(id) {
        history.push(`/report/${id}`);
    }

    const handleDelete = (id) => {
        new api().deleteReport(id).then(r => console.log(r + ' deleted'))
    }

    return (
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
            {dataTableObj.reports.map((item, i) => {
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
                            <Delete onClick={() => handleDelete(item.id)}/>
                        </IconButton>
                    </tr>
                ];
            })}
            </tbody>

        </table>
    )
}

export default MainTable