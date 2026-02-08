# 🚀 Work-Space API

A robust RESTful API built with **Node.js**, **Express**, and **MongoDB** for managing office spaces, user accounts, and real-time session tracking. This project features secure JWT authentication and full **Swagger/OpenAPI 3.0** documentation.



## 🛠️ Tech Stack
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (with Mongoose ODM)
* **Authentication:** JSON Web Tokens (JWT)
* **Documentation:** Swagger UI & OpenAPI 3.0

---

## 📖 API Documentation
Once the server is running, you can access the interactive Swagger documentation at:
> **`http://localhost:3000/api-docs`**

This allows you to test all endpoints directly from your browser.



---

## 🚦 Key Endpoints

### 🔐 Authentication
* `POST /auth/register` - Create a new account.
* `POST /auth/login` - Authenticate and receive a Bearer Token.

### 🏢 Spaces
* `GET /space` - List all available spaces.
* `POST /space` - Create a new space (Admin).
* `GET /space/:id` - View details of a specific space.

### ⏱️ Sessions
* `POST /session/start` - Start a new workspace session.
* `POST /session/end/:id` - End an active session and calculate costs.
* `GET /session` - View all session history.

---
### ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/qasim050/work-space-API.git](https://github.com/qasim050/work-space-API.git)
   cd work-space-api
2. **Install dependencies:**

   ```bash
    npm install
3. **Environment Setup:**
* Create a .env file in the root directory and add:

* PORT=3000
* MONGO_URI=your_mongodb_connection_string
* JWT_SECRET=your_super_secret_key
* Run the server:

### Start the server

    npm start
### 🔒 Security Note
* All protected routes require a JSON Web Token (JWT). To use them in Swagger or Postman:

* Login via /api/v1/auth/login or Register via /api/v1/auth/register.

* Copy the token from the JSON response.

* Authorize: * In Swagger: Click the Authorize button and paste the token.

* In Postman: Go to the Auth tab, select Bearer Token, and paste the token.

### 📝 To-Do / Future Updates
* [ ] Add automated unit testing with Jest.

* [ ] Integrate a payment gateway (Stripe/PayPal) for session billing.

