// toolbar.js
// Neo-brutalist header toolbar with draggable nodes and theme toggle
// --------------------------------------------------

import { useState, useEffect } from 'react';
import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
    // Check initial theme from html class
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        setIsDarkMode(document.documentElement.classList.contains('dark'));
    }, []);

    const toggleTheme = () => {
        if (isDarkMode) {
            document.documentElement.classList.remove('dark');
            setIsDarkMode(false);
        } else {
            document.documentElement.classList.add('dark');
            setIsDarkMode(true);
        }
    };

    return (
        <header className="fixed top-0 left-0 w-full h-16 bg-surface border-b-4 border-outline shadow-none z-50 flex justify-between items-center pl-6">
            <div className="flex items-center gap-6 h-full flex-1 overflow-hidden">
                <span className="text-2xl font-black text-primary tracking-tighter uppercase select-none">Builder</span>
                <div className="flex items-center h-full border-l-4 border-outline overflow-x-auto">
                    <DraggableNode type='customInput' label='Input' icon='input' />
                    <DraggableNode type='llm' label='LLM' icon='smart_toy' />
                    <DraggableNode type='customOutput' label='Output' icon='output' />
                    <DraggableNode type='text' label='Text' icon='text_snippet' />
                    <DraggableNode type='promptNode' label='Prompt' icon='edit_note' />
                    <DraggableNode type='classifierNode' label='Classify' icon='alt_route' />
                    <DraggableNode type='databaseNode' label='Database' icon='storage' />
                    <DraggableNode type='integrationNode' label='Integrate' icon='link' />
                    <DraggableNode type='transformNode' label='Transform' icon='transform' />
                </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center h-full border-l-4 border-outline flex-shrink-0">
                <button 
                    onClick={toggleTheme}
                    className="h-full px-6 hover:bg-primary hover:text-on-primary flex items-center transition-colors font-bold uppercase tracking-tight text-on-surface"
                >
                    <span className="material-symbols-outlined mr-2">{isDarkMode ? 'light_mode' : 'dark_mode'}</span>
                    <span>Theme</span>
                </button>
            </div>
        </header>
    );
};
