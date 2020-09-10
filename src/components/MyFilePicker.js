import React from "react";
import '../css/FormStyle.css'

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
                            <input type="file" name="images" id="images" required="required" multiple="multiple"/>
                        </div>
                        <div className="file-dummy">
                            <div className="default">
                                Please select some files
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default FileDialogue