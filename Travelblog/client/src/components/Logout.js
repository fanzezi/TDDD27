import { logOut } from "../actions/authAction";
import React, {Fragment} from "react";
import { connect } from "react-redux";



function Logout(props){

    function test(){
        return props.logOut();
    }

    return(
    <Fragment>
        <button onClick = {test}>
          Logout
        </button>
    </Fragment>
       
    );

}

const mapStateToProps = state => ({
    isLogged: state.isLogged
  });

  export default connect(mapStateToProps, { logOut })(Logout);
