# bookverse-test-api
A backend API for user registration, login, book management, and review/voting features. Built with Express, TypeScript, Mongoose, and Zod for validation.

## Features
- User registration and login with JWT authentication
- CRUD operations for books
- Add and vote on book reviews
- Input validation and error handling
- Bruno/Postman collection for API testing

## Setup Instructions
1. Clone this repository
2. Run `npm install`
3. Configure `.env`:
   ```
   PORT=3000
   MONGODB_URI=<your-mongo-url>
   ```
4. Start the app: `npm run dev`
5. Test APIs using Bruno/Postman (`bookverse.json`)

## Project Structure
```
src/
  controllers/    # Route logic (auth, books, reviews)
  models/         # Mongoose schemas (User, Book, Review)
  routes/         # Express routers (auth, books, reviews)
  middleware/     # Auth, validation, error handling
  utils/          # Helper functions (JWT, stats)
  tests/          # Jest test files
  config/         # DB connection
```

## Architecture
- **Express** for routing and middleware
- **Mongoose** for MongoDB models
- **Zod** for request validation
- **JWT** for authentication
- **Modular structure**: routes delegate to controllers, which use models and utilities
- **Centralized error handling** via middleware

See [`src/index.ts`](src/index.ts) for app entrypoint and router setup.