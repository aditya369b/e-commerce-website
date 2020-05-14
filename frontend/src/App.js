import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import SellerItems from './components/sellers/sellerItems';



function App({isLoggedIn}) {
  return (
    <div className="App">
      <Switch>   
        <Route path="/signUp" component={SignUp} />
        { isLoggedIn? (<Route path="/" component={Home} />) : (<Route path="/" component={SellerItems} />) }
        <Route path="/" component={Login} />
      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => {

  return {
    user: state.userReducer.user,
    isLoggedIn: state.userReducer.isLoggedIn,
  };
};

export default connect(mapStateToProps)(App);

// export default App;
