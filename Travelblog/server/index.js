const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

//Sign-up
app.post("/signup", async (req, res) => {
  try {
    const { email, password, firstName, familyName } = req.body;
    // Search if user already exist in database

    const userexist = await pool.query(
      "SELECT email FROM users WHERE email LIKE $1",
      [email]
    );
    // Check if rows in userecist is "empty" (rows = [])
    if (userexist.rows.length > 0) {
      // Return responde that user already exist
      res.json({ msg: "User already exisit" });
    } else {
      //Create user if rows is empty
      const newUser = await pool.query(
        "INSERT INTO users (email, password, firstName, familyName) VALUES($1, $2, $3, $4) RETURNING *",
        [email, password, firstName, familyName]
      );
      res.json(newUser.rows);
      console.log("Successfully signed up user");
    }
  } catch (err) {
    console.error(err.message);
  }
});

// log in
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation

    const loginUser = await pool.query(
      "SELECT * FROM users WHERE email LIKE $1",
      [email]
    );

    const checkpassword = await pool.query(
      "SELECT password FROM users WHERE email LIKE $1",
      [email]
    );
    if (loginUser.rows[0])
      if (checkpassword.rows[0].password == password) {
        console.log("Log in success");
        res.json(loginUser.rows);
      } else {
        console.log("Invalid passwod");
      }
  } catch (err) {
    console.error(err.message);
  }
});

// npx nodemon - local installation
app.listen(5000, () => {
  console.log("server has started on port 5000");
});
