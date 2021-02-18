import { authService } from "fbase";
import React, { useState } from "react";

const inputSytle = {};

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  // 각 input마다 onChange 꼭 사용해야 값을 입력시 값을 받아 input에 들어감
  // event는 무슨일이 일어났는가? 뜻함
  // target: 변경이 일어난 부분
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  // preventDefault() 가 없으면 email, password를 입력하여 로그인 버튼을 누룰시,
  // 새로고침과 함께 값들이 사라짐
  const onSubmit = async (event) => {
    // 페이지 새로고침을 막기 위한 preventDefault()
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        // create account
        // createUserWithEmailAndPassword는 email, password를 받음
        // createUserWithEmailAndPassword는 계정을 만듬과 동시에 로그인 됨
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        // log in
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);
  return (
    <>
      <form onSubmit={onSubmit} className="container">
        {/* input의 value는 state에 저장됨 */}
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
          className="authInput"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
          className="authInput"
        />
        <input
          type="submit"
          value={newAccount ? "Create Account" : "Log In"}
          className="authInput authSubmit"
        />
        {error && <span className="authError">{error}</span>}
      </form>
      <span onClick={toggleAccount} className="authSwitch">
        {newAccount ? "Log In" : "Create Account"}
      </span>
    </>
  );
};

export default AuthForm;
