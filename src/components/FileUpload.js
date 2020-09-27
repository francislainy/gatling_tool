
import React, {Component} from 'react';
import ToolDataService from "../api/ToolDataService";

class FileUpload extends Component {

    state = {

        // Initially, no file is selected
        selectedFile: null
    };

    // On file select (from the pop up)
    onFileChange = event => {

        // Update the state
        this.setState({selectedFile: event.target.files[0]});

    };

    // On file upload (click the upload button)
    onFileUpload = () => {

        console.log('entered here')

        // Create an object of formData
        const formData = new FormData();


        // Update the formData object
        formData.append(
            "file",
            this.state.selectedFile,
            this.state.selectedFile.name
        );

        // Details of the uploaded file
        console.log(this.state.selectedFile);

        ToolDataService.submitFile(formData).then(res => {
            console.log('File submitted')
        }).catch((error) => {
            console.log('error submitting file ' + error)
        })

    };

    // File content to be displayed after
    // file upload is complete
    fileData = () => {

        if (this.state.selectedFile) {

            return (
                <div>
                    <h2>File Details:</h2>
                    <p>File Name: {this.state.selectedFile.name}</p>
                    <p>File Type: {this.state.selectedFile.type}</p>
                    <p>
                        Last Modified:{" "}
                        {this.state.selectedFile.lastModifiedDate.toDateString()}
                    </p>
                    <button onClick={this.onFileUpload}>
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

    upload() {
        document.getElementById("selectImage").click()
    }

    render() {

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
                    <input id='selectImage' hidden type="file" onChange={this.onFileChange}/>
                </div>
                <button onClick={this.upload}>
                    Upload!
                </button>
                {this.fileData()}
            </div>
        );
    }
}

export default FileUpload;
