import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch, useHistory} from "react-router-dom";

function Content(){
    let history = useHistory();

    function handleClick() {
        history.push("/report");
    }

    return (
        <div>
            <button onClick={handleClick}>Click me</button>
        </div>
    )

}

export default Content