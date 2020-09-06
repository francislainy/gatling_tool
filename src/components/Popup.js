import React, {useEffect, useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ToolDataService from "./api/ToolDataService";

const Popup = (props) => {

    const [data, setData] = useState({categories: [], isFetching: false});

    useEffect(() => {
        const fetchData = async () => {
            try {
                setData({categories: data.categories, isFetching: true});

                ToolDataService.retrieveCategories()
                    .then(response => setData({categories: response.data.categories, isFetching: false}))

            } catch (e) {
                console.log(e);
                setData({categories: data.categories, isFetching: false});
            }
        };
        fetchData().then(r => console.log(r))
    }, []);


    return (
        <Modal show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Select Gatling Report Folder {data.categories[0]}</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <select style={{width: "100%"}}>Report Category
                    {data.categories.map((item, i) => {
                        return <option>{item}</option>
                    })}
                </select>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={props.onHide}>
                    Cancel
                </Button>
                <Button variant="outline-primary" onClick={props.onHide}>
                    OK
                </Button>
            </Modal.Footer>
        </Modal>

    );
}

export default Popup