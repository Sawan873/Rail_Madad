# Admin & Employee API Integration Guide

This document outlines the API endpoints required for integrating the Admin and Department Employee dashboards. **Passenger endpoints have been excluded.**

> **Authentication Note:** All endpoints (except Login) require an authentication cookie (`token`) which is automatically set by the backend upon a successful login. In your frontend API client (like Axios), make sure to include `withCredentials: true` so the cookies are sent with every request.

---

## 1. Authentication

### Log In (Admin & Employee)
- **Endpoint:** \`POST /api/auth/login\`
- **Description:** Authenticates the user and sets an HTTP-only cookie.
- **Request Body (JSON):**
  \`\`\`json
  {
    "email": "admin@railmadad.com", 
    "password": "admin@123"
  }
  \`\`\`
- **Response:**
  \`\`\`json
  {
    "success": true,
    "message": "User logged in successfully",
    "data": {
      "user": {
        "_id": "60d...",
        "firstName": "System",
        "lastName": "Admin",
        "email": "admin@railmadad.com",
        "role": "admin"
      }
    }
  }
  \`\`\`

---

## 2. Admin Dashboard Endpoints
*These routes require the user to have the \`"admin"\` role.*

### Get All Users (Passengers)
- **Endpoint:** \`GET /api/auth/users\`
- **Query Params (Optional):** \`?page=1&limit=50\`
- **Description:** Retrieves a paginated list of all registered passengers.
- **Response:** Array of user objects.

### Delete / Ban User
- **Endpoint:** \`DELETE /api/auth/users/:userId\`
- **Description:** Permanently deletes a passenger's account. *(Note: This automatically triggers an email to the user notifying them that their account was removed due to suspicious activity).*
- **Response:**
  \`\`\`json
  {
    "success": true,
    "message": "User account deleted successfully"
  }
  \`\`\`

### Get All Complaints (Global View)
- **Endpoint:** \`GET /api/complaints/all\`
- **Query Params (Optional):** \`?status=Pending&urgency=High&category=Security&page=1&limit=50\`
- **Description:** Retrieves all complaints across the entire system. Can be filtered by status, urgency, and category.
- **Response:**
  \`\`\`json
  {
    "success": true,
    "message": "All complaints fetched successfully",
    "data": [
      {
        "_id": "...",
        "complaintId": "RM-2026-XYZ",
        "category": "Security",
        "status": "Pending",
        "urgency": "High",
        "department": { "_id": "...", "name": "RPF" },
        "submittedBy": { "firstName": "John", "phoneNumber": "1234567890" }
      }
    ]
  }
  \`\`\`

---

### Get Dashboard Statistics (Graph Data)
- **Endpoint:** `GET /api/complaints/admin/stats`
- **Description:** Retrieves aggregated numerical statistics for complaints (by status) and users (by role). Ideal for rendering charts/graphs on the admin dashboard.
- **Response:**
  ```json
  {
    "success": true,
    "message": "Admin statistics fetched successfully",
    "data": {
      "complaints": {
        "Pending": 10,
        "InProgress": 5,
        "Resolved": 25,
        "Rejected": 2,
        "Total": 42
      },
      "users": {
        "passenger": 150,
        "department_employee": 15,
        "admin": 2,
        "Total": 167
      }
    }
  }
  ```

---

## 3. Department Employee Endpoints
*These routes are primarily for the \`"department_employee"\` role (Admins can also access them).*

### Get Department Complaints
- **Endpoint:** \`GET /api/complaints/department-complaints\`
- **Query Params (Optional):** \`?status=Pending&urgency=High&page=1&limit=50\`
- **Description:** Retrieves complaints **only** for the department the currently logged-in employee belongs to.
- **Response:** Array of complaint objects similar to the Admin view, but restricted to their department.

---

## 4. Shared Endpoints (Admin & Employee)

### Update Complaint Status
- **Endpoint:** \`PATCH /api/complaints/:complaintId/status\`
- **Description:** Updates the status of a specific complaint and adds a timeline note. Employees can only update complaints within their own department.
- **Request Body (JSON):**
  \`\`\`json
  {
    "status": "InProgress",
    "note": "We have dispatched a team to investigate the issue."
  }
  \`\`\`
  *(Valid Statuses: "Pending", "InProgress", "Resolved", "Rejected")*
- **Response:**
  \`\`\`json
  {
    "success": true,
    "message": "Complaint status updated successfully",
    "data": { ...updatedComplaintObject }
  }
  \`\`\`
