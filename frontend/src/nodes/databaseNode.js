// databaseNode.js

import { useState, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';
import { useStore } from '../store';

export const DatabaseNode = ({ id, data }) => {
  const [dbType, setDbType] = useState(data?.dbType || 'PostgreSQL');
  const [tableName, setTableName] = useState(data?.tableName || 'users');
  const [query, setQuery] = useState(data?.query || 'SELECT * FROM users LIMIT 10;');
  const updateNodeField = useStore((state) => state.updateNodeField);

  useEffect(() => {
    if (data?.dbType === undefined) {
      updateNodeField(id, 'dbType', dbType);
    }
    if (data?.tableName === undefined) {
      updateNodeField(id, 'tableName', tableName);
    }
    if (data?.query === undefined) {
      updateNodeField(id, 'query', query);
    }
  }, [id, data, dbType, tableName, query, updateNodeField]);

  const handleDbTypeChange = (e) => {
    setDbType(e.target.value);
    updateNodeField(id, 'dbType', e.target.value);
  };

  const handleTableNameChange = (e) => {
    setTableName(e.target.value);
    updateNodeField(id, 'tableName', e.target.value);
  };

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
    updateNodeField(id, 'query', e.target.value);
  };

  const handles = [
    { type: 'target', position: Position.Left, id: 'params' },
    { type: 'source', position: Position.Right, id: 'results' }
  ];

  return (
    <BaseNode 
      id={id} 
      title="Database Connection" 
      icon="🗄️" 
      themeColor="#0284c7" 
      handles={handles}
      style={{ width: 240 }}
    >
      <div className="pipeline-node-field">
        <label className="pipeline-node-label">Type:</label>
        <select 
          value={dbType} 
          onChange={handleDbTypeChange} 
          className="pipeline-node-select"
        >
          <option value="PostgreSQL">PostgreSQL</option>
          <option value="MongoDB">MongoDB</option>
          <option value="MySQL">MySQL</option>
        </select>
      </div>
      <div className="pipeline-node-field">
        <label className="pipeline-node-label">Table:</label>
        <input 
          type="text" 
          value={tableName} 
          onChange={handleTableNameChange} 
          className="pipeline-node-input"
        />
      </div>
      <div className="pipeline-node-field vertical">
        <label className="pipeline-node-label">Query / Command:</label>
        <textarea 
          value={query} 
          onChange={handleQueryChange} 
          className="pipeline-node-textarea"
          rows={3}
          style={{ resize: 'none' }}
        />
      </div>
    </BaseNode>
  );
}
