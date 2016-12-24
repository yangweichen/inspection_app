# INSPECT.ION 

Inspect.ion is a truck inspection report logging and analytics web application. It is optimized for mobile and built with the CERN stack: Cloudant, Express, React, and Node.

![Inspection Home](./.github/login.png)

## Running Locally

### Prerequisites
- [Node.js and npm](https://nodejs.org/en/)
- [Cloudant Account](https://cloudant.com/)

### Installing dependencies

```sh
npm install
```

This will install all runtime and development dependencies.

### Running the app

There are two ways to run the app in development mode:

#### Dev Server

```sh
npm run build-watch
npm start
```

The first command will run Webpack in watch mode, rebuilding the client static files in `/app/build` every time a change is made to the source files. The second command will run the Node.js server. This setup simulates a production environment without the performance enhacements.

#### Webpack HMR Server

```sh
npm run hmr
npm start
```

The command starts a little Node.js server that serves only the webpack bundle. This setup gives us two main advantages:

- Changes to React components cause automatic page refreshes
- Updates to static files like CSS are injected into the running app without requiring a page refresh, allowing us to maintain state, among other things

API requests from this app will proxy to port `8080`, so you will still need the Node server running.

## Environment variables

Place your Cloudant username/password in the `database/db_credentials.js` file.

**^^^ This needs to be changed when moving to env vars**
