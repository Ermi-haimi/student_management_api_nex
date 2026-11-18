# Student Management API

A RESTful API built with **Node.js** and **Express.js** for managing student records. It supports CRUD operations, searching, filtering, and student statistics.

## Features

- Create, retrieve, update, and delete student records
- Retrieve a student by ID
- Search students by name or email
- Filter students by course, status, and GPA
- Retrieve student statistics
- Validate request data
- Handle errors with centralized error-handling middleware

## Tech Stack

- Node.js
- Express.js
- JavaScript (ES Modules)
- Postman for API testing

## Project Structure

```text
student_management_api_nex/
│
├── controllers/
│   └── studentController.js
│
├── data/
│   └── students.js
│
├── routes/
│   └── studentRoutes.js
│
├── services/
│   ├── studentService.js
│   ├── studentValidation.js
│   └── creatError.js
│
├── app.js
├── package.json
├── package-lock.json
└── README.md
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Ermi-haimi/student_management_api_nex.git
cd student_management_api_nex
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the server

```bash
npm start
```

The API will be available at:

```text
http://localhost:4000
```

**Note:** Student records are stored in a JavaScript array in memory. Changes are not permanent and the data returns to its initial state whenever the server restarts. No database configuration is required.

## API Endpoints

Base URL: `/api/students`

| Method | Endpoint                           | Description                     |
| ------ | ---------------------------------- | ------------------------------- |
| GET    | `/api/students`                    | Get all students                |
| GET    | `/api/students/:id`                | Get a student by ID             |
| POST   | `/api/students`                    | Add a new student               |
| PUT    | `/api/students/:id`                | Replace a student's information |
| PATCH  | `/api/students/:id`                | Update selected student fields  |
| DELETE | `/api/students/:id`                | Delete a student                |
| GET    | `/api/students/search?name=value`  | Search by name                  |
| GET    | `/api/students/search?email=value` | Search by email                 |
| GET    | `/api/students?course=value`       | Filter by course                |
| GET    | `/api/students?status=value`       | Filter by status                |
| GET    | `/api/students?gpa=value`          | Filter by GPA                   |
| GET    | `/api/students/stats`              | Get student statistics          |

### Search

Search supports partial, case-insensitive matching by name or email. Use one search parameter at a time.

Examples:

```http
GET /api/students/search?name=ab
GET /api/students/search?email=example.com
```

### Filtering

Students can be filtered by course, status, and GPA. Multiple filters can be combined.

Examples:

```http
GET /api/students?course=Computer Science
GET /api/students?status=Active
GET /api/students?gpa=3.5
GET /api/students?course=Computer Science&status=Active
```

When multiple filters are provided, a student must match all of them.

### Statistics

```http
GET /api/students/stats
```

Returns student statistics, including:

- Total number of students
- Average GPA

## Student Data Structure

Each student record contains the following fields:

| Field    | Type   | Description             |
| -------- | ------ | ----------------------- |
| `id`     | Number | Unique student ID       |
| `name`   | String | Student's full name     |
| `email`  | String | Student's email address |
| `age`    | Number | Student's age           |
| `course` | String | Student's course        |
| `gpa`    | Number | Student's GPA (1–4)     |
| `status` | String | `Active` or `Inactive`  |

### Example Student

```json
{
  "id": 1,
  "name": "Amina Hassan",
  "email": "amina@example.com",
  "age": 21,
  "course": "Computer Science",
  "gpa": 3.7,
  "status": "Active"
}
```

## Validation Rules

- Required student fields must be provided when creating or replacing a student.
- Email addresses must be unique.
- Age must be an integer of at least 16.
- GPA must be between 1 and 4.
- Status must be either `Active` or `Inactive`.
- PATCH requests validate only the fields being updated.
- Student IDs must be valid positive integers.

## HTTP Status Codes

| Status Code | Meaning                             |
| ----------- | ----------------------------------- |
| `200`       | Request successful                  |
| `201`       | Student created successfully        |
| `400`       | Invalid request or validation error |
| `404`       | Student not found                   |
| `500`       | Internal server error               |

## Testing

The API endpoints can be tested using [Postman](https://www.postman.com/).

Test the available routes by sending HTTP requests to the local server at `http://localhost:4000`.

---

**Author:** Ermias Haimanot Tsegaye

**Repository:** https://github.com/Ermi-haimi/student_management_api_nex
