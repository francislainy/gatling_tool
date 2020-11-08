import React, {useState} from 'react';
import {FolderOpen} from "@material-ui/icons";
import 'antd/dist/antd.css';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;


function FileUpload(props) {

    const [selectedFile, setSelectedFile] = useState(null)

    const onFileChange = event => {
        setSelectedFile(event.target.files)
    };

    const onFileUpload = () => {

        props.onFileAdded(selectedFile)
    };

    const props2 = {
        name: 'file',
        multiple: true,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
                setSelectedFile(info.fileList)
                props.onFileAdded(info.fileList)
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    const fileData = () => {
        if (selectedFile) {
            onFileUpload()

            return (
                <div>
                    {/*<h5>File Details:</h5>*/}
                    {/*<p>File Name: {selectedFile[1].name}</p>*/}
                    {/*<p>File Type: {selectedFile[1].type}</p>*/}
                    {/*<p>*/}
                    {/*    Last Modified:{" "}*/}
                    {/*    {selectedFile[1].lastModifiedDate.toDateString()}*/}
                    {/*</p>*/}

                    {/*<p>Index html {selectedFile[0].name}</p>*/}

                </div>
            );
        }
    };

    function upload() {
        document.getElementById("selectFile").click()
    }

    return (
        <div>
            {/*<div>*/}
            {/*    <div className="form-group">*/}
            {/*        <div className="form-group file-area">*/}
            {/*            <input id='selectFile' multiple hidden type="file" onChange={onFileChange}/>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div onClick={upload} className="file-dummy">*/}
            {/*    <FolderOpen style={{width: 60, height: 60}}/>*/}
            {/*    <div className="default">*/}
            {/*        Click to upload Gatling simulation folder*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*{fileData()}*/}
            <Dragger {...props2}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                    band files
                </p>
            </Dragger>
        </div>
    );

}

export default FileUpload;
