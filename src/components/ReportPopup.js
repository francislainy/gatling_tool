import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const Popup = (props) => {

    const reportTitle = props.report.report.title
    const categoryTitle = props.report.report.category.title

    const [inputValues, setInputValues] = useState({

        name: reportTitle, category: categoryTitle
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
                <input name={"name"} style={{width: "100%", marginBottom: "20px"}}
                       onChange={onChangeHandler}
                       value={inputValues.name}
                />
                <input name={"category"} style={{width: "100%"}}
                       onChange={onChangeHandler}
                       value={inputValues.category}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-primary" onClick={props.onHide}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Popup
