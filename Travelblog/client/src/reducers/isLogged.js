// set state if user logged in
const initialState = {
  isLoggedIn: false,
  token: localStorage.getItem("token"),
  loginUser: null
};

const loggedReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_IN":
      localStorage.setItem("token", action.payload.token);
      return {
        // To store some parts in state but change others (e.g isLogged: true)
        ...state,
        loginUser: action.payload.loginUser,
        isLoggedIn: true
      };
    case "SIGN_OUT":
      localStorage.removeItem("token");
      return {
        ...state,
        isLoggedIn: false
      };
    default:
      return state;
  }
};

export default loggedReducer;
