# Hackathon 2025 - Backend

This repository contains the backend for the Hackathon 2025 application, developed using Node.js, Express and PostgreSQL.

## Tools

- **Node.js**: JavaScript runtime environment.
- **Express**: Web framework for Node.js to create the server.
- **dotenv**: Library for managing environment variables.
- **pg**: PostgreSQL client for Node.js.
- **cors**: Middleware to enable Cross-Origin Resource Sharing.
- **body-parser**: Middleware for parsing incoming request bodies.
- **Docker**: Platform for developing and deploying containerized applications.
- **Docker Compose**: Tool for defining and running multi-container Docker applications.
- **PostgreSQL**: Relational database.
- **Git**: Version control system.

## Project Structure

backend/
├── node_modules/
├── src/
│ ├── routes/
│ │ ├── carbonRoutes.js
│ ├── controllers/
│ │ ├── carbonController.js
│ ├── models/
│ │ ├── db.js
│ ├── utils/
│ │ ├── carbonCalculator.js
│ ├── index.js
├── .env
├── docker-compose.yml
├── package.json
├── README.md

- `node_modules/`: Contains project dependencies.
- `src/`: Contains application source code.
- `routes/`: Defines API routes.
- `carbonRoutes.js`: Routes related to carbon footprint calculation.
- `controllers/`: Manages route logic.
- `carbonController.js`: Logic for carbon footprint calculation and data management.
- `models/`: Defines data models and database connection.
- `db.js`: Configuration and connection to PostgreSQL database.
- `utils/`: Contains utility functions.
- `carbonCalculator.js`: Functions for calculating carbon footprint.
- `index.js`: Entry point of the application.
- `.env`: Contains environment variables.
- `docker-compose.yml`: Configuration for Docker Compose.
- `package.json`: Defines project dependencies and scripts.
- `README.md`: This file.

## db setup

```sql
DROP TABLE IF EXISTS user_tests; -- Opzionale: elimina la tabella se esiste già (solo per sviluppo)
CREATE TABLE user_tests (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL,          -- Manteniamo l'email, ma rimuoviamo UNIQUE per evitare problemi con più test per utente
    streaming_hours INT NOT NULL,         -- Ore di streaming dichiarate dall'utente
    social_hours INT NOT NULL,            -- Ore di utilizzo dei social
    emails_sent INT NOT NULL,             -- Numero di email inviate
    gaming_hours INT NOT NULL,            -- Ore di gaming
    cloud_usage INT NOT NULL,             -- Uso del cloud in MB
    music_hours INT NOT NULL,
    call_hours INT NOT NULL,
    total_co2 INT NOT NULL,               -- Risultato del calcolo delle emissioni di CO2
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Data di creazione del test
);
```

## How to Start the Backend

1. **Start the PostgreSQL database with Docker Compose:**

```bash
docker-compose up -d
```

2. **Start the Node.js server:**

```bash
node index.js
```

## API

### `POST /api/submit-test`

Endpoint to send carbon footprint data.

**Request (JSON):**

```json
{
"email": "test@email.com",
"streaming_hours": "145",
"social_hours": "133",
"emails_sent": "1220",
"gaming_hours": "312",
"cloud_usage": "150"
}

In case of success:
{
"message": "Test saved!",
"date": {
"id": 10,
"email": "test@email.com",
"streaming_hours": 145,
"social_hours": 133,
"emails_sent": 1220,
"gaming_hours": 312,
"cloud_usage": 150,
"total_co2": 97,
"created_at": "2025-03-28T22:04:08.131Z"
},
"earthsNeeded": "1.06"
}

In case of error
{
"error": "CO2 calculation error: NaN value"
}
```
