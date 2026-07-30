# Rail Madad ERP / Admin Portal API Documentation

This document contains all the necessary API endpoints, request methods, payloads, and response examples for the Frontend team to build the ERP (Enterprise Resource Planning), Admin Portal, and Department Dashboard.

---

## 1. Authentication (Login)
Both **Admins** and **Department Employees** use the same login endpoint. The role is returned in the response so the UI can redirect the user to the correct dashboard (Admin Dashboard vs Department Dashboard).

- **Endpoint:** `/api/auth/login`
- **Method:** `POST`
- **Headers:** `Content-Type: application/json`

### Request Body
```json
{
  "email": "housekeeping@railmadad.com",
  "password": "house@1234"
}
```
*(Use `admin@railmadad.com` / `admin@123` for Admin)*

### Success Response (200 OK)
The API returns a `token` (which is also set as an HTTP-only cookie) and the `user` object. The frontend should check `user.role` (`"admin"` or `"department_employee"`) to handle routing.
```json
{
  "success": true,
  "message": "User logged in successfully",
  "data": {
    "user": {
      "_id": "69ab14f0239136c15cb15b28",
      "firstName": "Suresh",
      "lastName": "Yadav",
      "email": "housekeeping@railmadad.com",
      "role": "department_employee",
      "department": "69ac4750d6668d9fb682eb12",
      "isActive": true
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6Ik..."
  }
}
```

---

## 2. Admin Routes

### Get All Complaints
Fetches every complaint in the system regardless of department. **Only accessible by users with the `admin` role.**

- **Endpoint:** `/api/complaints/all`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer <token>` (or rely on HTTP-only cookie)
- **Query Parameters (Optional):**
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 50)
  - `status`: `"Pending"` | `"InProgress"` | `"Resolved"` | `"Rejected"`
  - `urgency`: `"Low"` | `"Medium"` | `"High"`
  - `category`: `"Cleanliness"` | `"Damage"` | `"Security"` | etc.

### Example Request URL
`GET /api/complaints/all?status=Pending&limit=10&page=1`

### Success Response (200 OK)
```json
{
  "success": true,
  "message": "All complaints fetched successfully",
  "data": [
    {
      "complaintId": "RM-2026-L3WJV",
      "category": "Cleanliness",
      "urgency": "Low",
      "status": "Pending",
      "department": {
        "_id": "69ac4750d6668d9fb682eb12",
        "name": "Housekeeping",
        "description": "Handles cleanliness and hygiene complaints"
      },
      "submittedBy": {
        "_id": "69ab14f0239136c15cb15b28",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@example.com",
        "phoneNumber": "9876543210"
      },
      "createdAt": "2026-03-07T20:22:05.315Z"
    }
    // ... more complaints
  ]
}
```

---

## 3. Department Employee Routes

### Get Department Complaints
Fetches complaints specifically assigned to the logged-in employee's department. **Accessible by `department_employee` and `admin`.**

- **Endpoint:** `/api/complaints/department-complaints`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer <token>`
- **Query Parameters (Optional):**
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 50)
  - `status`: `"Pending"` | `"InProgress"` | `"Resolved"` | `"Rejected"`
  - `urgency`: `"Low"` | `"Medium"` | `"High"`

### Example Request URL
`GET /api/complaints/department-complaints?status=Pending`

### Success Response (200 OK)
```json
{
  "success": true,
  "message": "Department complaints fetched successfully",
  "data": [
    {
      "complaintId": "RM-2026-L3WJV",
      "category": "Cleanliness",
      "urgency": "Low",
      "status": "Pending",
      "department": {
        "_id": "69ac4750d6668d9fb682eb12",
        "name": "Housekeeping"
      },
      "createdAt": "2026-03-07T20:22:05.315Z"
    }
  ]
}
```

---

### Update Complaint Status
Allows department employees to update the status of a complaint assigned to their department. Admins can update any complaint.

- **Endpoint:** `/api/complaints/:complaintId/status`
- **Method:** `PATCH`
- **Headers:** 
  - `Authorization: Bearer <token>`
  - `Content-Type: application/json`

### Request Body
- `status` (Required): `"Pending"`, `"InProgress"`, `"Resolved"`, or `"Rejected"`
- `note` (Optional): A message explaining the update (e.g., "Cleaned the toilet in coach S4")

```json
{
  "status": "Resolved",
  "note": "The coach has been fully cleaned and sanitized."
}
```

### Success Response (200 OK)
```json
{
  "success": true,
  "message": "Complaint status updated successfully",
  "data": {
    "complaintId": "RM-2026-L3WJV",
    "status": "Resolved",
    "timeline": [
      {
        "status": "Pending",
        "note": "Complaint registered successfully",
        "updatedAt": "2026-03-07T20:22:05.307Z"
      },
      {
        "status": "Resolved",
        "note": "The coach has been fully cleaned and sanitized.",
        "updatedBy": "69ab14f0239136c15cb15b28",
        "updatedAt": "2026-03-08T10:15:00.000Z"
      }
    ]
  }
}
```

### Error Responses to Handle in UI
- **401 Unauthorized:** `{"error": "User not authenticated"}` (Token missing or expired. Redirect to Login).
- **403 Forbidden:** `{"success": false, "message": "Access denied..."}` (User doesn't have the right permissions to view the page).
- **404 Not Found:** `{"success": false, "message": "Complaint not found"}` (Invalid complaint ID used in URL).
