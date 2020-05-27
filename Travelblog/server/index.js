const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary");
const formData = require("express-form-data");

//const IncomingForm = require("formidable").IncomingForm;

// JSON WEB TOKEN HER

//ROUTES//
app.use(cors());
app.use(express.json());
app.use(formData.parse());

cloudinary.config({
  cloud_name: "dzlw3saez",
  api_key: "344633846794695",
  api_secret: "MJ8SGQXMdW-KLzW6rIIibjg91r0"
});

// JSON WEB TOKEN
app.get("/api", (res, req) => {
  res.json({
    message: "Welcome to the aPI"
  });
});

// VerifyToken
// verify to access protected pages with token
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

    // Validation

    const getUser = await pool.query(
      "SELECT * FROM userdata WHERE email LIKE $1",
      [email]
    );

    const loginUser = getUser.rows[0];
    const checkpassword = await pool.query(
      "SELECT password FROM userdata WHERE email LIKE $1",
      [email]
    );
    if (loginUser)
      if (checkpassword.rows[0].password == password) {
        console.log("Log in success");

        //create and assign token
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

//create a blogpost
app.post("/blogposts", async (req, res) => {
  try {
    const { description, id } = req.body;

    const newBlogPost = await pool.query(
      "INSERT INTO blog (description, user_id) VALUES( $1, $2) RETURNING *",
      [description, id]
    );

    res.json(newBlogPost.rows[0]);
  } catch (err) {
    console.err(err.message);
  }
});

//create a new image
app.post("/image-upload", async (req, res) => {
  // const {img}  = req.body;

  const path = Object.values(Object.values(req.files)[0])[0].path;
  cloudinary.uploader.upload(path).then(image => res.json([image]));
});

//get user blogposts
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
