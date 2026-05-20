# Employee Management System Deployment Process

## React + Spring Boot + MySQL + Docker + GitHub Actions + AWS EC2

This is the complete step-by-step process you can follow to deploy your project professionally.

---

# Phase 1: Complete Project Structure

Your project should look like this:

```text
Employee-management-system-fullstack/
├── backend/
├── frontend/
├── docker-compose.yml
└── .github/
    └── workflows/
        └── deploy.yml
```

---

# Phase 2: Push Code to GitHub

## 1. Initialize Git

```bash
git init
git add .
git commit -m "Initial commit"
```

## 2. Add Remote Repository

```bash
git remote add origin https://github.com/21a95a0423/Employee-management-system-fullstack.git
```

## 3. Push Code

```bash
git branch -M master
git push -u origin master
```

---

# Phase 3: Create Dockerfiles

---

## Backend Dockerfile (`backend/Dockerfile`)

```dockerfile
FROM eclipse-temurin:21-jdk
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

### Build Backend Jar

```bash
cd backend
./mvnw clean package -DskipTests
```

---

## Frontend Dockerfile (`frontend/Dockerfile`)

```dockerfile
# Build Stage
FROM node:20 AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Production Stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
```

> If your React project uses Create React App, replace `/app/dist` with `/app/build`.

---

# Phase 4: Create `docker-compose.yml`

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
