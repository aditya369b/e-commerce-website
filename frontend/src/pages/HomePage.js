import React from "react";
import Modal from 'react-modal';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import md5 from "md5";
import axios from "axios";
import {
    setUsername,
    setPassword,
    setIsError,
    setIsLoggedIn,
    LogOutUser,
} from "../redux/actions/userActions";
import Cookies from 'universal-cookie';
import { buyItem } from "../redux/actions/itemsActions";
const cookies = new Cookies();


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

const HomePage = ({ username, password, isLoggedIn, isError, items, messages, ws, dispatch }) => {

    Modal.setAppElement('#root');
    React.useEffect(() => {
        let cookie_uname = cookies.get('username', { path: '/' });
        let cookie_isLoggedIn = cookies.get('loggedin', { path: '/' });
        console.log("cookie_uname " + cookie_uname)
        console.log("cookie_loggedin " + cookie_isLoggedIn)
        if (cookie_isLoggedIn != null && cookie_isLoggedIn === 'true') {
            console.log("User-Logged-In")
            dispatch(setUsername(cookie_uname))
            dispatch(setIsLoggedIn(cookie_isLoggedIn))
        }
    }, [dispatch]);


    const [showPurchaseHistory, setShowPurchaseHistory] = React.useState(false);
    const [createNewUser, setCreateNewUser] = React.useState(false);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModal() {
        if (isLoggedIn) {
            dispatch(LogOutUser())
        }
        else {
            setIsOpen(true)
        }
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
    }

    function closeModal() {
        setIsOpen(false);
    }


    const LoginUser = () => {

        console.log(password)
        console.log(username)
        const body = {

            "userId": username,
            "password": md5(password)
        };
        console.log("Making a Call to Server")
        dispatch(setIsError(false))
        axios
            .post("/api/auth/authenticate", body)
            .then((res) => {
                if (res.data) {
                    cookies.set('username', username, { path: '/' });
                    cookies.set('loggedin', 'true', { path: '/' });
                    dispatch(setIsError(false));
                    dispatch(setIsLoggedIn(true));
                    closeModal();
                } else {

                    dispatch(setIsLoggedIn(false));
                    dispatch(setIsError(true))
                    console.log("Invalid user credentials");
                }
                console.log(res);
            })
            .catch(console.log());
    };


    if (createNewUser) return <Redirect to="/signup/" />;
    else if (showPurchaseHistory) return <Redirect to="/purchase-history/" />;

    else
        return (
            <div className="HomePage">
                <div>
                    <h2> Welcome to Shoppers Paradise {username}</h2>
                    <Modal
                        isOpen={modalIsOpen}
                        onAfterOpen={afterOpenModal}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="login-modal-form">
                        <button onClick={closeModal}>close</button>
                        <div>
                            {isError && <h4> Check Credentials Again </h4>}
                            <form>
                                <div>
                                    <h1>Mocha Coders Login </h1>
                                    <p>Username</p>
                                    <input
                                        name="username"
                                        type="text"
                                        onChange={(e) => dispatch(setUsername(e.target.value))}
                                    ></input>
                                </div>
                                <div>
                                    <p>Password</p>
                                    <input
                                        name="password"
                                        type="password"
                                        onChange={(e) => dispatch(setPassword(e.target.value))}>
                                    </input>
                                </div>
                                <button onClick={() => LoginUser()} type="button"> Login </button>
                                <button type="button" onClick={() => setCreateNewUser(true)}> Create Profile </button>
                            </form>
                        </div>
                    </Modal>
                </div>
                <div>
                    <button onClick={() => setShowPurchaseHistory(true)}> Purchase History </button>
                    <button onClick={openModal}> {isLoggedIn ? "Logout" : "Login"} </button>
                </div>
                <div>
                    <marquee behavior="scroll" direction="left">{messages.slice(messages.length- 10)}</marquee>
                </div>
                <div>
                    <ol>
                        {items.map((item, i) => (
                            <li key={i} id={item.id}>
                                {item.itemName}
                                {item.itemCost}
                                {item.itemCount}
                                {item.viewCount}
                                {"     "}{item.itemViewCount}
                                <button id={item.id} onClick={() => dispatch(buyItem(item.id, items, ws))}> Buy Item Now</button>
                            </li>))}
                    </ol >
                </div>
            </div>
        );
}

const mapStateToProps = (state) => {

    return {
        username: state.userReducer.username,
        password: state.userReducer.password,
        isLoggedIn: state.userReducer.isLoggedIn,
        isError: state.userReducer.isError,
        items: state.itemsReducer.items,
        messages: state.homePageReducer.messages,
    };
};

export default connect(mapStateToProps)(HomePage);

