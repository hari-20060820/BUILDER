// textNode.js

import { useState, useEffect, useRef } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';
import { useStore } from '../store';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const updateNodeField = useStore((state) => state.updateNodeField);
  const textareaRef = useRef(null);

  // Sync initial values to Zustand store on mount
  useEffect(() => {
    if (data?.text === undefined) {
      updateNodeField(id, 'text', currText);
    }
  }, [id, data, currText, updateNodeField]);

  // Auto-resize textarea height dynamically
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [currText]);

  // Extract variables (e.g., {{ variableName }}) dynamically
  useEffect(() => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const matches = [];
    let match;
    while ((match = regex.exec(currText)) !== null) {
      const varName = match[1];
      if (!matches.includes(varName)) {
        matches.push(varName);
      }
    }
    setVariables(matches);
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
    updateNodeField(id, 'text', e.target.value);
  };

  // Build handle configurations
  // Target handles (Left) for each variable
  const variableHandles = variables.map((varName, index) => {
    const spacingRatio = 100 / (variables.length + 1);
    return {
      type: 'target',
      position: Position.Left,
      id: `var-${varName}`,
      style: { top: `${(index + 1) * spacingRatio}%` }
    };
  });

  // Source handle (Right) for text output
  const outputHandle = {
    type: 'source',
    position: Position.Right,
    id: 'output'
  };

  const handles = [...variableHandles, outputHandle];

  return (
    <BaseNode 
      id={id} 
      title="Text" 
      icon="📝" 
      themeColor="#f59e0b" 
      handles={handles}
      style={{ width: 250 }}
    >
      <div className="pipeline-node-field vertical">
        <label className="pipeline-node-label">Text:</label>
        <textarea 
          ref={textareaRef}
          value={currText} 
          onChange={handleTextChange} 
          className="pipeline-node-textarea nodrag"
          style={{ resize: 'none', overflow: 'hidden', minHeight: '40px' }}
        />
      </div>
      
      {/* Display detected variables for better UX */}
      {variables.length > 0 && (
        <div className="pipeline-node-field vertical mt-2">
          <label className="pipeline-node-label">Variables</label>
          <div className="flex flex-col gap-1 w-full mt-1">
            {variables.map((varName) => (
              <div key={varName} className="text-[10px] text-on-surface font-mono bg-surface border-2 border-outline px-2 py-1 flex items-center justify-between">
                <span>{varName}</span>
                <span className="text-[10px] text-on-surface-variant">← Handle</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </BaseNode>
  );
}
