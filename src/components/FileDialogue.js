import React from "react";
import '../css/FormStyle.css'
import {FolderOpen} from "@material-ui/icons";

function buildFileSelector() {
    const fileSelector = document.createElement('input');
    fileSelector.setAttribute('type', 'file');
    fileSelector.setAttribute('multiple', 'multiple');
    return fileSelector;
}

class FileDialogue extends React.Component {
    componentDidMount() {
        this.fileSelector = buildFileSelector();
    }

    handleFileSelect = (e) => {
        e.preventDefault();
        this.fileSelector.click();
    }

    render() {
        return (
            <div onClick={this.handleFileSelect}>
                <form action method="post">
                    <div className="form-group">
                        <div className="form-group file-area">
                            <input type="file"/>
                        </div>
                        <div className="file-dummy">
                            <FolderOpen style={{ width: 60, height: 60}}/>
                            <div className="default">
                                Click to upload Gatling simulation folder
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default FileDialogue