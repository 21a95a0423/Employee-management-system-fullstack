# Employee Management System Full Stack

A full-stack Employee Management System built using:

- Frontend: React.js + Bootstrap
- Backend: Spring Boot
- Database: MySQL
- Containerization: Docker & Docker Compose
- CI/CD: GitHub Actions
- Deployment: AWS EC2

## Features

- Add Employee
- Update Employee
- Delete Employee
- View All Employees

## Project Structure

employee-management-system-fullstack/
├── ems-frontend-react/
├── ems-backend/
├── docker-compose.yml
└── README.md

## Run with Docker

docker compose up --build

Frontend: http://localhost:3000
Backend: http://localhost:8080
MySQL: localhost:3307
## Deploy Frontend and Backend Using GitHub Actions on AWS EC2

Since you want to deploy your Employee Management System automatically using GitHub Actions, here is the complete workflow.

---

# 🏗 Architecture

```text
GitHub Repository
      ↓
GitHub Actions
      ↓ SSH
AWS EC2 Instance
      ↓
Spring Boot Backend (Port 8080)
React Frontend (Nginx Port 80)
```

---

# ✅ Step 1: EC2 Setup

Install required software on your EC2 instance.

```bash
sudo apt update
sudo apt install openjdk-21-jdk -y
sudo apt install nodejs npm -y
sudo apt install nginx -y
sudo apt install git -y
```

Verify installations:

```bash
java -version
node -v
npm -v
nginx -v
```

---

# ✅ Step 2: Clone Project on EC2

```bash
git clone https://github.com/21a95a0423/Employee-management-system-fullstack.git
cd Employee-management-system-fullstack
```

---

# ✅ Step 3: Build Backend Manually

```bash
cd backend
./mvnw clean package -DskipTests
java -jar target/*.jar
```

Test:

```bash
curl http://localhost:8080/api/employees
```

---

# ✅ Step 4: Build Frontend Manually

```bash
cd ../frontend
npm install
npm run build
```

Copy build files to Nginx:

```bash
sudo cp -r dist/* /var/www/html/
sudo systemctl restart nginx
```

---

# ✅ Step 5: Create Backend Systemd Service

```bash
sudo nano /etc/systemd/system/ems-backend.service
```

Paste:

```ini
[Unit]
Description=Employee Management System Backend
After=network.target

[Service]
User=ubuntu
WorkingDirectory=/home/ubuntu/Employee-management-system-fullstack/backend
ExecStart=/usr/bin/java -jar /home/ubuntu/Employee-management-system-fullstack/backend/target/*.jar
SuccessExitStatus=143
Restart=always

[Install]
WantedBy=multi-user.target
```

Enable service:

```bash
sudo systemctl daemon-reload
sudo systemctl enable ems-backend
sudo systemctl start ems-backend
sudo systemctl status ems-backend
```

---

# ✅ Step 6: GitHub Secrets

In your GitHub repository:

**Settings → Secrets and variables → Actions**

Add:

| Secret Name   | Value                      |
| ------------- | -------------------------- |
| `EC2_HOST`    | Your EC2 public IP         |
| `EC2_USER`    | ubuntu                     |
| `EC2_SSH_KEY` | Entire `.pem` file content |

---

# ✅ Step 7: GitHub Actions Workflow

