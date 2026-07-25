// promptNode.js

import { useState, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';
import { useStore } from '../store';

export const PromptNode = ({ id, data }) => {
  const [template, setTemplate] = useState(data?.template || 'You are a helpful assistant. Answer: {{query}}');
  const updateNodeField = useStore((state) => state.updateNodeField);

  useEffect(() => {
    if (data?.template === undefined) {
      updateNodeField(id, 'template', template);
    }
  }, [id, data, template, updateNodeField]);

  const handleTemplateChange = (e) => {
    setTemplate(e.target.value);
    updateNodeField(id, 'template', e.target.value);
  };

  const handles = [
    { type: 'target', position: Position.Left, id: 'variables' },
    { type: 'source', position: Position.Right, id: 'prompt' }
  ];

  return (
    <BaseNode 
      id={id} 
      title="Prompt Template" 
      icon="✏️" 
      themeColor="#06b6d4" 
      handles={handles}
      style={{ width: 230 }}
    >
      <div className="pipeline-node-field vertical">
        <label className="pipeline-node-label">Template:</label>
        <textarea 
          value={template} 
          onChange={handleTemplateChange} 
          className="pipeline-node-textarea"
          rows={4}
          style={{ resize: 'none' }}
        />
      </div>
    </BaseNode>
  );
}
