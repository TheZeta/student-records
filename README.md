# Student Records

This project is a simple API for managing student records using Express.js and SQLite. It supports creating and updating student records with validation and average grade calculation.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)

## Features

- Create student records
- Update student records
- Input validation
- Average grade calculation for multiple entries of the same course

## Prerequisites

- Node.js
- npm (Node Package Manager)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/TheZeta/student-records.git
    cd student-records
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up the SQLite database:

    ```bash
    node sync.js
    ```

## Usage

Start the server:

```bash
npm run start
```

## API Endpoints

**Base URL:** `http://localhost:3000`

### Create Record (POST)

- **Endpoint:** `/records`
- **Method:** `POST`
- **Description:** Creates a new student record.
- **Request Body:** JSON object with the following fields:
  - `name` (required): Student name (string)
  - `surname` (required): Student surname (string)
  - `stdNumber` (required): Student number (string)
  - `grades` (required): Student grades (array)
- **Response:**
  - Success (code 201): JSON object with the newly created record details.
  - Error (code 400+): JSON object with error message describing the issue with the request.

### Update Record (PUT)

- **Endpoint:** `/records/:stdNumber`
- **Method:** `PUT`
- **Description:** Updates an existing student record.
- **Path Variable:**
  - `:stdNumber` (required): The student number of the record to update (request body does not have `stdNumber` field).
- **Request Body:**
  - `name` (required): Student name (string)
  - `surname` (required): Student surname (string)
  - `grades` (required): Student grades (array)
- **Response:**
  - Success (code 200): JSON object with the updated record details.
  - Error (code 400+): JSON object with error message describing the issue with the request (e.g., record not found).

**Notes:**

- All requests and responses are in JSON format.
- Error messages will provide details about the problem encountered.


## Testing

- Postman (API testing)
- Jest (Unit testing)

### Scripts
- Run unit tests 

    ```bash
    npx jest
    ```

- Run API tests

    ```bash
    npm run test:postman
    ```