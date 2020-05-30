import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";

const EditBlogPost = props => {
  const { blogpost, blogposts, setBlogposts } = props;
  const [description, setDescription] = useState(blogpost.description);

  // Get id from reducer to get users own post
  const { loginUser } = props.auth;
  const id = loginUser.id;

  const deleteBlogPost = async id => {
    try {
      const deleteBlogPost = await fetch(
        `http://localhost:5000/blogposts/${id}`,
        {
          method: "DELETE"
        }
      );
      setBlogposts(blogposts.filter(blogpost => blogpost.post_id !== id));
      //this.forceUpdate();
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  const updateDescription = async e => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch(`http://localhost:5000/blogposts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <Dropdown>
        <Dropdown.Toggle
          variant="dark"
          size="sm"
          id="dropdown-basic"
        ></Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item
            data-toggle="modal"
            data-target={`#id${blogpost.post_id}`}
          >
            Edit
          </Dropdown.Item>
          <Dropdown.Item onClick={() => deleteBlogPost(blogpost.post_id)}>
            Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <div
        className="modal"
        id={`id${blogpost.post_id}`}
        onClick={() => setDescription(blogpost.description)}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Blogpost</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={() => setDescription(blogpost.description)}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
                onClick={e => updateDescription(e)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() => setDescription(blogpost.description)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

// mapStateToProps to access user ID for blogposts
const mapStateToProps = state => ({
  auth: state.isLogged
});

export default connect(mapStateToProps, {})(EditBlogPost);
