# Storage Management System – Backend

REST API for a mobile storage management app built with Node.js, Express, and MongoDB.  
Supports users, folders, notes, images, PDFs, calendar view, and static pages from the given Figma design.

Local base URL: http://localhost:5000
Live Base URL

- API base: `https://storage-management-tufh.onrender.com`

---
Tech Stack

- Node.js, Express.js  
- MongoDB, Mongoose  
- JWT authentication  
- Joi for validation  
- bcryptjs, cors, morgan, dotenv

---

 Project Structure (short)


src/
  app.js
  server.js
  config/         config, db connection
  middlewares/    auth, error, validation
  utils/          helpers (JWT)
  routes/         main router
  modules/        feature modules
    auth/
    user/
    folder/
    file/
    calendar/
    static/

Postman
Base URL variable:
base_url = https://storage-management-tufh.onrender.com
Optional env variable:
token – set from login response and used as Bearer token
A Postman collection with all endpoints is included in the repository.

 Installation & Setup

1. Clone the repository

   bash :
   git clone https://github.com/mohadeb12/storage-management-system.git
   cd storage-management-system
   