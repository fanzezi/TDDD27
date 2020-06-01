const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const jwt = require("jsonwebtoken");

//ROUTES//
app.use(cors());
app.use(express.json());

// Sign up user
app.post("/signup", async (req, res) => {
  try {
    const { email, password, firstName, familyName } = req.body;

    // Search if user already exist in database
    const userexist = await pool.query(
      "SELECT email FROM userdata WHERE email LIKE $1",
      [email]
    );
    // Check if rows in userexist is "empty" (rows = [])
    if (userexist.rows.length > 0) {
      res.json({ msg: "User already exisit" });
    } else {
      //Create user if rows is empty
      const newUser = await pool.query(
        "INSERT INTO userdata (email, password, firstName, familyName) VALUES($1, $2, $3, $4) RETURNING *",
        [email, password, firstName, familyName]
      );
      res.json(newUser.rows);
      console.log("Successfully signed up user");
    }
  } catch (err) {
    console.error(err.message);
  }
});

// Login user
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exist
    const getUser = await pool.query(
      "SELECT * FROM userdata WHERE email LIKE $1",
      [email]
    );

    // Check password
    const loginUser = getUser.rows[0];
    const checkpassword = await pool.query(
      "SELECT password FROM userdata WHERE email LIKE $1",
      [email]
    );
    if (loginUser)
      if (checkpassword.rows[0].password == password) {
        console.log("Log in success");
        //Create and assign token
        const token = jwt.sign({ loginUser }, "secretKey");
        // return user token and user data
        res.json({ token, loginUser });
      } else {
        console.log("Invalid passwod");
      }
  } catch (err) {
    console.error(err.message);
  }
});

//Create a blogpost
app.post("/blogposts", async (req, res) => {
  try {
    const { title, description, id, image_url, country } = req.body;

    const newBlogPost = await pool.query(
      "INSERT INTO blog (title, description, user_id, image_url, country) VALUES( $1, $2, $3, $4, $5) RETURNING *",
      [title, description, id, image_url, country]
    );

    res.json(newBlogPost.rows[0]);
  } catch (err) {
    console.err(err.message);
  }
});

//get all user blogposts
app.get("/blogposts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const allBlogPosts = await pool.query(
      "SELECT * FROM blog WHERE user_id = $1",
      [id]
    );
    res.json(allBlogPosts.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Get userdata
app.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const allInfo = await pool.query("SELECT * FROM userdata WHERE id = $1", [
      id
    ]);
    res.json(allInfo.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Update map
app.put("/map", async (req, res) => {
  try {
    const { map, id } = req.body;
    await pool.query("UPDATE userdata SET map = $1 WHERE id = $2", [map, id]);

    res.json("Map was updated");
  } catch (err) {
    console.error(err.message);
  }
});

//edit a blogpost
app.put("/blogposts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, blog_post_id } = req.body;
    await pool.query(
      "UPDATE blog SET title = $1, description = $2 WHERE post_id = $3",
      [title, description, blog_post_id]
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
    await pool.query("DELETE FROM blog WHERE post_id = $1", [id]);
    res.json("Blogpost was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
