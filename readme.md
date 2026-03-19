/employee-system
  /src
    /config
      db.js
      redis.js
    /models
      employee.model.js
      attendance.model.js
      salary.model.js
    /services
      employee.service.js
      attendance.service.js
      salary.service.js
    /controllers
      employee.controller.js
      attendance.controller.js
      salary.controller.js
      auth.controller.js
    /routes
      employee.routes.js
      attendance.routes.js
      salary.routes.js
      auth.routes.js
    /middlewares
      auth.middleware.js
      role.middleware.js
      error.middleware.js
      rateLimiter.js
    /utils
      response.js
      catchAsync.js
      hash.js
      jwt.js
      debounce.js
      throttle.js
    /jobs
      salaryQueue.js
      salaryWorker.js
    app.js
    server.js
.env
package.json


/employee-system
  /src
    /config
      db.js
      redis.js
    /models
      employee.model.js
      attendance.model.js
      salary.model.js
    /services
      employee.service.js
      attendance.service.js
      salary.service.js
    /controllers
      employee.controller.js
      attendance.controller.js
      salary.controller.js
      auth.controller.js
    /routes
      employee.routes.js
      attendance.routes.js
      salary.routes.js
      auth.routes.js
    /middlewares
      auth.middleware.js
      role.middleware.js
      error.middleware.js
      rateLimiter.js
    /utils
      response.js
      catchAsync.js
      hash.js
      jwt.js
      debounce.js
      throttle.js
    /jobs
      salaryQueue.js
      salaryWorker.js
    app.js
    server.js
.env
package.json


STEP 8 — BullMQ Queue Setup (salaryQueue.js)
const { Queue } = require("bullmq");

const salaryQueue = new Queue("salaryQueue", {
  connection: { host: process.env.REDIS_HOST, port: process.env.REDIS_PORT }
});

module.exports = salaryQueue;


STEP 9 — BullMQ Worker (salaryWorker.js)
const { Worker } = require("bullmq");
const salaryService = require("../services/salary.service");

new Worker("salaryQueue", async job => {
  console.log("Running salary job:", job.data);
  await salaryService.generateMonthlySalary(job.data.month);
});



STEP 5 — Setup SQL Database (SSMS)
Create Database
CREATE DATABASE employeeDB;
Create Tables
🧩 employees
CREATE TABLE employees (
  id INT PRIMARY KEY IDENTITY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  salary INT,
  role VARCHAR(20),
  join_date DATE
);
🧩 attendance
CREATE TABLE attendance (
  id INT PRIMARY KEY IDENTITY,
  employee_id INT,
  date DATE,
  status VARCHAR(10),
  FOREIGN KEY (employee_id) REFERENCES employees(id)
);
🧩 salary_payments
CREATE TABLE salary_payments (
  id INT PRIMARY KEY IDENTITY,
  employee_id INT,
  month VARCHAR(20),
  amount INT,
  generated_at DATETIME,
  FOREIGN KEY (employee_id) REFERENCES employees(id)
);


STEP 15 — Employee Service (employee.service.js)

(Example)

const { poolPromise } = require("../config/db");

exports.getEmployees = async () => {
  const pool = await poolPromise;
  const result = await pool.request().query(
    "SELECT id, name, email, salary, role, join_date FROM employees"
  );
  return result.recordset;
};
⭐ STEP 16 — Employee Controller
exports.getEmployees = catchAsync(async (req, res) => {
  const employees = await employeeService.getEmployees();
  res.json({ employees });
});
⭐ STEP 17 — Router
const router = require("express").Router();
const employeeController = require("../controllers/employee.controller");

router.get("/", employeeController.getEmployees);

module.exports = router;
⭐ STEP 18 — Global app.js
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");

const errorHandler = require("./middlewares/error.middleware");

const employeeRoutes = require("./routes/employee.routes");

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use("/employees", employeeRoutes);

app.use(errorHandler);

module.exports = app;
⭐ STEP 19 — server.js
require("dotenv").config();
const app = require("./app");

app.listen(process.env.PORT, () => {
  console.log("Server running on port", process.env.PORT);
});