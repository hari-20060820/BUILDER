// baseNode.js
// Reusable abstraction component for React Flow nodes
// --------------------------------------------------

import React from 'react';
import { Handle } from 'reactflow';
import { useStore } from '../store';

export const BaseNode = ({
  id,
  title,
  icon,
  themeColor = '#6366f1', // default indigo Accent color
  handles = [],
  children,
  style = {},
  selected = false,
}) => {
  const removeNode = useStore((state) => state.removeNode);

  return (
    <div
      className={`pipeline-node ${selected ? 'selected' : ''}`}
      style={style}
    >
      {/* Handles rendering */}
      {handles.map((handle, index) => (
        <Handle
          key={index}
          type={handle.type}
          position={handle.position}
          id={`${id}-${handle.id}`}
          style={{
            ...handle.style,
            background: themeColor,
          }}
          className={`pipeline-handle type-${handle.type}`}
        />
      ))}

      {/* Header Container */}
      <div className="pipeline-node-header">
        <div className="pipeline-node-header-left">
          {icon && <span className="pipeline-node-icon material-symbols-outlined">{icon}</span>}
          <span className="pipeline-node-title">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="pipeline-node-id">ID: {id.split('-')[1] || id}</div>
          <button 
            onClick={() => removeNode(id)}
            className="w-5 h-5 flex items-center justify-center bg-[#121212] border-[2px] border-black text-[#888888] hover:bg-[#e0e0e0] hover:text-[#121212] transition-colors text-xs font-black cursor-pointer"
            title="Delete Node"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Node Content Body */}
      <div className="pipeline-node-body">
        {children}
      </div>
    </div>
  );
};
