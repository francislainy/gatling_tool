import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import FileDialogue from "./FileDialogue";
import {CustomDropdown} from "./CustomDropdown";
import FileUpload from "./FileUpload";

const Popup = (props) => {

    const [data, setData] = useState({categories: [], isFetching: false});

    const hide = props.onHide
    const show = props.show

    return (
        <Modal show={props.show} onHide={hide}>
            <Modal.Header closeButton>
                <Modal.Title>Select Gatling Report Folder {data.categories[0]}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FileUpload handleShow={props}/>
                <br/>
                <CustomDropdown/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={hide}>
                    Cancel
                </Button>
                <Button variant="outline-primary" onClick={hide}>
                    OK
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Popup
