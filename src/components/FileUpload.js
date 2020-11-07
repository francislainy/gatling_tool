import React, {useState} from 'react';
import {FolderOpen} from "@material-ui/icons";

function FileUpload(props) {

    const [selectedFile, setSelectedFile] = useState(null)

    const onFileChange = event => {
        setSelectedFile(event.target.files)
    };

    const onFileUpload = () => {

        props.onFileAdded(selectedFile)
    };

    const fileData = () => {
        if (selectedFile) {
            onFileUpload()

            return (
                <div>
                    <h5>File Details:</h5>
                    <p>File Name: {selectedFile[1].name}</p>
                    <p>File Type: {selectedFile[1].type}</p>
                    <p>
                        Last Modified:{" "}
                        {selectedFile[1].lastModifiedDate.toDateString()}
                    </p>

                    <p>Index html {selectedFile[0].name}</p>

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
                        <input id='selectFile' multiple hidden type="file" onChange={onFileChange}/>
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
