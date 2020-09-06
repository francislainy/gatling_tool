import React, {useCallback, useEffect, useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ToolDataService from "./api/ToolDataService";

const Popup = (props) => {

    const [data, setData] = useState({categories: [], isFetching: false});
    const [res, setRes] = useState({data: null, isLoading: false});
    const [input, setInput] = useState('');

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
    //     const fetchData = async (payload) => {
    //         try {
    //             ToolDataService.createCategory(payload)
    //                 .then(res => {
    //                     setRes({data: res.data, isLoading: false});
    //                 })
    //         } catch (e) {
    //             console.log(e);
    //             setRes({data: null, isLoading: false});
    //         }
    //     };
    //     fetchData({payload: {"category_name": "Spring Boot5: Up and Running"}}).then(r => console.log(r + " create category"))
    // }, []);


    // const apiMethod = (input) => {
    //
    //     console.log(input)
    //
    //     setRes({ "category_name": "spring"})
    //     console.log(res)
    // }

    const useFetchData = ({payload}) => {
        const [res, setRes] = useState({data: null, isLoading: false});

        const callAPI = useCallback(() => {
            setRes(prevState => ({...prevState, isLoading: true}));
            ToolDataService.createCategory(payload).then(res => {
                setRes({data: res.data, isLoading: false});
            }).catch((error) => {
                setRes({data: null, isLoading: false});
            })
        }, [payload])
        return [res, callAPI];
    }

    const [resp, apiMethod] = useFetchData({payload: {"category_name": `${input}`}});

    const handleChange = (e) => {

        // setInput(e.currentTarget.value);
        setInput(e.currentTarget.value);
        console.log(e.currentTarget.value)
        // setRes({ "category_name": "Spring Boot5: Up and Running"})
    }

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

                <button onClick={(input) => {
                    apiMethod(input)
                }} type="button">Submit data
                </button>

                <input type="text" onChange={handleChange}/>
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