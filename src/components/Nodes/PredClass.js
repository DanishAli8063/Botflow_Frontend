import React, { useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function FileSelectorNode({ id, data, isConnectable, onFileSelect }) {
    const [fileNames, setFileNames] = useState([]); // Adjusted to support multiple file names

    const onFileChange = useCallback((evt) => {
        const files = Array.from(evt.target.files); // Convert FileList to Array
        if (files.length > 0) {
            const fileNames = files.map(file => file.name);
            setFileNames(fileNames);
            if (onFileSelect) {
                
                onFileSelect(id, files);
            }
        }
    }, [onFileSelect]);
console.log("files....",data)
    const fileInputId = `class-file-input-${id}`;

    return (
        <div className="file-selector-node">
            <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
            <div className="file-input-container">
                <label htmlFor={fileInputId} className="file-input-label">{data.label}</label>
                <input 
                    type="file"
                    id={fileInputId}
                    name="file"
                    onChange={onFileChange}
                    className="nodrag file-input"
                    style={{ display: 'none' }} // Hide the actual file input
                    multiple // Enable multiple file selection
                />
                <label htmlFor={fileInputId} className='numbers'>Please select audio files (optional)</label> {/* Adjusted label for multiple files */}
                <Button 
                    className="file-select-button" 
                    onClick={() => document.getElementById(fileInputId).click()} 
                    variant="contained" 
                    startIcon={<CloudUploadIcon />}>
                    Upload files
                </Button>
                <div className="file-name-display">
                    {data.files} {/* Display all selected file names */}
                </div>
            </div>
            <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
        </div>
    );
}

export default FileSelectorNode;
