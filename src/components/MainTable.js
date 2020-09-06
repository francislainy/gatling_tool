import React from "react";
import {Delete, Visibility} from "@material-ui/icons";
import {IconButton} from "@material-ui/core";
import ToolDataService from "./api/ToolDataService";
import {useHistory} from "react-router-dom";

const MainTable = ({dataTableObj}) => {
    let history = useHistory();

    function handleClick(id) {
        history.push(`/report/${id}`);
    }

    const handleDelete = (id) => {
        ToolDataService.deleteTable(id).then(r => console.log(r + ' deleted'))
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
            {dataTableObj.table_items.map((item, i) => {
                return [
                    <tr key={i}>
                        <td>{item.name}</td>
                        <td>{item.run_date}</td>
                        <td>{item.created_date}</td>
                        <td>{item.category}</td>
                        <IconButton>
                            <Visibility onClick={() => handleClick(item.id)} />
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