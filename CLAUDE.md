# Tègbalé School Admin Web App

**Stack:** Vue 3 · Vite · JavaScript (no TS) · Tailwind CSS · Headless UI · Heroicons · Vuelidate · VueUse · Axios · Pinia · Flowbite · Socket.io-client

## Commands

```bash
npm run dev      # Vite dev server
npm run build    # production build
npm run preview  # preview build on port 4173
npm run lint     # ESLint
```

Deploy targets: Netlify (`netlify.toml`) and Vercel (`vercel.json`).

## Branching & Workflow

```
feature/fix branches  →  develop  →  staging  →  master
```

- All feature and fix branches start from `develop`: `git checkout develop && git pull && git checkout -b feat/<name>`
- PRs target `develop`; `develop` is merged into `staging` for QA; `staging` is merged into `master` for releases.
- Never branch from `master` or `staging` for features.

## Source Layout

```
src/
  App.vue
  main.js              # createApp — Pinia (with persistedstate), router, Flowbite
  index.css / assets/main.css
  api/                 # Axios instance + per-resource API modules
  components/          # reusable UI components
  helpers/             # pure utility functions
  router/
    index.js           # root router
    admin.js           # admin-role routes
    user.js            # user-role routes
    middleware/        # guest guard, middleware pipeline
  stores/
    admin-store.js
    events-store.js
    parents-store.js
    posts-store.js
    school-store.js
    students-store.js
    toast-store.js
    user-store.js
  views/
    HomeView.vue
    ApplayoutView.vue
    Auth/              # login, register, forgot-password
    admin/             # admin dashboard and management views
    schools/           # school-facing views
```

## Conventions

- **Vue 3 Composition API** (`<script setup>`) in all new files.
- **Tailwind CSS** for all styling. Use `@headlessui/vue` for accessible interactive components (modals, dropdowns, transitions) and `@heroicons/vue` for icons.
- **Flowbite** is imported globally in `main.js` — you can use Flowbite component classes but prefer Headless UI for anything that needs JS behaviour.
- **Vuelidate** (`@vuelidate/core` + `@vuelidate/validators`) for form validation via `useVuelidate(rules, state)`. Surface `$error` / `$errors` per field. On submit: `v$.$touch()`, bail on `v$.$invalid` before the API call.
- **Pinia** for cross-component state (one store per domain in `stores/`). Stores use `pinia-plugin-persistedstate` — mark sensitive state as non-persisted where appropriate.
- **HTTP** calls live exclusively in `src/api/` modules. Components call store actions; store actions call API modules. Never call Axios directly in a component.
- **Router guards:** `guest` middleware redirects authenticated users away from auth pages. `middlewarePipeline` runs guards in sequence.
- **Roles:** This app is for `SCHOOL_ADMIN` and `STAFF`/`TEACHER` users. The `SUPER_ADMIN` portal is in `../../../superadmin`.

## API Base URL

Set via Vite env (`import.meta.env.VITE_API_URL`). Create `.env.local` for local dev:
```
VITE_API_URL=https://staging-api.tegbale.com/api
```
