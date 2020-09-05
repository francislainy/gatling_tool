import React from "react";
import {Delete, Visibility} from "@material-ui/icons";

const MainTable = ({dataTableObj}) => {

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
                        <td>{item.created_date}</td>
                        <td>{item.category}</td>
                        <td>{item.run_date}</td>
                        <Visibility/>
                        <Delete/>
                    </tr>
                ];
            })}
            </tbody>

        </table>
    )
}

export default MainTable