import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Cookies from 'universal-cookie';
import md5 from "md5";
import {
  setAddress,
  setEmailAddress,
  setUsername,
  setPassword,
  setIsError,
  setIsLoggedIn,
} from "../redux/actions/userActions";
import {Button} from "react-bootstrap";
import "../stylesheets/SignUp.css"

const cookies = new Cookies();

const Signup = ({ username, password, address, email_address, isNewUser, isError, dispatch }) => {

  const [showHomePage, setToHomePage] = React.useState(false);


  const SignupUser = () => (dispatch, getState) => {

    console.log(getState().userReducer.password)
    console.log(getState().userReducer.username)
    dispatch(setIsError(false))
    cookies.remove('username');
    cookies.remove('loggedin');
    const body = {

      "username": username,
      "password": md5(password),
      "contact-address": address,
      "email-address": email_address,

    };
    console.log("Creating user-profile")
    axios
      .post("/api/auth/create", body)
      .then((res) => {
        if (res.data) {
          cookies.set('username', username, { path: '/' });
          cookies.set('loggedin', 'true', { path: '/' });
          console.log("User-Credentials Authenticated");

          dispatch(setIsLoggedIn(true))
          dispatch(setIsError(false));
          setToHomePage(true)
        } else {
          dispatch(setIsLoggedIn(false))
          dispatch(setIsError(true));
          console.log("Invalid user credentials");
        }
        console.log(res);
      })
      .catch(console.log());
  };
  if (showHomePage) {
    return <Redirect to="/" />;
  }
  else

    return (
      <div>
        {isError && <h4> Use a different Username </h4>}
        <div class="signupComponent">
          <Button variant="outline-primary" onClick={() => { setToHomePage(true) }}>Back</Button>
          <form>
            <h1>Sign Up</h1>
            <div class="field">
              <p>Username</p>
              <input
                name="username"
                type="text"
                onChange={(e) => dispatch(setUsername(e.target.value))}
              ></input>
            </div>
            <div class="field">
              <p>Password</p>
              <input
                name="password"
                type="password"
                onChange={(e) => dispatch(setPassword(e.target.value))}
              ></input>
            </div>
            <div class="field">
              <p>Contact Address</p>
              <input
                name="address"
                type="text"
                onChange={(e) => dispatch(setAddress(e.target.value))}
              ></input>
            </div>
            <div class="field">
              <p>Contact Email</p>
              <input
                name="email"
                type="email"
                onChange={(e) => dispatch(setEmailAddress(e.target.value))}
              ></input>
            </div>

            <Button class="signupbtn" variant="outline-success" onClick={() => SignupUser}>
              {" "}
          Signup{" "}
            </Button>
          </form>
        </div>
      </div>
    );
};

const mapStateToProps = (state) => ({
  username: state.userReducer.username,
  password: state.userReducer.password,
  address: state.userReducer.address,
  email_address: state.userReducer.email_address,
  isNewUser: state.userReducer.isNewUser,
  isError: state.userReducer.isError,
});
export default connect(mapStateToProps)(Signup);