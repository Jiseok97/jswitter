import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";

const AppRouter = ({ isLoggedIn }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <Switch>
        {isLoggedIn ? (
          // <>(fragment) = 많은 요소들을 render 하고 싶을 때 사용 (단, 부모 요소가 없을 때)
          // div, span 이런거 쓰기 싫을 때

          // 로그인 되었을 때
          <>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            {/* <Redirect from="*" to="/" /> 
            단, import Redirect 할 것.
            여기서도 가능하나 Profile.js에서 프로그램상으로 
            Home 페이지로 이동하는 function 추가함*/}
          </>
        ) : (
          // 로그인 안되었을 때 Auth
          <>
            <Route exact path="/">
              <Auth />
            </Route>
            {/* <Redirect from="*" to="/" /> 
            여기서도 가능하나 Profile.js에서 프로그램상으로 
            Home 페이지로 이동하는 function 추가함*/}
          </>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
