# Employee Management System – Deployment with Docker, GitHub Actions, and AWS EC2

You can use the following `README.md` for your full-stack Employee Management System project.

---

````markdown
# Employee Management System (Full Stack)

A full-stack Employee Management System built with:

- **Frontend:** React.js + Bootstrap
- **Backend:** Spring Boot + Spring Data JPA
- **Database:** MySQL
- **Containerization:** Docker
- **CI/CD:** GitHub Actions
- **Cloud Deployment:** AWS EC2

---

## Features

- Add Employee
- Update Employee
- Delete Employee
- View Employees
- Email uniqueness validation
- REST API with Spring Boot
- Responsive UI with React
- Dockerized deployment
- Automated deployment using GitHub Actions

---

## Project Structure

```text
Employee-management-system-fullstack/
├── backend/
│   ├── Dockerfile
│   └── src/
├── frontend/
│   ├── Dockerfile
│   └── src/
├── docker-compose.yml
└── .github/
    └── workflows/
        └── deploy.yml
````

---

## Tech Stack

| Layer            | Technology      |
| ---------------- | --------------- |
| Frontend         | React.js        |
| Backend          | Spring Boot     |
| Database         | MySQL           |
| ORM              | Hibernate / JPA |
| Build Tool       | Maven           |
| Version Control  | Git & GitHub    |
| Containerization | Docker          |
| CI/CD            | GitHub Actions  |
| Cloud            | AWS EC2         |

---

## Local Setup

### Clone Repository

```bash
git clone https://github.com/21a95a0423/Employee-management-system-fullstack.git
cd Employee-management-system-fullstack
```

### Start Application Using Docker Compose

```bash
docker compose up --build -d
```

### Access Application

* Frontend: [http://localhost](http://localhost)
* Backend API: [http://localhost:8080/api/employees](http://localhost:8080/api/employees)
* MySQL: localhost:3306

---

## Docker Configuration

### Backend Dockerfile

```dockerfile
FROM eclipse-temurin:21-jdk
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
```

### Frontend Dockerfile

```dockerfile
# Build stage
FROM node:20 AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
```

---

## Docker Compose

```yaml
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    container_name: ems-mysql
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: employee_management
    ports:
      - "3306:3306"
    volumes:
      - mysql-data:/var/lib/mysql

  backend:
    build: ./backend
    container_name: ems-backend
    ports:
      - "8080:8080"
    depends_on:
      - mysql

  frontend:
    build: ./frontend
    container_name: ems-frontend
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  mysql-data:
```

---

## GitHub Actions CI/CD

Create file:

```text
.github/workflows/deploy.yml
```

```yaml
name: Deploy to AWS EC2

on:
  push:
    branches:
      - master

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Copy Project to EC2
        uses: appleboy/scp-action@v0.1.7
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ubuntu
          key: ${{ secrets.EC2_SSH_KEY }}
          source: "."
          target: "/home/ubuntu/employee-management-system"

      - name: Deploy on EC2
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ubuntu
          key: ${{ secrets.EC2_SSH_KEY }}
          script: |
            cd /home/ubuntu/employee-management-system
            docker compose down
            docker compose up --build -d
```

---

## GitHub Secrets

Add the following secrets in your GitHub repository:

* `EC2_HOST`
* `EC2_SSH_KEY`

---

## AWS EC2 Setup

Install Docker and Docker Compose on EC2:

```bash
sudo apt update
sudo apt install docker.io docker-compose-plugin -y
sudo usermod -aG docker ubuntu
```

Logout and login again.

---

## API Endpoints

| Method | Endpoint              | Description        |
| ------ | --------------------- | ------------------ |
| GET    | `/api/employees`      | Get all employees  |
| GET    | `/api/employees/{id}` | Get employee by ID |
| POST   | `/api/employees`      | Create employee    |
| PUT    | `/api/employees/{id}` | Update employee    |
| DELETE | `/api/employees/{id}` | Delete employee    |

---

## Validation

* First name required
* Last name required
* Email required
* Email must be unique

Example error response:

```json
{
  "message": "Email already exists"
}
```

---

## Future Enhancements

* Authentication with JWT
* Role-based access
* Search and pagination
* Unit and integration tests
* Kubernetes deployment

---

## Author

**Rambabu Adabala**

GitHub: [https://github.com/21a95a0423](https://github.com/21a95a0423)

```

---

## Suggested Repository Name

`employee-management-system-fullstack`

---

## Suggested Description

> Full-stack Employee Management System built with React, Spring Boot, MySQL, Docker, GitHub Actions, and AWS EC2.
```
