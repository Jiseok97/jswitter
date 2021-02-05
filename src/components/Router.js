import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";

const AppRouter = ({ isLoggedIn }) => {
  return (
    <Router>
      <Switch>
        {isLoggedIn ? (
          // <>(fragment) = 많은 요소들을 render 하고 싶을 때 사용 (단, 부모 요소가 없을 때)
          // div, span 이런거 쓰기 싫을 때

          // 로그인 되었을 때
          <>
            <Route exact path="/">
              <Home />
            </Route>
          </>
        ) : (
          // 로그인 안되었을 때 Auth
          <Route exact path="/">
            <Auth />
          </Route>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
