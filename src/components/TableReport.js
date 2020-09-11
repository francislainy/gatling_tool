import React from 'react';

export default function TableReport(props) {
    
    const getKeys = function () {
        return Object.keys(props.data[0]);
    }

    const getHeader = function () {
        const keys = getKeys();
        return keys.map((key, index) => {
            return <th key={key}>{key.toUpperCase()}</th>
        })
    }

    const getRowsData = function () {
        const items = props.data;
        const keys = getKeys();
        return items.map((row, index) => {
            return <tr key={index}><RenderRow key={index} data={row} keys={keys}/></tr>
        })
    }

    return (
        <div>
            <table>
                <thead>
                <tr>{getHeader()}</tr>
                </thead>
                <tbody>
                {getRowsData()}
                </tbody>
            </table>
        </div>

    );

}

const RenderRow = (props) => {
    return props.keys.map((key, index) => {
        return <td key={props.data[key]}>{props.data[key]}</td>
    })
}