Registration and Reservation System API
Overview
This API enables users to register, authenticate, and manage reservations at various locations. It provides role-based access to certain features, allowing only admins to manage venues.
Technologies Used
Backend: Node.js with Express.js
Database: MongoDB (Mongoose)
Authentication: JSON Web Tokens (JWT)
Validation: express-validator
Testing: Jest
Caching: Redis

API Endpoints
1. User Authentication and Authorization
User Registration Endpoint: POST /api/auth/register

Request Body:


Plain Text








jsonCopy code{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "yourpassword"
}


Status: 201 Created



Plain Text








jsonCopy code{
  "status": "success",
  "data": {
    "user": {
      "_id": "user-id",
      "name": "John Doe",
      "email": "user@example.com"
    }
  }
}


Notes: Passwords are hashed using bcrypt/bcryptjs.
User Login Endpoint: POST /api/auth/login

Request Body:


Plain Text








jsonCopy code{
  "email": "user@example.com",
  "password": "yourpassword"
}


Status: 200 OK



Plain Text








jsonCopy code{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "user": {
      "_id": "60b7c7f4f8ba8808a0b12cd4",
      "name": "John Doe",
      "email": "user@example.com"
    }
  }
}


Authenticated Requests
Notes: All endpoints except /api/auth/login and /api/auth/register require a JWT token in the Authorization header in Bearer format.

2. Location Management (CRUD)
Create Location (Admin Only)
Endpoint: POST /api/venues




Plain Text








{
  "name": "Venue Name",
  "location": "City Center",
  "capacity": 100,
  "description": "A brief description of the venue."
}


Response:
Status: 201 Created

Notes: Only users with the admin role can perform this operation.
View Locations
Endpoint: GET /api/venues
Query Parameters:
page (optional): Pagination page number.
limit (optional): Number of venues per page.
location (optional): Filter by location.

Response:
Status: 200 OK
Content-Type: application/json


View Location Details
Endpoint: GET /api/venues/:id
Response:
Status: 200 OK
Content-Type: application/json


Update Location (Admin Only)
Endpoint: PUT /api/venues/:id
Request Body: Same as POST /api/venues
Response:
Status: 200 OK
Content-Type: application/json

Notes: Only users with the admin role can perform this operation.

Delete Location (Admin Only)
Endpoint: DELETE /api/venues/:id
Response:
Status: 204 No Content

Notes: Only users with the admin role can perform this operation.


3. Reservation System
Create a Reservation
Endpoint: POST /api/reservations




Plain Text








{
  "venueId": "venue-id",
  "date": "2023-09-10",
  "time": "18:00",
  "numberOfPeople": 4
}


Status: 201 Created
Content-Type: application/json



Plain Text








{
  "status": "success",
  "data": {
    "reservation": {
      "_id": "reservation-id",
      "venueId": "venue-id",
      "userId": "user-id",
      "date": "2023-09-10",
      "time": "18:00",
      "numberOfPeople": 4
    }
  }
}


Notes: The system checks venue availability to avoid double bookings.

View User's Reservations
Endpoint: GET /api/reservations
Status: 200 OK
Content-Type: application/json




Plain Text








{
  "status": "success",
  "data": {
    "reservations": [
      {
        "_id": "reservation-id",
        "venueId": "venue-id",
        "userId": "user-id",
        "date": "2023-09-10",
        "time": "18:00",
        "numberOfPeople": 4
      }
    ]
  }
}


View Reservation Details
Endpoint: GET /api/reservations/:id




Plain Text








{
  "status": "success",
  "data": {
    "reservation": {
      "_id": "reservation-id",
      "venueId": "venue-id",
      "userId": "user-id",
      "date": "2023-09-10",
      "time": "18:00",
      "numberOfPeople": 4
    }
  }
}


Status: 200 OK
Content-Type: application/json
Notes: Only the user who created the reservation or an admin can view the details.
Cancel a Reservation
Endpoint: DELETE /api/reservations/:id
Response:
Status: 204 No Content

Notes: Only the user who created the reservation or an admin can cancel it.


4. Data Validation and Error Handling
Data Verification
Validation: All request data is validated using Joi or express-validator.
Password Policy: Passwords must be at least 8 characters long, containing both letters and numbers.
Email Validation: Email addresses must be in the correct format.

Error Handling
401 Unauthorized / 403 Forbidden: Returned if the user is not authenticated or lacks the necessary permissions.
400 Bad Request: Returned when data validation fails.
404 Not Found: Returned when a non-existent resource is requested.


5. Additional Functional Features
Role-Based Access Control (RBAC)
Users have roles (user, admin).
Only admins can perform location management operations.

Caching
Purpose: Improve performance by caching venue lists.
Technology: Redis (optional).
Cache Invalidation: Cache is cleared when a new venue is added or an existing venue is updated.


API Documentation
Tool: Postman or Swagger
Content: Detailed usage instructions, including input parameters and expected responses for each endpoint.



