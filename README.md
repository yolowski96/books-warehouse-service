# Books Warehouse Management System

This project is a rudimentary software solution for managing a bookstore's inventory. It includes an API for adding, retrieving, updating, and deleting books from stock. Additionally, a notification service is integrated to alert the bookstore owner when a book is running out of stock.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Dockerization](#dockerization)

## Features

- Add new books to the inventory.
- Retrieve the list of all books in stock.
- Get details of a specific book by its ID.
- Update book information.
- Delete books from the inventory.
- Receive notifications when a book is running low in stock.

## Prerequisites

- Node.js
- npm (Node Package Manager)
- SQLite database

## Getting Started

**Clone the repository:**

   ```bash
   git clone https://github.com/your-username/bookstore-inventory.git
   cd bookstore-inventory
   ```
**Install dependencies:**
```node
npm install
```
**Set up environment variables:**
```node
DATABASE_NAME='books'
```
**Start the application:**
```node
npm start
```

## API-endpoints
API Endpoints <br />
GET /api/books: Retrieve all books. <br />
GET /api/books/:id: Get details of a specific book. <br />
POST /api/books: Add a new book to the inventory. <br />
PUT /api/books/:id: Update information for a specific book. <br />
DELETE /api/books/:id: Delete a book from the inventory. <br />
For detailed API documentation, see <a href="http://localhost:3000/api-docs" target="_blank">Swagger API Documentation.</a> <br />

## Testing

Run tests using:
```node
npm test
```

## Dockerization
The application can be containerized using Docker. Use the provided Dockerfile and docker-compose.yaml.
```
docker-compose up --build
```

The application will be available at http://localhost:3000.
