import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Row, Col } from "react-bootstrap";
import EditBlogPost from "./EditBlogPost";
import clickedCountry from "./MapController";

const ListBlogPosts = props => {
  const [blogposts, setBlogposts] = useState([]);
  console.log("Blogpost:");
  console.log(blogposts);

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

  console.log(clickedCountry);

  useEffect(() => {
    getBlogPosts();
  }, []);

  return (
    <Fragment>
      <table
        className="table w-75 mx-auto  mt-5 text-center "
        id="top-leader"
        responsive
      >
        {blogposts.reverse().map(blogpost => (
          <tbody>
            <Row key={blogpost.post_id} className="mt-3 mb-3">
              <Col>
                <Row>
                  <Col>
                    <h3>{blogpost.title}</h3>
                  </Col>
                </Row>

                <Row className="mt-2 mb-2">
                  <Col>{blogpost.description}</Col>
                </Row>
                <Row>
                  <br />
                  <Col>
                    <img src={blogpost.image_url} width="95%" alt="" />
                  </Col>
                </Row>
                <Row>
                  <p
                    className=" bg-light text-secondary mx-auto mt-3"
                    style={{
                      width: "auto",
                      padding: "5px",

                      borderRadius: "40px"
                    }}
                  >
                    {blogpost.country ? blogpost.country : " "}
                  </p>
                </Row>
              </Col>

              <EditBlogPost
                blogpost={blogpost}
                blogposts={blogposts}
                setBlogposts={setBlogposts}
              />
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
