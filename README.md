                             # <h1 align="center" style="color: #5C6AC4;">User-Management</h1>



Built with Node.js, Express.js, and MongoDB, the backend ensures seamless communication between the frontend and the database. JWT adds a layer of security to user authentication.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)

- [API Endpoints](#endpoints)


## Features


### Authorization and Role-Based Access

Role-based access control is implemented to ensure that only authorized users can perform certain actions. The roles include:

- **Admin:** Has access to all endpoints and functionalities.
- **User:** Limited access, including updating their profile and deleting their account.

### AWS S3 Bucket Integration

The application leverages AWS S3 bucket for efficient storage and retrieval of user profile images. The integration ensures reliable and scalable handling of image files.

### Middleware

Two custom middleware functions are utilized:

- **Auth Middleware:** 
Validates user authentication through JWT, ensuring secure access to protected routes.

- **Role-Based Middleware:** 
Restricts access based on the user's role (Admin or User), preventing unauthorized actions.


### 1. User Registration

- **Method:** `POST`
- **Endpoint:** `/User/Signup`
- **Description:** Allows users to register with a unique email or phone number OR Both.
- **Validation:** Requires at least an email or a phone number.

### 2. User Login

- **Method:** `POST`
- **Endpoint:** `/User/Login`
- **Description:** Enables users to log in with their email or phone number OR Both.
- **Validation:** Requires a valid password and email or phone number.

### 3. User Profile Update

- **Method:** `PUT`
- **Endpoint:** `/User/Update/:id`
- **Description:** Allows users to update their profile Image and Name .
- **Authorization:** Requires authentication and role-based access (Admin or User).

### 4. User Deletion


- **Method:** `DELETE`
- **Endpoint:** `/User/Delete/:id`
- **Description:** Permits users to delete their account.
- **Authorization:** Requires authentication and role-based access (Admin or User).


### 5. Get All Users

- **Method:** `GET`
- **Endpoint:** `/User/All-Users`
- **Description:** Retrieves a list of all registered users.
- **Authorization:** Requires authentication and role-based access (Admin).
- **Response:** Returns an array of user objects.

### 6. Get Specific User

- **Method:** `GET`
- **Endpoint:** `/User/Specific-User/:id`
- **Description:** Fetches details of a specific user based on the provided ID.
- **Authorization:** Requires authentication and role-based access (Admin or User).
- **Response:** Returns details of the specified user.



## Technologies Used

- Node.js
- Express.js
- MongoDB
- Bcrypt
- JSON Web Token (JWT)
- AWS S3 (for file storage)
- Multer (for file uploads)
- CORS


## Installation

1. Clone the repository.
2. Install dependencies: `npm install`
3. Set up environment variables.
4. Run the application: `npm run server`



## API Endpoints

Document the API endpoints and their functionalities.


#### 1. Sign Up

- **Method:** `POST`
- **Endpoint:** `/User/Signup`
- **Description:** Register a new user.
- **Request Body:**
  - `email` (String): User's email.
  - `phoneNumber` (String): User's phone number.
  - `name` (String): User's name.
  - `password` (String): User's password.
  - `Role` (String): User's role (e.g., Admin, User).

#### 2. Login

- **Method:** `POST`
- **Endpoint:** `/User/Login`
- **Description:** Log in a user.
- **Request Body:**
  - `email` (String): User's email.
  - `phoneNumber` (String): User's phone number.
  - `password` (String): User's password.
- **Response:**
  - `msg` (String): Success message.
  - `name` (String): User's name.
  - `UserPresent` (Object): User details.
  - `token` (String): JWT token.
  - `Role` (String): User's role.

#### 3. Update User

- **Method:** `PUT`
- **Endpoint:** `/User/Update/:id`
- **Description:** Update user details.
- **Request Params:**
  - `id` (String): User's ID.
- **Request Body:**
  - `name` (String): Updated user name.
  - `Image` (File): Updated profile image.

#### 4. Delete User

- **Method:** `DELETE`
- **Endpoint:** `/User/Delete/:id`
- **Description:** Delete a user.
- **Request Params:**
  - `id` (String): User's ID.
- **Response:**
  - `message` (String): Deletion success message.
  - `DeletedData` (Object): Deleted user details.

#### 5. Get All Users

- **Method:** `GET`
- **Endpoint:** `/User/All-Users`
- **Description:** Get a list of all users.
- **Response:**
  - Array of user objects.

#### 6. Get Specific User

- **Method:** `GET`
- **Endpoint:** `/User/Specific-User/:id`
- **Description:** Get details of a specific user.
- **Request Params:**
  - `id` (String): User's ID.
- **Response:**
  - User object for the specified ID.






You Can also visit on portfolio - [My Portfolio](https://msaifkhan01.github.io/)
