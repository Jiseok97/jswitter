import React, { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  useEffect(() => {
    // user의 변화를 listen 하는 곳
    // onAuthStateChanged (= event listener)
    // -> 유저 상태가 변할 때, 그 변화를 알아차림
    // 유저가 로그아웃할 때 발생, 계정을 생성할 때 트리거, fireabse 초기화 할 때, 로그인 되는 순간도 앎
    authService.onAuthStateChanged((user) => {
      // 변화를 감지, 누군가 CreateAccount클릭, Log In, 이미 로그인 되어 있어서 fireabse는 스스로 초기화 하는 것
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []); // , [] => 처음 시작할 때, 컴포넌트가 mount 될 떄, 실행됨!!(hooks)
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initializing..."}
      <footer>&copy;{new Date().getFullYear} JSwitter </footer>
    </>
  );
}

export default App;
