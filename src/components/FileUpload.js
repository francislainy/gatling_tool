import React, {useState} from 'react';
import ToolDataService from "../api/ToolDataService";

function FileUpload() {

    const [selectedFile, setSelectedFile] = useState(null)

    const onFileChange = event => {
        setSelectedFile(event.target.files[0])
    };

    const onFileUpload = () => {

        console.log('entered here')

        const formData = new FormData();

        formData.append(
            "file",
            selectedFile,
            selectedFile.name
        );

        console.log(selectedFile);

        ToolDataService.submitFile(formData).then(res => {
            console.log('File submitted')
        }).catch((error) => {
            console.log('error submitting file ' + error)
        })

    };

    // File content to be displayed after
    // file upload is complete
    const fileData = () => {

        if (selectedFile) {

            return (
                <div>
                    <h2>File Details:</h2>
                    <p>File Name: {selectedFile.name}</p>
                    <p>File Type: {selectedFile.type}</p>
                    <p>
                        Last Modified:{" "}
                        {selectedFile.lastModifiedDate.toDateString()}
                    </p>
                    <button onClick={onFileUpload}>
                        Upload Second
                    </button>

                </div>
            );
        } else {
            return (
                <div>
                    <br/>
                    <h4>Choose before Pressing the Upload button</h4>
                </div>
            );
        }
    };

    function upload() {
        document.getElementById("selectImage").click()
    }

    return (
        <div>
            <h1>
                GeeksforGeeks
            </h1>
            <h3>
                File Upload using React!
            </h3>
            <div>
                {/*<input type="file" onChange={this.onFileChange}/>*/}
                <input id='selectImage' hidden type="file" onChange={onFileChange}/>
            </div>
            <button onClick={upload}>
                Upload!
            </button>
            {fileData()}
        </div>
    );

}

export default FileUpload;
