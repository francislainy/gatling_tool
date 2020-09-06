import React, {useCallback, useEffect, useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ToolDataService from "./api/ToolDataService";
import * as axios from "axios";

const Popup = (props) => {

    const [data, setData] = useState({categories: [], isFetching: false});
    const [newCategory, setNewCategory] = useState({title: '', isFetching: false});

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


    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             setNewCategory({title: data.categories.title, isFetching: true});
    //
    //             ToolDataService.createCategory(newCategory)
    //                 .then(response => setData({categories: response.data.categories, isFetching: false}))
    //
    //         } catch (e) {
    //             console.log(e);
    //             setData({categories: data.categories, isFetching: false});
    //         }
    //     };
    //     fetchData().then(r => console.log(r))
    // }, []);


    const useFetchData = ({url, headers, payload}) => {
        const [res, setRes] = useState({data: null, isLoading: false});

        // You POST method here
        const callAPI = useCallback(() => {
            setRes(prevState => ({...prevState, isLoading: true}));
            axios.post(url, payload).then(res => {
                setRes({data: res.data, isLoading: false});
            }).catch((error) => {
                setRes({data: null, isLoading: false});
            })
        }, [url, payload])
        return [res, callAPI];
    }

    const [res, apiMethod] = useFetchData({url: 'http://localhost:8081/gatling-tool/create-category', payload: {"category_name": "Spring Boot3: Up and Running"}});


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

                <button onClick={() => {apiMethod()}} type="button">Submit data</button>

                <input value={"cat"} name={"cat"}/>
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