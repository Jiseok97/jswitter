import React, { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
  const onSubmit = (event) => {
    // 페이지 새로고침을 막기 위한 preventDefault()
    event.preventDefault();
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        {/* input의 value는 state에 저장됨 */}
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input type="submit" value="Log In" />
      </form>
      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
  );
};
export default Auth;
