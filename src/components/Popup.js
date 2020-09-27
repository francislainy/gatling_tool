import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {CustomDropdown} from "./CustomDropdown";
import FileUpload from "./FileUpload";

const Popup = (props) => {

    const [data, setData] = useState({categories: [], isFetching: false});

    const onHide = props.handleClose
    const show = props.show

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Select Gatling Report Folder {data.categories[0]}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FileUpload onClick={onHide}/>
                <br/>
                <CustomDropdown/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={onHide}>
                    Cancel
                </Button>
                <Button variant="outline-primary" onClick={onHide}>
                    OK
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Popup
