Payroll Management System

A web-based Payroll Management System for managing employee salaries, expenses, and payroll records efficiently with role-based access for Admins and Employees.

Table of Contents

Project Overview

Tech Stack

Setup Instructions

Approach & Features

Folder Structure

Project Overview

This system allows:

Admins to manage employees, salaries, and expenses.

Employees to view their salary slips, submit expenses, and track payment history.

Role-based dashboards with secure access.

Tech Stack
Layer	Technology	Reason for Choice
Frontend	React.js + Tailwind CSS	Fast, component-based UI; Tailwind provides responsive and modern styling easily
State Mgmt	Redux Toolkit	Efficient global state management for user info, expenses, and salary data
Backend	Node.js + Express.js	Lightweight, scalable, easy to create REST APIs
Database	MongoDB	Flexible NoSQL database for dynamic payroll and employee data
Authentication	JWT (JSON Web Token)	Secure token-based authentication for role-based access
API Calls	Axios	Simplified HTTP requests for client-server communication
Setup Instructions
1. Clone the repository
git clone https://github.com/your-username/payroll-management.git
cd payroll-management

2. Backend Setup
cd backend
npm install
cp .env.example .env        # Set your environment variables
npm start                   # Start backend server


Required .env variables:

PORT=5000
MONGO_URI=<Your MongoDB connection string>
JWT_SECRET=<Your JWT secret>

3. Frontend Setup
cd ../client
npm install
npm start                   # Start frontend server


Access:

Open http://localhost:3000 in your browser.

Approach & Features

1. Role-Based Dashboards

Admin sees all employees, salary details, and expense reports.

Employee sees only their own salary and expenses.

2. Expense Management

Employees can submit expenses.

Admins can approve, reject, or view all expenses.

3. Salary & Payroll Management

Admin can generate salary slips, manage allowances, deductions.

Employee can download/view salary slips.

4. Data Persistence & State Management

Redux Toolkit manages global state across components.

MongoDB stores employee, salary, and expense data.

5. Security

JWT-based authentication ensures secure login.

Role-based route protection for sensitive pages.

Folder Structure
/backend
 ├─ models/
 ├─ routes/
 ├─ controllers/
 ├─ middleware/
 └─ server.js

/client
 ├─ src/
 │   ├─ components/
 │   ├─ pages/
 │   ├─ redux/
 │   └─ App.js