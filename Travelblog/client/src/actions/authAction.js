const logIn = body => async dispatch => {
  try {
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    dispatch({
      type: "SIGN_IN",
      payload: data
    });
  } catch (err) {
    console.log(err);
  }
};

const logOut = () => {
  return {
    type: "SIGN_OUT"
  };
};

export { logIn, logOut };
