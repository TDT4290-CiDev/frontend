## Prerequisites
[Node.js](http://nodejs.org/) >= 6 must be installed.
[Yarn](https://yarnpkg.com) must also be installed.

## Installation
- Running `yarn` in the app's root directory will install everything you need for development.

## Development Server
- `yarn start` will run the app's development server at [http://localhost:3000](http://localhost:3000) with hot module reloading.
- See the [docker-compose repo](https://github.com/TDT4290-CiDev/docker-compose) to spin up the api-gateway.
- Because of [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS), you will have to use a browser extension to connect to the api-gateway in development. In Chrome, you can use [Allow-Control-Allow-Origin: *](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi). Make sure to turn off the extension when not using it, or else you will have some trouble when visiting other websites!

## Running Tests
- `yarn test` will run the tests once.

## Building
- `yarn run build` creates a production build by default.

  To create a development build, set the `NODE_ENV` environment variable to `development` while running this command.

- `yarn run clean` will delete built resources.

## Production
This code is optimized to run in production together with all the other microservices. To run it all together, take a look at our [docker-compose repo](https://github.com/TDT4290-CiDev/docker-compose).

## Before coding
Before you start coding, you must set up automatic linter and prettier in your editor. For atom you do the following:

- Install the packages `linter-eslint`, `linter-stylelint` and `prettier-atom`
- Open settings for the package 'prettier-atom' and activate 'ESLint Integration', 'Stylelint Integration' and 'Format Files on Save'

For other editors, google it...

## Create new modules
### Form
To create new modules to the form designer, you do the following (the process is also explained in the src/utils/modules.js file): 
1. Add the new files to their appropriate folder (components, containers etc.) Make sure that your main container is placed in src/containers/modules.
2. Export your module container in src/containers/modules/index.
3. Import your main component into src/utils/modules.js.
4. Create a shortcut and a shortcut description in the same file as above. 
5. Add functionality to store the required fields in the global [Redux](https://redux.js.org/) state to make the form able to save this new module to the database.

When creating new modules, make sure to reuse as much code as possible. There are made some generic components that should be used if possible.
