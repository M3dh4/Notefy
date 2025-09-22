# Notefy

Notefy is a website for students to upload notes and track productivity.

## Features

- Upload and manage notes in pdf/jpeg etc.
- Track productivity tasks

## Getting Started

Prerequisites:
- Node.js 20+
- Yarn

Install dependencies:

```
yarn
```

Start the frontend:

```
yarn start:frontend
```

Build the frontend:

```
yarn build:frontend
```

## Folder Structure

- `packages/frontend`: React app (Vite) for Notefy
- `packages/infra`: Infrastructure as code (CDK) used by the original template

## Configuration

The frontend reads configuration from `packages/frontend/src/config.js` and environment variables prefixed with `VITE_`.


