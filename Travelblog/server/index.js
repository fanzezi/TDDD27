const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");


//ROUTES//
app.use(cors());
app.use(express.json());

//create a blogpost
app.post("/blogposts", async(req, res) =>{
    console.log("hej2");
    try {

        console.log("hej");
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
app.get("/blogposts", async(req, res) => {

    try {

        const allBlogPosts = await pool.query("SELECT * FROM blogpost");
        res.json(allBlogPosts.rows);

    } catch (err) {
        console.error(err.message);
        
    }

});

//get a blogpost
app.get("/blogposts/:id", async(req, res) => {

    try {

        const { id } = req.params;
        const blogpost = await pool.query("SELECT * FROM blogpost WHERE blogpost_id = $1", 
        [id]);

        
        res.json(blogpost.rows[0]);
         
    } catch (err) {
        console.error(err.message);
        
    }

});

//edit a blogpost
app.put("/blogposts/:id", async(req, res) => {

    try {
        const {id} = req.params;
        const {description} = req.body;
        const updateBlogPost = await pool.query("UPDATE blogpost SET description = $1 WHERE blogpost_id = $2", 
        [description, id]
        );

        res.json("Blogpost was updated");
        
    } catch (err) {
        console.error(err.message);
        
    }
});

//delete a blogpost
app.delete("/blogposts/:id", async(req, res) => {

    try {
        const {id} = req.params;
        const deleteBlogPost = await pool.query("DELETE FROM blogpost WHERE blogpost_id = $1", 
        [id]
        );
        res.json("Blogpost was deleted");
    } catch (err) {
        console.error(err.message);
        
    }
});



app.listen(5000, () => {
    console.log("server has started on port 5000")
});