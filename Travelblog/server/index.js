const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const jwt = require("jsonwebtoken");

// JSON WEB TOKEN HERE

//ROUTES//
app.use(cors());
app.use(express.json());

// JSON WEB TOKEN API
app.get("/api", (res, req) => {
  res.json({
    message: "Welcome to the aPI"
  });
});

// VerifyToken
function verifyToken(req, res, next) {
  const token = req.header("auth-token");
  //Check if bearer is undefined
  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(token, "secretKey");
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid token");
  }
}

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

    const getUser = await pool.query(
      "SELECT * FROM users WHERE email LIKE $1",
      [email]
    );

    const loginUser = getUser.rows[0];
    const checkpassword = await pool.query(
      "SELECT password FROM users WHERE email LIKE $1",
      [email]
    );
    if (loginUser)
      if (checkpassword.rows[0].password == password) {
        console.log("Log in success");

        //create and assign token
        const token = jwt.sign({ loginUser }, "secretKey");

        //res.header("auth-token", token).send(token);

        res.json({ token, loginUser });
      } else {
        console.log("Invalid passwod");
      }
  } catch (err) {
    console.error(err.message);
  }
});
/*
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
}); */

//test
app.get("/test", verifyToken, (req, res) => {
  res.json({ posts: { title: "hello", description: "Hello again" } });
});

//create a blogpost
app.post("/blogposts", async (req, res) => {
  try {
    const { description } = req.body;
    const newBlogPost = await pool.query(
      "INSERT INTO blogpost (description) VALUES($1) RETURNING *",
      [description]
    );

    res.json(newBlogPost.rows[0]);
  } catch (err) {
    console.err(err.message);
  }
});

//get all blogposts
app.get("/blogposts", verifyToken, async (req, res) => {
  try {
    const allBlogPosts = await pool.query("SELECT * FROM blogpost");
    res.json(allBlogPosts.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a blogpost
app.get("/blogposts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const blogpost = await pool.query(
      "SELECT * FROM blogpost WHERE blogpost_id = $1",
      [id]
    );

    res.json(blogpost.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//edit a blogpost
app.put("/blogposts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateBlogPost = await pool.query(
      "UPDATE blogpost SET description = $1 WHERE blogpost_id = $2",
      [description, id]
    );

    res.json("Blogpost was updated");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a blogpost
app.delete("/blogposts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteBlogPost = await pool.query(
      "DELETE FROM blogpost WHERE blogpost_id = $1",
      [id]
    );
    res.json("Blogpost was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
