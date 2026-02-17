# Todo Application


A full-stack todo application with Spring Boot backend and React frontend.

## Tech Stack

**Backend:**
- Spring Boot 3.2.1 + Java 21
- Spring Security with JWT authentication
- PostgreSQL + JPA/Hibernate
- Liquibase migrations
- Swagger/OpenAPI documentation
- Testcontainers for integration testing

**Frontend:**
- React 18 + TypeScript
- Vite build tool
- React Router for navigation

## Prerequisites

- Java 21
- Node.js 20+
- Docker & Docker Compose
- Maven 3.9+

## Quick Start

### 1. Start PostgreSQL

```bash
docker-compose up -d postgres
```

### 2. Run Backend

```bash
cd backend
mvn spring-boot:run
```

The backend will start at http://localhost:8080

### 3. Run Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will start at http://localhost:5173

## Access Points

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:8080/api/v1 |
| Swagger UI | http://localhost:8080/swagger-ui.html |
| OpenAPI Spec | http://localhost:8080/v3/api-docs |

## Demo Credentials

| Username | Password |
|----------|----------|
| john.doe | password123 |
| jane.smith | password123 |

## Running with Docker Compose (Full Stack)

To run the entire stack with Docker:

```bash
docker-compose up --build
```

This starts:
- PostgreSQL on port 5432
- Backend on port 8080
- Frontend on port 3000

## Running Tests

Backend tests require Docker to be running (for Testcontainers):

```bash
cd backend
mvn test
```

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/register` | Register new user |
| POST | `/api/v1/auth/login` | Login, returns JWT |
| GET | `/api/v1/auth/me` | Get current user |

### Todos (requires authentication)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/todos` | Get all todos |
| GET | `/api/v1/todos/{id}` | Get todo by ID |
| POST | `/api/v1/todos` | Create new todo |
| PUT | `/api/v1/todos/{id}` | Update todo |
| PATCH | `/api/v1/todos/{id}/toggle` | Toggle completion |
| DELETE | `/api/v1/todos/{id}` | Delete todo |

## Project Structure

```
acme-world/
├── docker-compose.yml
├── backend/
│   ├── pom.xml
│   ├── Dockerfile
│   └── src/
│       ├── main/java/com/acme/todo/
│       │   ├── config/       # Security, CORS, OpenAPI config
│       │   ├── controller/   # REST controllers
│       │   ├── dto/          # Request/Response DTOs
│       │   ├── entity/       # JPA entities
│       │   ├── repository/   # Data repositories
│       │   ├── security/     # JWT authentication
│       │   ├── service/      # Business logic
│       │   └── exception/    # Error handling
│       └── main/resources/
│           ├── application.yml
│           └── db/changelog/ # Liquibase migrations
└── frontend/
    ├── package.json
    ├── vite.config.ts
    └── src/
        ├── api/              # API client
        ├── components/       # React components
        ├── context/          # Auth context
        ├── hooks/            # Custom hooks
        ├── pages/            # Page components
        └── types/            # TypeScript types
```

## Development

### Backend Development

```bash
cd backend

# Run with dev profile
mvn spring-boot:run -Dspring-boot.run.profiles=dev

# Build JAR
mvn clean package -DskipTests

# Run tests
mvn test
```

### Frontend Development

```bash
cd frontend

# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## Environment Variables

### Backend (application.yml)

| Variable | Default | Description |
|----------|---------|-------------|
| `SPRING_DATASOURCE_URL` | `jdbc:postgresql://localhost:5432/todo_db` | Database URL |
| `SPRING_DATASOURCE_USERNAME` | `todo_user` | Database username |
| `SPRING_DATASOURCE_PASSWORD` | `todo_password` | Database password |
| `JWT_SECRET` | (configured) | JWT signing secret (min 32 chars) |

### Docker Compose

Environment variables are configured in `docker-compose.yml` for containerized deployment.
