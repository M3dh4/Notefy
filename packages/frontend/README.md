# Notefy Frontend

This package contains the React (Vite) frontend for Notefy — a website for students to upload notes and track productivity.

## Features

- Upload and manage notes
- Record audio and transcribe notes
- Play synthesized audio of notes
- Track productivity tasks

## Scripts

- `yarn start:frontend`: Start the dev server with HMR and open in browser
- `yarn build:frontend`: Create an optimized production build
- `yarn prepare:frontend`: Populate frontend config from deployed infrastructure (optional)

## Local Setup

1. Install dependencies at the repository root:
   ```
   yarn
   ```
2. (Optional) Configure environment variables in `packages/frontend/.env` if using AWS resources:
   - `VITE_FILES_BUCKET`
   - `VITE_GATEWAY_URL`
   - `VITE_IDENTITY_POOL_ID`
   - `VITE_REGION`
   You can also run `yarn prepare:frontend` to populate these from a deployed stack.
3. Start the app:
   ```
   yarn start:frontend
   ```

## Notes

- Edit files in `packages/frontend/src`; the page auto-refreshes during development.
- If you are not using the provided AWS infrastructure, adjust `src/config.js` and environment variables accordingly.
