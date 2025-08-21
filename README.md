# A modern React component library for UBMedia leveraging cutting‑edge tooling:

React – Component architecture

Vite – Fast bundler and dev environment

TypeScript – Type‑safe development

Vitest – Test runner and assertions

Tailwind CSS – Utility‑first styling

ESLint + Prettier – Code quality and formatting

Storybook – Component showcasing and documentation

Lerna – Monorepo management and task orchestration


### Get started
Clone the repository and install dependencies:
`npm install`

### Running Storybook
Launch Storybook locally to view and develop components in isolation:
`npm run storybook`

### Building Storybook
Build a static Storybook site:
`npm run build-storybook`

### Build Component Library
Generate a production build of the component library:
`npm run build`

Each Package Build with Lerna
`npx lerna run build --scope=@ubmedia/isg-button`

Each Package Build Regular
`npm run build --workspace=@ubmedia/isg-button`

### Testing
Run unit tests using Vitest:
`npm run test`

Run Test Coverage:
`npm run test:coverage`

### Linting & Format
Lint code with ESLint:
`npm run lint`

Automatically fix styling issues via Prettier:
`npm run lint:fix`

### Serve Story Book as a Deplyed Application
Build Storybook:
`npm run build-storybook`

Run The Generated Storybook:
`npx http-server storybook-static`



