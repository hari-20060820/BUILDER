// integrationNode.js

import { useState, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';
import { useStore } from '../store';

export const IntegrationNode = ({ id, data }) => {
  const [service, setService] = useState(data?.service || 'Slack');
  const [endpoint, setEndpoint] = useState(data?.endpoint || '#general');
  const updateNodeField = useStore((state) => state.updateNodeField);

  useEffect(() => {
    if (data?.service === undefined) {
      updateNodeField(id, 'service', service);
    }
    if (data?.endpoint === undefined) {
      updateNodeField(id, 'endpoint', endpoint);
    }
  }, [id, data, service, endpoint, updateNodeField]);

  const handleServiceChange = (e) => {
    setService(e.target.value);
    updateNodeField(id, 'service', e.target.value);
  };

  const handleEndpointChange = (e) => {
    setEndpoint(e.target.value);
    updateNodeField(id, 'endpoint', e.target.value);
  };

  // 2 input targets on Left (credentials, message body), 1 output source on Right (success status)
  const handles = [
    { type: 'target', position: Position.Left, id: 'credentials', style: { top: '33.3%' } },
    { type: 'target', position: Position.Left, id: 'payload', style: { top: '66.6%' } },
    { type: 'source', position: Position.Right, id: 'status' }
  ];

  return (
    <BaseNode 
      id={id} 
      title="Integration" 
      icon="🔗" 
      themeColor="#f97316" 
      handles={handles}
      style={{ width: 220 }}
    >
      <div className="pipeline-node-field">
        <label className="pipeline-node-label">Service:</label>
        <select 
          value={service} 
          onChange={handleServiceChange} 
          className="pipeline-node-select"
        >
          <option value="Slack">Slack</option>
          <option value="Discord">Discord</option>
          <option value="Email">Email</option>
        </select>
      </div>
      <div className="pipeline-node-field">
        <label className="pipeline-node-label">Channel/To:</label>
        <input 
          type="text" 
          value={endpoint} 
          onChange={handleEndpointChange} 
          className="pipeline-node-input"
        />
      </div>
    </BaseNode>
  );
}
