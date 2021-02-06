import { dbService } from "fbase";
import React, { useState } from "react";

const Home = () => {
  const [jsweet, setJSweet] = useState("");
  const onSubmit = async (event) => {
    // async -> await가 promise로 리턴하니까 넣어줌
    event.preventDefault();
    await dbService.collection("jsweets").add({
      // firebaseStore에 jsweet가 collection으로 생성됨
      jsweet, //우리의 document의 key
      createdAt: Date.now(),
    });
    setJSweet(""); // submit 하고 나면, setJSweet() 해주기
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event; // event 안에 있는 target 안에 있는 value를 가져옴
    setJSweet(value);
  };

  // submit 할 때마다 document를 생성
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={jsweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="JSweet" />
      </form>
    </div>
  );
};
export default Home;
