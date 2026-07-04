# Simulation Service

A lightweight Node.js/Express service written in TypeScript that mocks Docker and Kubernetes CLI environments. It manages sandboxed session states for testing and learning DevOps workflows without requiring real daemon access.

## Folder Architecture

```
simulation-service/
│
├── src/
│   ├── server.ts              # Starts Express server
│   ├── app.ts                 # Express configuration
│   │
│   ├── routes/
│   │   └── execute.routes.ts  # Mounts POST /api/execute
│   │
│   ├── controllers/
│   │   └── execute.controller.ts # Handlers for commands
│   │
│   ├── engine/                # Simulation Logic
│   │   ├── parser.ts          # Converts command strings to options/arguments
│   │   ├── simulator.ts       # Dispatches commands to Docker or Kubernetes
│   │   ├── state.ts           # StateManager handling in-memory states
│   │   └── commands/          # Subcommand handlers
│   │       ├── image.ts       # docker pull/rmi/images
│   │       ├── container.ts   # docker run/ps/stop/start/rm
│   │       ├── network.ts     # docker network ls/create/rm
│   │       ├── volume.ts      # docker volume ls/create/rm
│   │       └── index.ts       # Central dispatcher for Docker
│   │
│   ├── sessions/
│   │   └── sessionManager.ts  # Coordinates StateManager per sessionId
│   │
│   ├── types/                 # Type declarations
│   │   ├── command.ts
│   │   ├── container.ts
│   │   ├── image.ts
│   │   ├── network.ts
│   │   └── state.ts
│   │
│   └── utils/
│       ├── helpers.ts
│       └── constants.ts
│
├── tests/                     # Test files
└── README.md
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+)
- [npm](https://www.npmjs.com/)

### Installation

1. Install the dependencies inside `simulation-service`:
   ```bash
   npm install
   ```

2. Start the development server using `ts-node-dev`:
   ```bash
   npm run dev
   ```

### API Endpoint

#### `POST /api/execute`

Execute a command in the simulation workspace.

**Request Body:**

```json
{
  "command": "docker run -d --name web nginx",
  "sessionId": "user-session-abc"
}
```

**Response:**

```json
{
  "output": "container-71ga891",
  "error": false,
  "sessionId": "user-session-abc"
}
```
