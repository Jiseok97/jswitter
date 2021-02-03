import React, { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 각 input마다 onChange 꼭 사용해야 값을 입력시 값을 받아 input에 들어감
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
  const onSubmit = (event) => {
    // 페이지 새로고침을 막기 위한 preventDefault()
    // preventDefault() -> 이벤트를 취소할 수 있는 경우, 이벤트의 전파를 막지 않고 그 이벤트를 취소함
    event.preventDefault();
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
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
