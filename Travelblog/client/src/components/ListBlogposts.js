import React, { Fragment, useEffect, useState } from "react";


import EditBlogPost from "./EditBlogPost";

const ListBlogPosts = () => {
  const [blogposts, setBlogposts] = useState([]);

  const getBlogPosts = async () => {
    try {
      const response = await fetch("http://localhost:5000/blogposts");
      const jsonData = await response.json();
      setBlogposts(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getBlogPosts();
  }, []);

  return (
    <Fragment>
      {" "}
      <table className="table mt-5 text-center" id="top-leader">
        <tbody>
          {blogposts.map(blogpost => (
            <tr key={blogpost.blogpost_id}>
              <td>{blogpost.description}</td>
              <td>
                <EditBlogPost blogpost={blogpost} blogposts={blogposts} setBlogposts={setBlogposts}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListBlogPosts;