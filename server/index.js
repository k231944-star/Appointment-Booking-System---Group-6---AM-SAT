const express = require("express");
const pool = require("./db.js");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
// const bcrypt = require("bcryptjs");
const cors = require("cors");
const app = express();
app.use(cookieParser());

app.use(express.json());
app.use(cors({
    origin: true, // Cho phép mọi port (5173, 5174...) truy cập
    credentials: true
}));

const allTimeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
];

app.get("/available-times/:date", async (req, res) => {
  const { date } = req.params;

  try {
    const result = await pool.query(
      `SELECT appointment_time 
       FROM appointments 
       WHERE appointment_date = $1 
       AND status = 'Booked'`,
      [date]
    );

    const bookedTimes = result.rows.map((row) =>
      row.appointment_time.toString().slice(0, 5)
    );

    const slots = allTimeSlots.map((time) => ({
      time,
      available: !bookedTimes.includes(time),
    }));

    res.json(slots);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching available times" });
  }
});

app.post("/appointments", async (req, res) => {
  const { name, email, service, date, time, notes } = req.body;

  try {
    const emailAlreadyBooked = await pool.query(
      `SELECT * FROM appointments
       WHERE email = $1
       AND status = 'Booked'`,
      [email]
    );

    if (emailAlreadyBooked.rows.length > 0) {
      return res.status(400).json({
        message: "This email already has an appointment booked",
      });
    }

    const existing = await pool.query(
      `SELECT * FROM appointments
       WHERE appointment_date = $1
       AND appointment_time = $2
       AND status = 'Booked'`,
      [date, time]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({
        message: "This time is already booked",
      });
    }

    await pool.query(
      `INSERT INTO appointments 
       (name, email, service, appointment_date, appointment_time, notes, status)
       VALUES ($1, $2, $3, $4, $5, $6, 'Booked')`,
      [name, email, service, date, time, notes]
    );

    res.json({ message: "Appointment booked successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error booking appointment" });
  }
});
// Registration Route
app.post("/register", async (req, res) => {
  //   const { name, email, password } = req.body;
  const name = req.body.Name;
  const email = req.body.Email;
  const password = req.body.Password;

  // Check if all fields are provided
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please enter all the data" });
  }

  try {
    // Check if user already exists in the database
    const userExist = await pool.query("SELECT * FROM login WHERE email = $1", [
      email,
    ]);

    if (userExist.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Insert new user into the database
    await pool.query(
      "INSERT INTO login (name, email, password) VALUES ($1, $2, $3)",
      [name, email, password]
    );

    // Respond to the client
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/admin/bookings", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM appointments
       ORDER BY appointment_date ASC, appointment_time ASC`
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching bookings" });
  }
});

app.put("/admin/bookings/cancel/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query(
      `UPDATE appointments 
       SET status = 'Cancelled' 
       WHERE id = $1`,
      [id]
    );

    res.json({ message: "Booking cancelled successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error cancelling booking" });
  }
});

app.post("/login", (req, res) => {
  const email = req.body.Email;
  const password = req.body.Password;

  if (!email || !password) {
    return res.status(400).json({
      Login: false,
      message: "Please provide both email and password",
    });
  }

  pool.query(
    "SELECT * FROM login WHERE email=$1 AND password=$2",
    [email, password],
    (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          Login: false,
          message: "Server error",
        });
      }

      if (data.rows.length > 0) {
        const user = data.rows[0];

        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
            role: user.role,
          },
          "mySecretKey",
          { expiresIn: "1h" }
        );

        return res.json({
          Login: true,
          role: user.role,
          name: user.name,
          email: user.email,
          message: "Login successful",
          token: token,
        });
      }

      return res.status(401).json({
        Login: false,
        message: "Invalid email or password",
      });
    }
  );
});


require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.post("/ai-chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
You are a dental booking assistant.
Help users with dental appointments, services, booking times, and general questions.
Do not give medical diagnosis.

User: ${message}
      `,
    });

    res.json({ reply: response.text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: "AI chat error" });
  }
});
// Root Route (Testing)
app.get("/", (req, res) => {
  res.send("Hello World");
});
// API: Lấy danh sách lịch hẹn của 1 User cụ thể (dựa vào email)
app.get("/my-appointments", async (req, res) => {
  try {
    const { email } = req.query;
    const userAppointments = await pool.query(
      "SELECT * FROM appointments WHERE email = $1 ORDER BY appointment_date DESC",
      [email]
    );
    res.json(userAppointments.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
// API: LẤY THÔNG TIN PROFILE CỦA USER
app.get("/user/profile", async (req, res) => {
  try {
    const { email } = req.query;
    const user = await pool.query(
      "SELECT name, email FROM login WHERE email = $1",
      [email]
    );
    if (user.rows.length > 0) {
      res.json(user.rows[0]);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.put("/user/profile/update", async (req, res) => {
  const { currentEmail, newName, newEmail } = req.body;
  
  try {
    // 1. Cập nhật tên và email mới vào bảng login
    await pool.query(
      "UPDATE login SET name = $1, email = $2 WHERE email = $3",
      [newName, newEmail, currentEmail]
    );

    // 2. NẾU đổi email, phải update luôn email trong bảng appointments để không mất lịch hẹn
    if (currentEmail !== newEmail) {
      await pool.query(
        "UPDATE appointments SET email = $1 WHERE email = $2",
        [newEmail, currentEmail]
      );
    }

    res.json({ message: "Profile updated successfully!" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Error updating profile" });
  }
});
// API: ADMIN LẤY DANH SÁCH KHÁCH HÀNG
app.get("/admin/customers", async (req, res) => {
  try {
    // Chỉ lấy những tài khoản có role là 'customer' (không lấy admin)
    const customers = await pool.query(
      "SELECT id, name, email FROM login WHERE role = 'customer' ORDER BY id DESC"
    );
    res.json(customers.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
// Start Server
app.listen(4446, () => {
  console.log("App is running on port 4446");
});
