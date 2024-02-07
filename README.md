# Student/Course Management System

## Purpose

This project aims to provide software engineering students with hands-on experience in developing a full-stack web application using the MERN (MongoDB, Express, React, Node.js) stack

## Features

### Student/Course System (For SET Students)
- **Express REST API**: Implements CRUD functionalities for managing student and course information.
- **React Front-End**: Provides an interactive interface for students to manage their courses and for admin users to manage student records.
- **MongoDB Database**: Stores student and course information.
- **Authentication/Authorization**: Secures the application using JWT and HTTPOnly cookies.

### Admin Features
- Add, list, and manage students.
- Add, list, and manage courses.
- List all students enrolled in specific courses.

### Student Features
- Enroll in courses.
- Update course enrollments.
- Drop courses.
- View enrolled courses.

## Setup Instructions

1. **Prerequisites**:
    - Node.js installed.
    - MongoDB instance running (local or cloud-based).

2. **Installation**:
    Clone the repository and install dependencies for both backend and frontend parts of the project:

    ```bash
    git clone https://github.com/glad2os/student-course.git
    cd student-course
    npm install
    cd ../glad2os-student-course-react
    npm install
    ```

3. **Configuration**:
    - Configure the `.env` file in the `glad2os-student-course-system` directory with your MongoDB URI, JWT secrets, etc.
    - Update the `MONGO_DATABASE` environment variable in `k8s-manifests/node-backend/node-deployment.yaml` to match your MongoDB database name.

4. **Running the Application**:
- Backend:
    ```bash
    cd glad2os-student-course-system
    npm start
    ```
- Frontend:
    ```bash
    cd glad2os-student-course-react
    npm run dev
    ```

5. **Docker and Kubernetes**:
- Build and deploy using Skaffold:
    ```bash
    skaffold dev
    ```