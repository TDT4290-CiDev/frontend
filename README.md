## Prerequisites

[Node.js](http://nodejs.org/) >= 6 must be installed.
[Yarn](https://yarnpkg.com) must also be installed.

## Installation

- Running `yarn` in the app's root directory will install everything you need for development.

## Development Server

- `yarn start` will run the app's development server at [http://localhost:3000](http://localhost:3000) with hot module reloading.

## Running Tests

- `yarn test` will run the tests once.

- `yarn run test:coverage` will run the tests and produce a coverage report in `coverage/`.

- `yarn run test:watch` will run the tests on every change.

## Building

- `yarn run build` creates a production build by default.

  To create a development build, set the `NODE_ENV` environment variable to `development` while running this command.

- `yarn run clean` will delete built resources.

## Before coding

Before you start coding, you must set up automatic linter and prettier in your editor. For atom you do the following:

- Install the packages `linter-eslint`, `linter-stylelint` and `prettier-atom`
- Open settings for the package 'prettier-atom' and activate 'ESLint Integration', 'Stylelint Integration' and 'Format Files on Save'

For other editors, google it...
