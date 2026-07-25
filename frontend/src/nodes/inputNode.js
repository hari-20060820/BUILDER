// inputNode.js

import { useState, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';
import { useStore } from '../store';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');
  const updateNodeField = useStore((state) => state.updateNodeField);

  // Sync initial values to Zustand store on mount
  useEffect(() => {
    if (data?.inputName === undefined) {
      updateNodeField(id, 'inputName', currName);
    }
    if (data?.inputType === undefined) {
      updateNodeField(id, 'inputType', inputType);
    }
  }, [id, data, currName, inputType, updateNodeField]);

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
    updateNodeField(id, 'inputName', e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
    updateNodeField(id, 'inputType', e.target.value);
  };

  const handles = [
    { type: 'source', position: Position.Right, id: 'value' }
  ];

  return (
    <BaseNode 
      id={id} 
      title="Input" 
      icon="📥" 
      themeColor="#10b981" 
      handles={handles}
    >
      <div className="pipeline-node-field">
        <label className="pipeline-node-label">Name:</label>
        <input 
          type="text" 
          value={currName} 
          onChange={handleNameChange} 
          className="pipeline-node-input"
        />
      </div>
      <div className="pipeline-node-field">
        <label className="pipeline-node-label">Type:</label>
        <select 
          value={inputType} 
          onChange={handleTypeChange} 
          className="pipeline-node-select"
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </div>
    </BaseNode>
  );
}
