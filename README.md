# Employee Management System Deployment Process

## React + Spring Boot + MySQL + Docker + GitHub Actions + AWS EC2

This is the complete end-to-end deployment process for your full-stack Employee Management System project.

---

# Phase 1: Project Structure

Your project structure should look like this:

```bash
Employee-management-system-fullstack/
│
├── backend/
│   ├── src/
│   ├── target/
│   ├── Dockerfile
│   └── pom.xml
│
├── frontend/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml
│
└── .github/
    └── workflows/
        └── deploy.yml
```

---

# Phase 2: Push Project to GitHub

## 1. Initialize Git

```bash
git init
git add .
git commit -m "Initial commit"
```

---

## 2. Add GitHub Repository

```bash
git remote add origin https://github.com/21a95a0423/Employee-management-system-fullstack.git
```

---

## 3. Push Code to GitHub

```bash
git branch -M main
git push -u origin main
```

---

# Phase 3: Create Dockerfiles

# Backend Dockerfile

Create file:

```bash
backend/Dockerfile
```

Add this code:

```dockerfile
FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
```

---

# Build Spring Boot JAR File

Go to backend folder:

```bash
cd backend
```

Build jar:

```bash
./mvnw clean package -DskipTests
```

For Windows:

```bash
mvnw.cmd clean package -DskipTests
```

After build completes:

```bash
backend/target/
```

will contain:

```bash
your-app-name.jar
```

---

# Frontend Dockerfile

Create file:

```bash
frontend/Dockerfile
```

Add this code:

```dockerfile
# Build Stage
FROM node:20 AS build

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

# Production Stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

---

## Important Note

### If using Vite React:

```dockerfile
COPY --from=build /app/dist /usr/share/nginx/html
```

### If using Create React App:

```dockerfile
COPY --from=build /app/build /usr/share/nginx/html
```

---

# Phase 4: Create Docker Compose File

Create:

```bash
docker-compose.yml
```

Add this code:

```yaml
version: "3.8"

services:

  mysql:
    image: mysql:8.0
    container_name: ems-mysql
    restart: always

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
    restart: always

    ports:
      - "8080:8080"

    environment:
      DB_URL: jdbc:mysql://mysql:3306/employee_management?createDatabaseIfNotExist=true
      DB_USERNAME: root
      DB_PASSWORD: root

    depends_on:
      - mysql

  frontend:
    build: ./frontend
    container_name: ems-frontend
    restart: always

    ports:
      - "80:80"

    depends_on:
      - backend

volumes:
  mysql-data:
```

---

# Phase 5: Configure Spring Boot Database

Open:

```bash
backend/src/main/resources/application.properties
```

Add:

```properties
spring.datasource.url=${DB_URL}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}

spring.jpa.hibernate.ddl-auto=update

spring.jpa.show-sql=true
```

---

# Phase 6: Test Locally Using Docker

Run:

```bash
docker compose up --build -d
```

Check containers:

```bash
docker ps
```

---

# Phase 7: AWS EC2 Setup

## 1. Launch EC2 Instance

Choose:

* Ubuntu Server
* t2.micro
* Allow:

  * SSH (22)
  * HTTP (80)
  * Custom TCP (8080)

---

# Connect to EC2

```bash
ssh -i your-key.pem ubuntu@your-ec2-public-ip
```

---

# Install Docker

```bash
sudo apt update

sudo apt install docker.io -y
```

Start Docker:

```bash
sudo systemctl start docker

sudo systemctl enable docker
```

---

# Install Docker Compose

```bash
sudo apt install docker-compose-v2 -y
```

Check version:

```bash
docker compose version
```

---

# Phase 8: Clone Project in EC2

```bash
git clone https://github.com/21a95a0423/Employee-management-system-fullstack.git
```

Go inside project:

```bash
cd Employee-management-system-fullstack
```

---

# Phase 9: Deploy Application

Run:

```bash
docker compose up --build -d
```

Check running containers:

```bash
docker ps
```

---

# Access Application

Frontend:

```bash
http://YOUR_EC2_PUBLIC_IP
```

Backend API:

```bash
http://YOUR_EC2_PUBLIC_IP:8080/api/employees
```

---

# Phase 10: Configure GitHub Actions (CI/CD)

Create file:

```bash
.github/workflows/deploy.yml
```

Add:

```yaml
name: Deploy EMS Application

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:

      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Deploy to EC2
        uses: appleboy/ssh-action@master

        with:
          host: ${{ secrets.EC2_HOST }}
          username: ubuntu
          key: ${{ secrets.EC2_SSH_KEY }}

          script: |
            cd Employee-management-system-fullstack

            git pull origin main

            docker compose down

            docker compose up --build -d
```

---

# Phase 11: Add GitHub Secrets

Go to:

```text
GitHub Repository
→ Settings
→ Secrets and Variables
→ Actions
```

Add:

| Secret Name | Value                 |
| ----------- | --------------------- |
| EC2_HOST    | Your EC2 Public IP    |
| EC2_SSH_KEY | Contents of .pem file |

---

# Phase 12: Automatic Deployment

Now whenever you push code:

```bash
git add .
git commit -m "updated project"
git push origin main
```

GitHub Actions will:

* Connect to EC2
* Pull latest code
* Rebuild Docker containers
* Restart application automatically

---

# Useful Docker Commands

## View Running Containers

```bash
docker ps
```

---

## View Logs

```bash
docker logs ems-backend
```

```bash
docker logs ems-frontend
```

---

## Stop Containers

```bash
docker compose down
```

---

## Restart Containers

```bash
docker compose restart
```

---

# Common Errors & Fixes

## Error: target/*.jar not found

Fix:

```bash
cd backend
./mvnw clean package -DskipTests
```

---

## Error: frontend Dockerfile not found

Check:

```bash
frontend/Dockerfile
```

exists.

---

## Error: no space left on device

Clean Docker:

```bash
docker system prune -a
```

---

## Error: Port not accessible

Check:

* EC2 Security Group
* Docker ports mapping
* Application running using:

```bash
docker ps
```

---

# Technologies Used

* React
* Spring Boot
* MySQL
* Docker
* Docker Compose
* GitHub Actions
* AWS EC2
* Nginx

---

# About Project

Full-stack Employee Management System built with React, Spring Boot, MySQL, Docker, Docker Compose, AWS EC2, and GitHub Actions.

---

# Author

**Rambabu Adabala**

GitHub:

[21a95a0423 GitHub Repository](https://github.com/21a95a0423/Employee-management-system-fullstack?utm_source=chatgpt.com)
