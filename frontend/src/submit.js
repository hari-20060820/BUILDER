// submit.js

import { useStore } from './store';

export const SubmitButton = () => {
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const data = await response.json();
            
            alert(
                `Pipeline Status:\n` +
                `----------------\n` +
                `Number of Nodes: ${data.num_nodes}\n` +
                `Number of Edges: ${data.num_edges}\n` +
                `Is a DAG (Directed Acyclic Graph): ${data.num_nodes === 0 ? 'No nodes' : (data.is_dag ? 'Yes' : 'No')}`
            );
        } catch (error) {
            console.error('Error parsing pipeline:', error);
            alert('Failed to connect to backend API. Is the server running?');
        }
    };

    return (
        <div className="absolute bottom-6 right-6 z-30">
            <button 
                type="button" 
                onClick={handleSubmit}
                className="btn-flat px-8 py-4 shadow-[8px_8px_0px_0px_rgba(224,224,224,1)] text-lg flex items-center gap-3 active:translate-x-1 active:translate-y-1 active:shadow-[4px_4px_0px_0px_rgba(224,224,224,1)] transition-all"
            >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                <span>Run</span>
            </button>
        </div>
    );
}
