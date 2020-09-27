import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import FileDialogue from "./FileDialogue";
import {CustomDropdown} from "./CustomDropdown";
import FileUpload from "./FileUpload";


const Popup = (props) => {

    const [data, setData] = useState({categories: [], isFetching: false});
    const [show, setShow] = useState(false)

    const hide = props.onHide

    const handleImportFile = () => {

        setShow(prevState => !prevState)
    }

    const handleOkay = () => {



        hide()
    }

    return (
        <Modal show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Select Gatling Report Folder {data.categories[0]}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/*<FileDialogue/>*/}
                <CustomDropdown/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={props.onHide}>
                    Cancel
                </Button>
                <Button variant="outline-primary" onClick={() => handleOkay(props)}>
                    OK
                </Button>
                <Button variant="outline-primary" onClick={handleImportFile}>
                    Import
                </Button>
                <FileUpload onClike={props.hide}/>



            </Modal.Footer>
        </Modal>
    );
}

export default Popup
