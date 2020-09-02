import React from "react";

const Popup = (props) => {
    return (
        <div style={{zIndex:1}}>
            <p>{props.message}</p>
            <button onClick={props.closeMe}>Close Popup</button>
        </div>
    );
}

export default Popup