import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {CustomDropdown} from "./CustomDropdown";

const Popup = (props) => {

    const reportTitle = props.report.title
    const categoryTitle = props.report.category.title

    const [inputValues, setInputValues] = useState({

        reportTitle: reportTitle, categoryTitle: categoryTitle
    });

    const onChangeHandler = event => {
        const {name, value} = event.target;
        setInputValues({...inputValues, [name]: value});
    };

    return (
        <Modal show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Report</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input name={"reportTitle"} style={{width: "100%", marginBottom: "20px"}}
                       onChange={onChangeHandler}
                       value={inputValues.reportTitle}
                />
                <input name={"categoryTitle"} style={{width: "100%"}}
                       onChange={onChangeHandler}
                       value={inputValues.categoryTitle}
                />
                <CustomDropdown />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-primary" onClick={() => props.onHide(inputValues)}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Popup
