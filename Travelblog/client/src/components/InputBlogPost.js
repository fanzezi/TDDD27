import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { storage } from "./firebase";
import { countries } from "country-data";

const InputBlogPost = props => {
  const [image, setImage] = useState(null);
  const [image_url, setUrl] = useState("hej");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [country, setCountry] = useState("");
  const [userData, setData] = useState([]);

  // From reducers to access user ID
  const { loginUser } = props.auth;
  const id = loginUser.id;

  let userCountries = [""];

  // To get the countries if user has stored them
  if (userData[0] !== undefined) {
    userCountries = userData[0].map;
  }

  // Set image state
  const handleImageAsFile = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // to get the country info
  const getUserData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/user/${id}`);
      const jsonData = await response.json();
      setData(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  // Push up to the database, get image URL from storage
  const handleFireBaseUpload = e => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    document.getElementById("uploadText").innerHTML =
      "<b>Image uploaded Successfully!</b>";
    uploadTask.on(
      "state_changed",
      snapshot => {},
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            setUrl(url);
          });
      }
    );
  };

  const onSubmitForm = async e => {
    e.preventDefault();

    try {
      // Post blogpost
      const body = { title, description, id, image_url, country };

      await fetch("http://localhost:5000/blogposts", {
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
    <div className="wrapper mx-auto">
      <a
        href="/"
        className="badge-light "
        style={{ padding: "10px", margin: "10%", borderRadius: "3px" }}
      >
        Go Back
      </a>
      <h1 className="text-center mt-5">Write a new blogpost</h1>

      <div
        style={{
          display: "flex",

          alignItems: "center",
          flexDirection: "column"
        }}
      >
        <input type="file" onChange={handleImageAsFile}></input>

        <button className="btn btn-info" onClick={handleFireBaseUpload}>
          upload image
        </button>
        <div id="uploadText" className="mt-3 text-center">
          <b>
            Upload a image! <br />
            By first choose a file and then press <i>upload image</i>
          </b>
        </div>
        <form className="text-center mt-3 p-3" onSubmit={onSubmitForm}>
          <textarea
            style={{ width: "600px", height: "40px" }}
            type="text"
            className="form-control"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <br />
          <textarea
            style={{ width: "600px", height: "400px" }}
            type="text"
            className="form-control"
            value={description}
            placeholder="Write what you have on your mind..."
            onChange={e => setDescription(e.target.value)}
          />
          <p>Choose which country the post is related to</p>
          <select
            value={country}
            onChange={e => setCountry(e.target.value)}
            className=" bg-info text-white border-light"
            style={{ width: "300px", height: "40px", borderRadius: "5px" }}
          >
            {userCountries.map(country => (
              <option>
                {country ? countries[country].name : "No country selected"}
              </option>
            ))}
          </select>
          <button className="btn btn-secondary btn-lg btn-block mt-5">
            Submit post
          </button>
        </form>
      </div>
    </div>
  );
};

// get auth from reducers to access user ID
const mapStateToProps = state => ({
  auth: state.isLogged
});

export default connect(mapStateToProps, {})(InputBlogPost);
