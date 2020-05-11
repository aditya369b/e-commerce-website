import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import SellingItems from './pages/SellingItems';
import ItemDescription from './pages/ItemDescription';
// import './pages/css_files/SellingItems.css';


function App({isLoggedIn}) {
  return (
    <div>
      <Switch>   
        <Route path="/signUp" component={SignUp} />
        <Route path="/itemDescription" component={ItemDescription} />
        <Route path="/sellingitem" component={SellingItems} />
        {/* { isLoggedIn? (<Route path="/" component={Home} />) : (<Route path="/" component={SellingItems} />) } */}
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
