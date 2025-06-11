# [Credit-Engine Service API](https://credit-engine-seven.vercel.app)

A lightweight API designed to issue and track "thank-you" credits for various ecosystem interactions. This project is built with Node.js, Express, and TypeScript, following a robust, company-level directory structure for scalability and maintainability.

## Features

- **Credit Issuance:** API endpoint to issue credits for defined action types.
- **Action Type Management:** Enumerates valid ecosystem interactions (e.g., `techModule`, `socialPost`, `referral`).
- **Structured Logging:** Centralized logging using Winston for better observability.
- **Environment Configuration:** Secure handling of environment variables.
- **Rate Limiting:** Basic protection against abuse.
- **Security Headers:** Uses Helmet for basic security enhancements.
- **Docker Support:** Containerized setup for consistent environments.
- **Unit & E2E Testing:** Configured with Vitest for reliable testing.
- **Code Quality:** ESLint for maintaining code style and quality.

## Technologies Used

- **Runtime:** Bun / Node
- **Framework:** Express.js
- **Language:** TypeScript
- **Database (Placeholder):** MongoDB (via Mongoose)
- **Caching (Placeholder):** Redis (via ioredis)
- **Testing:** Vitest, playwright
- **Linting:** ESLint, Prettier
- **Containerization:** Docker, Docker Compose
- **Environment Variables:** `dotenv`, Joi
- **Logging:** Winston
- **Security:** `express-rate-limit`
- **Authentication (Placeholder):** JWT, bcrypt

## Low - level - diagram
<img src="https://i.ibb.co/bjKDfc5X/LLD.png" alt="low level diagram">

## Getting Started

### Prerequisites

- Bun (or Node.js v18+)
- Docker & Docker Compose (optional)

### Local Development

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/ShivShankarKushwaha/credit-engine
    cd credit-engine
    ```

2.  **Install dependencies:**

    ```bash
    bun install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory based on `.env.example`:

    ```
    PORT=3000
    NODE_ENV=development
    MONGO_URI=mongodb://localhost:27017/credit_engine_db
    REDIS_URL=redis://localhost:6379
    JWT_SECRET=your_secret_key_here_for_development
    ```

4.  **Start MongoDB and Redis (using Docker Compose for simplicity):**

    ```bash
    docker-compose up mongodb redis
    ```

    Alternatively, ensure you have local instances of MongoDB and Redis running and update your `MONGO_URI` and `REDIS_URL` in `.env` accordingly.

5.  **Run the development server:**
    ```bash
    bun run dev
    ```
6.  ** Commit and git push rules **

    ```bash
        # To push code, ensure your branch name matches the required format (`type/name`), where `type` is one of: `ci`, `chore`, `docs`, `ticket`, `feat`, `fix`, `pref`, `refactor`, `revert`, or `style`. Protected branches (`master`, `integration`, `develop`) cannot be pushed to directly.

        # **Valid push workflow:**
        # Example: create a feature branch
        git checkout -b feat/my-new-feature

        # Add and commit your changes
        git add .
        git commit -m "feat: add my new feature"

        # Push to remote (will be validated by pre-push hook)
        git push origin feat/my-new-feature

        #Pushes that do not follow this convention will be rejected.
    ```

    The API will be available at `http://localhost:3000`.

### Running with Docker

1.  **Build and run containers:**
    ```bash
    docker-compose up --build
    ```
    This will build the Docker image for the app and start all services (app, mongodb, redis).

### API Endpoints

- **`GET /api/credit`**: Check the credit score of yourself/anyone`*`
- **`POST /api/credit`**: Issues thank-you credits.

  **Request Body Example:**

  ```json
  {
  	"userId": "user123",
  	"actionType": "socialPost",
  	"amount": 10,
  	"metadata": {
  		"platform": "Twitter",
  		"postUrl": "https://x.com/post/abc"
  	}
  }
  ```
## Live url test
**For live url testing see the <a href="./test.rest">test.rest</a> file**


## Testing

- **Run all tests:**
  ```bash
  bun test
  ```
- **Run unit tests:**
  ```bash
  bun run test:unit
  ```
- **Run end-to-end tests:**
  ```bash
  bun run test:e2e
  ```
- **Get coverage of the tests:**
  ```bash
  bun run coverage
  ```

## Linting

- **Run linter:**
  ```bash
  bun run lint
  ```
- **Fix linting and formetting errors:**
  ```bash
  bun run format
  ```

## Future Scope
### Planned Enhancements

- **Public/Private Credit Systems:**
    Allow users to choose whether their credit profile is public (visible to others) or private (only visible to themselves and admins). API endpoints and database schema will be updated to support this privacy setting.

- **Sharable Credit Profiles:**
    Enable users to generate a secure, shareable link to their credit profile. This link can be shared with others, respecting the user's privacy settings.

- **Admin Controls:**
    Admins will have the ability to override privacy settings for moderation or compliance purposes.

- **Audit Logs:**
    Track changes to privacy settings and sharing actions for transparency and security.


## Deployment

This project includes `Dockerfile` for containerization and `vercel.json` for serverless deployment using Vercel.

---

**Note:** This `Readme.md` is a comprehensive starting point. You will need to fill in specific details and further elaborate as you implement more features.
This credit-engine software is created upon [Ts-Server](https://github.com/ShivShankarKushwaha/templates) starting template by Shiv Shankar Kushwaha.
