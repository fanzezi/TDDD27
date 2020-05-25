const logIn = () => {
    return{
        type: 'SIGN_IN'

    }

}
const logOut = () => {
    return {
        type: 'SIGN_OUT'
    }
}


export{logIn, logOut} 

/*
export function logIn(){
    return function dispatchLogin(dispatch){
        console.log("MUle")
        dispatch({
            type: 'SIGN_IN',
            payload: "response"
        })

    }  /*  
    console.log("yoooo");

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
