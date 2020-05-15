// set state if user logged in
const initialState = {
    isLoggedIn: false,
    token: null
  };
  
  const loggedReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SIGN_IN":
        return {
          ...state, //För att bevara vissa delar i state men ändra andra delar (ex isLogged: true)
          isLoggedIn: true //Keep the state but modify the selected state (LoggedIn)
          //token: action.payload
        };
      case "SIGN_OUT":
        return {
          ...state,
          isLoggedIn: false
        };
      default:
        return state;
    }
  };
  
  export default loggedReducer;
  