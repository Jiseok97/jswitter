import React, { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

// App.js 는 onAuthStateChanged state 변화를 다룸
// onAuthStateChanged => 로그인 || 로그아웃 || 어플리케이션 초기화 될 때 발생

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    // user의 변화를 listen 하는 곳
    // onAuthStateChanged (= event listener)
    // -> 유저 상태가 변할 때, 그 변화를 알아차림
    // 유저가 로그아웃할 때 발생, 계정을 생성할 때 트리거, fireabse 초기화 할 때, 로그인 되는 순간도 앎
    authService.onAuthStateChanged((user) => {
      // 변화를 감지, 누군가 CreateAccount클릭, Log In, 이미 로그인 되어 있어서 fireabse는 스스로 초기화 하는 것
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      }
      setInit(true); // 언제 시작해도 onAuthStateChanged 실행을 위함
    });
  }, []); // , [] => 처음 시작할 때, 컴포넌트가 mount 될 떄, 실행됨!!(hooks)
  const refreshUser = () => {
    // updqteProfile을 사용하면 firebase 쪽에 있는 user를 새로고침 해주는데
    // 우리 header(navigation)은 firebase에 연결 되어 있지 않음
    // navigation은 userObj에 연결되어 있음
    // 우리가 해야할 일: firebase의 정보를 가지고 react.js를 업데이트 해줘야 함 -> 그게 refreshUser
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };

  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        /> // userObj가 존재할 때 로그인(isLoggedIn)
      ) : (
        "Initializing..."
      )}
      <footer>&copy; {new Date().getFullYear} JSwitter </footer>
    </>
  );
}

export default App;
