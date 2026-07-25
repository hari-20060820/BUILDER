// transformNode.js

import { useState, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';
import { useStore } from '../store';

export const TransformNode = ({ id, data }) => {
  const [transformType, setTransformType] = useState(data?.transformType || 'String to Upper');
  const [expression, setExpression] = useState(data?.expression || 'input.toUpperCase()');
  const updateNodeField = useStore((state) => state.updateNodeField);

  useEffect(() => {
    if (data?.transformType === undefined) {
      updateNodeField(id, 'transformType', transformType);
    }
    if (data?.expression === undefined) {
      updateNodeField(id, 'expression', expression);
    }
  }, [id, data, transformType, expression, updateNodeField]);

  const handleTypeChange = (e) => {
    setTransformType(e.target.value);
    updateNodeField(id, 'transformType', e.target.value);
  };

  const handleExpressionChange = (e) => {
    setExpression(e.target.value);
    updateNodeField(id, 'expression', e.target.value);
  };

  const handles = [
    { type: 'target', position: Position.Left, id: 'input' },
    { type: 'source', position: Position.Right, id: 'output' }
  ];

  return (
    <BaseNode 
      id={id} 
      title="Transform Block" 
      icon="⚙️" 
      themeColor="#a855f7" 
      handles={handles}
      style={{ width: 230 }}
    >
      <div className="pipeline-node-field">
        <label className="pipeline-node-label">Type:</label>
        <select 
          value={transformType} 
          onChange={handleTypeChange} 
          className="pipeline-node-select"
        >
          <option value="String to Upper">String to Upper</option>
          <option value="JSON Stringify">JSON Stringify</option>
          <option value="Custom JS">Custom Script</option>
        </select>
      </div>
      <div className="pipeline-node-field vertical">
        <label className="pipeline-node-label">Script / Expression:</label>
        <textarea 
          value={expression} 
          onChange={handleExpressionChange} 
          className="pipeline-node-textarea"
          rows={3}
          style={{ resize: 'none' }}
        />
      </div>
    </BaseNode>
  );
}
