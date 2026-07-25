// classifierNode.js

import { useState, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';
import { useStore } from '../store';

export const ClassifierNode = ({ id, data }) => {
  const [classifierType, setClassifierType] = useState(data?.classifierType || 'Sentiment');
  const [threshold, setThreshold] = useState(data?.threshold || 0.7);
  const updateNodeField = useStore((state) => state.updateNodeField);

  useEffect(() => {
    if (data?.classifierType === undefined) {
      updateNodeField(id, 'classifierType', classifierType);
    }
    if (data?.threshold === undefined) {
      updateNodeField(id, 'threshold', threshold);
    }
  }, [id, data, classifierType, threshold, updateNodeField]);

  const handleTypeChange = (e) => {
    setClassifierType(e.target.value);
    updateNodeField(id, 'classifierType', e.target.value);
  };

  const handleThresholdChange = (e) => {
    setThreshold(parseFloat(e.target.value));
    updateNodeField(id, 'threshold', parseFloat(e.target.value));
  };

  // Define 1 target handle on the Left, and 3 source handles on the Right
  const handles = [
    { type: 'target', position: Position.Left, id: 'input' },
    { type: 'source', position: Position.Right, id: 'high', style: { top: '25%' } },
    { type: 'source', position: Position.Right, id: 'medium', style: { top: '50%' } },
    { type: 'source', position: Position.Right, id: 'low', style: { top: '75%' } }
  ];

  return (
    <BaseNode 
      id={id} 
      title="Classifier" 
      icon="⚡" 
      themeColor="#f43f5e" 
      handles={handles}
      style={{ width: 220 }}
    >
      <div className="pipeline-node-field">
        <label className="pipeline-node-label">Model:</label>
        <select 
          value={classifierType} 
          onChange={handleTypeChange} 
          className="pipeline-node-select"
        >
          <option value="Sentiment">Sentiment</option>
          <option value="Topic">Topic Routing</option>
          <option value="Urgency">Urgency detection</option>
        </select>
      </div>
      <div className="pipeline-node-field vertical">
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <label className="pipeline-node-label">Min Threshold:</label>
          <span style={{ fontSize: '11px', color: '#9ca3af' }}>{threshold}</span>
        </div>
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.05"
          value={threshold} 
          onChange={handleThresholdChange}
          className="nodrag"
          style={{ width: '100%', marginTop: '5px', cursor: 'pointer' }}
        />
      </div>
    </BaseNode>
  );
}
