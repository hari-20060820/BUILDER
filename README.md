# BUILDER

![Neo-Brutalist Pipeline Builder](https://img.shields.io/badge/Design-Neo--Brutalist-black?style=for-the-badge)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![React Flow](https://img.shields.io/badge/React_Flow-FF0072?style=for-the-badge&logo=react)

**BUILDER** is a full-stack visual pipeline editor that replicates an **n8n-like** user interface and backend logic checking. It allows users to construct complex workflows by dragging and dropping logical nodes onto a canvas, connecting them, and performing basic checking on the resulting Directed Acyclic Graph (DAG) via a Python backend.

## ✨ Features

- **Neo-Brutalist Design System**: A highly stylized, high-contrast user interface with custom CSS variables enabling seamless dark/light mode switching.
- **Node Abstraction Engine**: Built on top of React Flow, the `BaseNode` architecture eliminates code duplication and allows new node types to be spun up in less than 30 lines of code.
- **Dynamic Text Parsing**: Text nodes automatically resize both horizontally and vertically, and dynamically generate input handles by detecting `{{ variables }}` typed in real-time.
- **9 Custom Nodes**: Includes specialized blocks for `Input`, `Output`, `Text`, `LLMs`, `Prompt Templates`, `Classifiers`, `Databases`, `Transforms`, and third-party `Integrations`.
- **Backend Graph Validation**: A FastAPI backend that parses the frontend payload, calculates graph metadata, and utilizes a **Depth First Search (DFS)** algorithm to verify that the pipeline strictly forms a Directed Acyclic Graph (DAG) with no infinite cycles.

## 🚀 Tech Stack

### Frontend
- **React.js** (Create React App)
- **React Flow** (Graph engine)
- **Zustand** (Global state management)
- **Tailwind CSS** (Utility styling via CDN)

### Backend
- **Python 3**
- **FastAPI** (REST API)
- **Uvicorn** (ASGI Server)
- **Pydantic** (Data validation)

## 🛠️ Local Development Setup

### 1. Start the Backend
The backend runs on `localhost:8000` and handles the DAG cycle-detection logic.

```bash
cd backend
# Install dependencies
pip install fastapi uvicorn pydantic

# Run the server with hot-reload
python -m uvicorn main:app --reload
```

### 2. Start the Frontend
The frontend runs on `localhost:3000`.

```bash
cd frontend
# Install dependencies
npm install

# Start the development server
npm start
```

## 🧠 How It Works

1. **Building**: Drag nodes from the header toolbar onto the canvas. Connect output handles (right) to input handles (left).
2. **Validating**: Click the **Run** button in the bottom right corner. 
3. **Parsing**: The frontend extracts all `nodes` and `edges` from the Zustand store and sends a `POST` request to `/pipelines/parse`.
4. **Result**: The Python backend builds an adjacency list, runs the cycle-detection algorithm, and returns the number of nodes, edges, and whether the graph is a valid DAG.
