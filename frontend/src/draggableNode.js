// draggableNode.js
// Custom draggable component that maps type keys to React Flow inputs
// --------------------------------------------------

import React from 'react';

export const DraggableNode = ({ type, label, icon }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        className={`${type} flex flex-col items-center justify-center min-w-[70px] h-full border-r-4 border-outline hover:bg-primary hover:text-on-primary group bg-surface text-on-surface cursor-grab transition-colors duration-150`}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        style={{ 
          userSelect: 'none',
        }} 
        draggable
      >
          {icon && <span className="material-symbols-outlined text-[18px] mb-[2px]">{icon}</span>}
          <span className="text-[9px] font-black uppercase text-center tracking-tighter leading-none">{label}</span>
      </div>
    );
};