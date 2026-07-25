// outputNode.js

import { useState, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';
import { useStore } from '../store';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');
  const updateNodeField = useStore((state) => state.updateNodeField);

  // Sync initial values to Zustand store on mount
  useEffect(() => {
    if (data?.outputName === undefined) {
      updateNodeField(id, 'outputName', currName);
    }
    if (data?.outputType === undefined) {
      updateNodeField(id, 'outputType', outputType);
    }
  }, [id, data, currName, outputType, updateNodeField]);

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
    updateNodeField(id, 'outputName', e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
    updateNodeField(id, 'outputType', e.target.value);
  };

  const handles = [
    { type: 'target', position: Position.Left, id: 'value' }
  ];

  return (
    <BaseNode 
      id={id} 
      title="Output" 
      icon="📤" 
      themeColor="#ec4899" 
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
          value={outputType} 
          onChange={handleTypeChange} 
          className="pipeline-node-select"
        >
          <option value="Text">Text</option>
          <option value="File">Image</option>
        </select>
      </div>
    </BaseNode>
  );
}
