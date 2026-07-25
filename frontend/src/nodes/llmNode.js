// llmNode.js

import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const LLMNode = ({ id, data }) => {
  const handles = [
    { 
      type: 'target', 
      position: Position.Left, 
      id: 'system', 
      style: { top: '33.3%' } 
    },
    { 
      type: 'target', 
      position: Position.Left, 
      id: 'prompt', 
      style: { top: '66.6%' } 
    },
    { 
      type: 'source', 
      position: Position.Right, 
      id: 'response' 
    }
  ];

  return (
    <BaseNode 
      id={id} 
      title="LLM" 
      icon="🤖" 
      themeColor="#6366f1" 
      handles={handles}
    >
      <div className="pipeline-node-desc">
        This is an LLM. Use system prompts and prompt inputs to generate responses.
      </div>
    </BaseNode>
  );
}
