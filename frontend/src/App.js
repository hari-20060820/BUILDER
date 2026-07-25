import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';

function App() {
  return (
    <div className="bg-background text-on-background h-screen w-screen overflow-hidden flex flex-col">
      <PipelineToolbar />
      <PipelineUI />
    </div>
  );
}

export default App;
