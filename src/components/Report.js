import React from "react";
import {Card} from "react-bootstrap";
import {Settings} from "@material-ui/icons";
import '../css/CustomStyle.css'
import MyIconButton from "./MyIconButton";

const Report = ({match}) => {

    const handleClick = () => {
        console.log("clicked")
    }

    return <div>Hello from report - {match.params.id}
        <Card style={{width: '18rem'}}>
            <Card.Body>
                <Card.Title>Report Details
                    <MyIconButton className="IconButton">
                        <Settings onClick={() => handleClick()}/>
                    </MyIconButton>
                </Card.Title>
                <Card.Text>
                    Report name: N/A
                </Card.Text>
                <Card.Text>
                    Time Run: 08/09/2020, 03:35:22
                </Card.Text>
                <Card.Text>
                    Time Imported: 08/09/2020, 08:43:11A
                </Card.Text>
                <Card.Text>
                    Category: Blended Performance
                </Card.Text>
            </Card.Body>
        </Card>
    </div>;
};

export default Report;