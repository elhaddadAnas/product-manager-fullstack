# 🛍️ Product Manager Fullstack

A full-stack product and order management application built with Spring Boot (Java 17) for the backend and React (Vite + TypeScript) for the frontend.

Developed by EL HADDAD Anas.

---

## 📚 Table of Contents

- Project Overview
- Dependencies
- Configuration
- Getting Started
  - Run Backend
  - Run Frontend
  - Run with Docker
- API Documentation
- Running Tests
- Contact

---

## 📦 Project Overview

This project provides a simple yet robust product and order management platform:

- Spring Boot backend: RESTful API with JPA, validation, and JWT/OAuth2 security.
- React frontend: Responsive, dynamic UI powered by Vite and React Hooks.

---

## ⚙️ Dependencies
50  This project relies on the following dependencies:
- [Maven CLI](https://maven.apache.org/)
- [JDK 17](https://openjdk.java.net/projects/jdk/17/)
- [Node.js](https://nodejs.org/)

---

## ⚙️ Configuration

Update backend/src/main/resources/application.yaml to match your local PostgreSQL configuration:

spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/your_database
    username: your_user
    password: your_password

---

## 🚀 Getting Started

### Prerequisites

- JDK 17
- Maven
- Node.js
- Docker (optional)

---

### ▶️ Run Backend
```bash
cd backend
mvn spring-boot:run
```

Available at: http://localhost:8080

---

### ▶️ Run Frontend
```bash
cd frontend
npm install
npm run dev
```
Available at: http://localhost:5173

---

### 🐳 Run with Docker

To build and run everything via Docker:

```bash
docker compose build
docker compose up
```
To stop:

```bash
docker compose down
```

---

## 📑 API Documentation

Once the backend is running, access Swagger UI at:

http://localhost:8080/swagger-ui.html

---

## ✅ Running Tests

### Backend Tests (JUnit)

From the backend directory:
```bash
mvn test
```

This runs all unit and integration tests.

---

## 📬 Contact

For more information or contributions, feel free to reach out:

EL HADDAD Anas — elhaddadanas@gmail.com