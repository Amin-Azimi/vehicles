# Vehicle State API

This project provides an API built with NestJS that, based on a vehicle ID and a timestamp, returns the vehicle's information and its state at the given timestamp. It uses Docker to spin up a PostgreSQL database containing two tables: `vehicles` and `stateLogs`.

## Description

The `vehicles` table contains data of cars that have been sold or are in the process of being sold by Motorway. The `stateLogs` table contains the history of each vehicle's state transitions. The API allows clients to retrieve the state of a vehicle at a specific point in time. This application is designed to be production-ready, considering reliability and scalability.

## Key Features

1. **Using AWS Secret Manager in Production**: Secrets such as database credentials are securely fetched from AWS Secret Manager in a production environment.
2. **Environment Variables**: Configuration is managed using environment variables stored in an `.env` file.
3. **Dependency Injection**: Utilizes NestJS's built-in dependency injection system for better modularity and testing.
4. **Database Index**: Created an index on the `timestamp` column in the `stateLogs` table for improved query performance.
5. **Environment Variable Validation**: Validates environment variables at startup to ensure all required configurations are provided.
6. **Error Handling**: Comprehensive error handling using custom exceptions and global exception filters.
7. **Request Body Validation**: Validates incoming request bodies to ensure they contain the required data in the correct format.
8. **Rate Limiting**: Implements rate limiting to prevent abuse and ensure the API remains available for legitimate users.

## Installation

### Prerequisites

- Docker
- Node.js (>=18.x)
- Yarn

### Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/Amin-Azimi/vehicles
    cd vehicles
    ```

2. Install dependencies:
    ```bash
    yarn install
    ```

3. Set up the Docker containers:
    ```bash
    docker-compose up -d
    ```

4. Run database migrations:
    ```bash
    yarn migrations
    ```

## Running the app

### Development

```bash
yarn run start
```

### Watch mode
```bash
yarn run start:dev
```

### Production mode
```bash
yarn run start:prod
```

## Testing
### Unit tests
```bash
yarn run test
```
### Test coverage
```bash
yarn run test:cov
```
## Linting
This project uses ESLint for code linting. To lint your code, run:
``` bash
yarn run lint
```
## Code Formatting
This project uses pretty-quick to automatically format code. To format your code, run:
``` bash
yarn pretty-quick
```
## Project Structure
- src/: Contains the main source code for the NestJS application.
- src/db/: Contains database related files including migrations.
- src/vehicles/: Contains modules, services, and controllers related to vehicles.
- src/state-logs/: Contains modules, services, and controllers related to state logs.

## API Documentation
Swagger is integrated for API documentation. After starting the application, you can access the Swagger documentation at
```bash
http://localhost:3000/api
```

## API Endpoints
- GET /vehicles/:id: Retrieve the state of a vehicle at a given timestamp.
- Request body: { "timestamp": "2022-09-12T10:00:00Z" }

## Example Request
```bash
curl -X GET 'http://localhost:3000/vehicles/3' -H 'Content-Type: application/json' -d '{"timestamp": "2022-09-12T10:00:00Z"}'
```
## Create a new migration
```bash
yarn typeorm migration:generate -d src/db/ormconfig-migrations.ts src/db/migrations/new-migration-name
```
## Configuration
### Environment Variables
This project uses environment variables for configuration. The .env file should contain the following:
``` bash
DB_HOST=your_database_host
DB_PORT=your_database_port
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
AWS_REGION=your_aws_region
DB_CONFIG_SECRET_PREFIX=your_db_config_secret_prefix
NODE_ENV=local
```

### Environment Variable Validation
The environment variables are validated at startup to ensure all required configurations are provided. If any required variable is missing or invalid, the application will log an error and exit.


### Error Handling
The application uses custom exceptions and a global exception filter to handle errors consistently and return meaningful error messages to the clients.

## Support
If you encounter any issues or have questions, feel free to open an issue in the repository.
