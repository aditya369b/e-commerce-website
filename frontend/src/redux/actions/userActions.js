import md5 from "md5";
import axios from "axios";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const setUsername = username => ({
    type: 'SET_USERNAME',
    username
})
export const setIsLoggedIn = (isLoggedIn) => ({
    type: 'SET_IS_LOGGED_IN',
    isLoggedIn
})
export const setPassword = (password) => ({
    type: 'SET_PASSWORD',
    password
})
export const setActiveUsers = (activeUsers) => ({
    type: 'SET_ACTIVE_USERS',
    activeUsers
})
export const setIsNewUser = (isNewUser) => ({
    type: 'CHECK_NEW_USER',
    isNewUser
})

export const setIsError = (isError) => ({
    type: 'SET_ERROR',
    isError
})

export const SignupUser = () => (dispatch, getState) => {

    console.log(getState().userReducer.password)
    console.log(getState().userReducer.username)
    dispatch(setIsError(false))
    cookies.remove('username');
    cookies.remove('loggedin');


    const body = {

        "username": getState().userReducer.username,
        "password": md5(getState().userReducer.password),
    };
    console.log("Creating user-profile")
    axios
        .post("/api/auth/create", body)
        .then((res) => {
            if (res.data) {
                cookies.set('username', getState().userReducer.username, { path: '/' });
                cookies.set('loggedin', 'true', { path: '/' });
                console.log("User-Credentials Authenticated");

                dispatch(setIsLoggedIn(true))
                dispatch(setIsError(false));
                dispatch(setIsNewUser(false))
            } else {
                dispatch(setIsNewUser(true));
                dispatch(setIsLoggedIn(false))
                dispatch(setIsError(true));
                console.log("Invalid user credentials");
            }
            console.log(res);
        })
        .catch(console.log());
};

export const LogOutUser = () => (dispatch, getState) => {
    console.log("clearing-cookies");
    cookies.remove('username', { path: '/' });
    cookies.remove("loggedin", { path: '/' });
    dispatch(setUsername(""))
    dispatch(setIsLoggedIn(false));
};
