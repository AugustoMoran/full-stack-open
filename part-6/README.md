# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Running the backend with JSON Server

`json-server` is configured to expose the anecdotes collection defined in `db.json`. Start it alongside the Vite dev server using:

```
npm run server
```

The mock API will listen on `http://localhost:3001/anecdotes`, matching the base URL configured in `src/services/anecdotes.js`. This allows you to interact with the UI just like against a real backend (GET/POST/PUT) without the need to build a separate API.

## Server state with React Query

The UI now relies on [React Query](https://tanstack.com/query/latest) to load, cache, and mutate the anecdotes collection. The query client is configured in `src/main.jsx`, and the following patterns are in use:

- `useQuery` in `App.jsx` loads the anecdotes and surfaces a loading indicator or error if the server is unavailable.
- `useMutation` performs voting and creation operations against the same JSON Server endpoint and invalidates the `anecdotes` query so the latest data is re-fetched.
- Any operation that succeeds fires a Redux notification stored in `src/actions/notificationActions.js`, while errors show a short message so the user knows why their request failed.
