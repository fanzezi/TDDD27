import React, {Fragment, useState} from "react";

const InputBlogPost = () => {
    const [description, setDescription] = useState("");
  
    const onSubmitForm = async e => {
      e.preventDefault();
      try {
        const body = { description };
        const response = await fetch("http://localhost:5000/blogposts", {
          method: "POST",
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
          <h1 className="text-center mt-5">Write a new blogpost</h1>
          <div style={{width: "100%", display: 'flex', justifyContent:'center'}}>
          <form className="text-center mt-5" onSubmit={onSubmitForm}>
            <textarea
              style={{width: "600px", height: "400px"}}
              type="text"
              className="form-control"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            <button className="btn btn-secondary btn-lg btn-block mt-5">Submit post</button>
          </form>
          </div>
         
        </Fragment>
      );
};

export default InputBlogPost;