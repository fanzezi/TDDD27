const logIn = body => async dispatch => {
  try {
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    console.log(data);

    //console.log(await response);
    dispatch({
      type: "SIGN_IN",
      payload: data
    });
  } catch (err) {
    console.log(err);
    // TODO: something
  }
};

const logOut = () => {
  return {
    type: "SIGN_OUT"
  };
};

export { logIn, logOut };

/*
export function logIn(){
    return function dispatchLogin(dispatch){
        console.log("MUle")
        dispatch({
            type: 'SIGN_IN',
            payload: "response"
        })

    }  /*  
        const body = {
          "email": email,
          "password": password
        };*/
/*
        const response = await fetch("http://localhost:5000/login", {
          method: "POST",
          headers:{"Content-Type": "application/json"},
          body: JSON.stringify(body)
        });
        console.log("login.js working");
        
        
        dispatch({
            type: 'SIGN_IN',
            payload: "response"
        })
      
}; */
