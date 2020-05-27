// set state if user logged in
const initialState = {
  isLoggedIn: false,
  token: localStorage.getItem("token"),
  loginUser: null
};

const loggedReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_IN":
      console.log(action.payload.loginUser);
      localStorage.setItem("token", action.payload.token);
      return {
        ...state, //För att bevara vissa delar i state men ändra andra delar (ex isLogged: true)
        loginUser: action.payload.loginUser,
        isLoggedIn: true //Keep the state but modify the selected state (LoggedIn)
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
