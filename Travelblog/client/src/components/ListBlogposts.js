import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Row, Col } from "react-bootstrap";
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
      <table className="table mt-5 text-center" id="top-leader" responsive>
        {blogposts.reverse().map(blogpost => (
          <tbody>
            <Row key={blogpost.post_id}>
              <Col>
                <Row>
                  <Col>{blogpost.description}</Col>
                </Row>
                <Row>
                  <br />
                  <Col>
                    {" "}
                    <img src={blogpost.image_url} alt="" />
                  </Col>
                </Row>
              </Col>
              <td>
                <EditBlogPost
                  blogpost={blogpost}
                  blogposts={blogposts}
                  setBlogposts={setBlogposts}
                />
              </td>
            </Row>
          </tbody>
        ))}
      </table>
    </Fragment>
  );
};

// mapStateToProps to access user ID for blogposts
const mapStateToProps = state => ({
  auth: state.isLogged
});

export default connect(mapStateToProps, {})(ListBlogPosts);
