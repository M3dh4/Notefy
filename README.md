# Notefy

Notefy is a website for students to upload notes and track productivity.

## Features

- Upload and manage notes
- Record audio and transcribe to notes
- Play synthesized audio of notes
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

If you are using AWS services (S3, Cognito, API Gateway), ensure the following are set in your environment or `.env` file in `packages/frontend/`:
- `VITE_FILES_BUCKET`
- `VITE_GATEWAY_URL`
- `VITE_IDENTITY_POOL_ID`
- `VITE_REGION`

Alternatively, you can run:

```
yarn prepare:frontend
```

which populates the frontend config from your deployed infrastructure if you use the included CDK stack.

## License

MIT
