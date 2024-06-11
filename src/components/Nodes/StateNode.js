import React, { useCallback, useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function StateNode({
  id,
  onSendData,
  data,
  isConnectable,
  onInputChange,
  onFileChange,
  onCheckChange,
  onQqCheckChange
}) {
  const [inputValue, setInputValue] = useState('');
  const [files, setFiles] = useState([]); // Updated for multiple files
  const [checked, setChecked] = useState(false);
  const [qqChecked, setQqChecked] = useState(false);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    if (onInputChange) {
      onInputChange(id, newValue);
    }
  };

  const handleCheckChange = (event) => {
    setChecked(event.target.checked);
    if (onCheckChange) {
      onCheckChange(id, event.target.checked);
    }
  };

  const handleQqCheckChange = (event) => {
    setQqChecked(event.target.checked);
    if (onQqCheckChange) {
      onQqCheckChange(id, event.target.checked);
    }
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles); // Updated for multiple files
    if (onFileChange) {
      onFileChange(id, selectedFiles);
    }
  };

  useEffect(() => {
    const sendData = async () => {
      if (typeof onSendData === 'function' && inputValue && files.length > 0) {
        const dataToSend = {
          inputValue,
          files, // Updated for multiple files
          checked,
          qqChecked
        };
        onSendData(id, dataToSend);
      }
    };

    sendData();
  }, [id, inputValue, files, checked, qqChecked, onSendData]);

  // console.log('checked_status','input value',checked,inputValue);
  
  const checkBoxId = `state-check-input-${id}`;
  const qqCheckBoxId = `state-qq-check-input-${id}`;
  const fileInputId = `state-file-input-${id}`;
  const numberInputId = `number-input-${id}`;
  return (
    <div className="state-node">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div>
      <label htmlFor="file-input-state-node" className="file-input-label">{data.label}</label>
<div className='checkbox-out'><p style={{fontSize:"6pt"}}>Rebuttal State</p>
<input
  id="customCheckbox"
  type="checkbox"
  // checked={checked}
  checked={data.checked}
  onChange={handleCheckChange} // Make sure this matches your method name
  className='checkbox-div'
/>

</div>

<div className='checkbox-out'><p style={{fontSize:"6pt"}}>QQ State</p>
<input
  id="customCheckbox1"
  type="checkbox"
  // checked={qqChecked}
  checked={data.qqChecked}
  onChange={handleQqCheckChange} // Make sure this matches your method name
  className='checkbox-div'
/>

</div>

        <label htmlFor="number-input" className='numbers'>Listening seconds</label>
        <input 
        className='input-numbers'
        // value={inputValue}
        value={data.inputValue}
        onChange={handleChange}
          type="number"
          id={numberInputId}
          // value={number}
          step="1"
          // placeHolder='Listening Sec'
          // onChange={onNumberChange}
        />
      </div>
      <div>
   
      <input 
        type="file"
        id={`state-file-input-${id}`}
        name="file"
        multiple // Allow multiple file selections
        onChange={handleFileChange}
        className="nodrag file-input"
        style={{ display: 'none' }}
      />
                 <label className='numbers'>Please select an audio file (requeird)</label>
        {/* <button className="file-select-button" onClick={() => document.getElementById(fileInputId).click()}>
          Select File
        </button> */}
        <Button className="file-select-button" onClick={() => document.getElementById(`state-file-input-${id}`).click()} variant="contained" startIcon={<CloudUploadIcon />}>
        Upload files
      </Button>
    <div className="file-name-display">
        {data.files && data.files.map((file, index) => <div key={index}>{file}</div>)} 
      </div>
        {/* {selectedFile && <div className="file-name-display">{selectedFile.name}</div>} */}

      </div>
      
      <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
    </div>
  );
}

export default StateNode;
