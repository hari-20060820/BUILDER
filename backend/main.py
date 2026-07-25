from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI()

# Add CORS middleware to allow requests from the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PipelineData(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(data: PipelineData):
    num_nodes = len(data.nodes)
    num_edges = len(data.edges)
    
    # Check if the graph is a DAG (Directed Acyclic Graph)
    # Build an adjacency list
    adj_list = {node['id']: [] for node in data.nodes}
    
    for edge in data.edges:
        source = edge.get('source')
        target = edge.get('target')
        if source in adj_list:
            adj_list[source].append(target)
            
    # Cycle detection using DFS
    visited = set()
    rec_stack = set()
    
    def dfs(node_id):
        visited.add(node_id)
        rec_stack.add(node_id)
        
        for neighbor in adj_list.get(node_id, []):
            if neighbor not in visited:
                if dfs(neighbor):
                    return True
            elif neighbor in rec_stack:
                return True
                
        rec_stack.remove(node_id)
        return False
        
    is_dag = True
    for node_id in adj_list:
        if node_id not in visited:
            if dfs(node_id):
                is_dag = False
                break
                
    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag
    }
