import React, {useState} from 'react';
import api from "../api/api";
import {FolderOpen} from "@material-ui/icons";

function FileUpload(props) {

    const [selectedFile, setSelectedFile] = useState(null)

    const onFileChange = event => {
        setSelectedFile(event.target.files[0])
    };

    const onFileUpload = (props) => {

        const formData = new FormData();

        formData.append(
            "file",
            selectedFile,
            selectedFile.name
        );

        console.log(selectedFile);

        new api().submitJsonStats(formData).then(res => {
            console.log('File submitted')

            props.onClick()

        }).catch((error) => {
            console.log('error submitting file ' + error)
        })


    };

    const fileData = () => {
        if (selectedFile) {
            return (
                <div>
                    <h5>File Details:</h5>
                    <p>File Name: {selectedFile.name}</p>
                    <p>File Type: {selectedFile.type}</p>
                    <p>
                        Last Modified:{" "}
                        {selectedFile.lastModifiedDate.toDateString()}
                    </p>
                    <button onClick={() => onFileUpload(props)}>
                        Confirm
                    </button>
                </div>
            );
        }
    };

    function upload() {
        document.getElementById("selectFile").click()
    }

    return (
        <div>
            <div>
                <div className="form-group">
                    <div className="form-group file-area">
                        <input id='selectFile' hidden type="file" onChange={onFileChange}/>
                    </div>
                </div>
            </div>
            <div onClick={upload} className="file-dummy">
                <FolderOpen style={{width: 60, height: 60}}/>
                <div className="default">
                    Click to upload Gatling simulation folder
                </div>
            </div>
            {fileData()}
        </div>
    );

}

export default FileUpload;
