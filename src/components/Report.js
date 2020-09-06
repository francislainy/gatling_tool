import React from "react";

const Report = ({match}) => {
    return <div>Hello from report - {match.params.id}</div>;
};

export default Report;