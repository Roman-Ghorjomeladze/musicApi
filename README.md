## About the app
This is a REST API developed with ExpressJS. Another technologies used alongside with Express are TypeScript, Docker, PostgreSQL, Prisma, Jest, Supertest and Swagger.

## API Documentation
The documentation of contracts can be found at http://localhost:3000/api-docs url. You can visit it as soon as you start the app. It's Swagger ui displaying all the endpoints available in the app.

## How to setup
    - Create .env file and copy the content from example.env file
    - Navigate to the root directory of the project and run docker compose up

### Development Commands
- Run development server:
  ```bash
  npm run dev
- start the app like in production
  ```bash
  npm start
- build the app
  ```bash
  npm run build
- run tests
  ```bash
  npm run test
- run tests in watch mode
  ```bash
  npm run test:watch
- get coverage info
  ```bash
  npm run coverage
- migrate database
  ```bash
  npm run migrate
- seed database
  ```bash
  npm run seed
- generate prisma types
  ```bash
  npm run generate