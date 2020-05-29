import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import EditBlogPost from "./EditBlogPost";



const ListBlogPosts = props => {
  const [blogposts, setBlogposts] = useState([]);

  // Get id from reducer to get users own post
  const { loginUser } = props.auth;
  const id = loginUser.id;

  //Get users posts
  const getBlogPosts = async () => {
    try {
      const response = await fetch(`http://localhost:5000/blogposts/${id}`);
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
              <td> <img 
                src={blogpost.image_url}
                alt=""
              /></td>
              
              <td>
                <EditBlogPost
                  blogpost={blogpost}
                  blogposts={blogposts}
                  setBlogposts={setBlogposts}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

// mapStateToProps to access user ID for blogposts
const mapStateToProps = state => ({
  auth: state.isLogged
});

export default connect(mapStateToProps, {})(ListBlogPosts);
