import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [jsweet, setJSweet] = useState("");
  const [jsweets, setJSweets] = useState([]); // 배열로
  // component가 mount 될 때, getJSweets를 실행
  // getJSweets는 dbService를 불러와서 colletion("jsweets"), 그리고 get을 써서 다 가져옴
  const getJSweets = async () => {
    const dbJSweets = await dbService.collection("jsweets").get();

    // dbJSweets.forEach((document) => console.log(document.data())); // 내 state에 있는 각각의 document.data()를 console.log 함
    // setJSweets에 값이 아닌 함수를 넣음, 모든 이전 jsweets에 대해 배열을 리턴, 그 배열은 새로 작성한 트윗과 그 이전 것들
    // 함수를 전달 시, 리액트는 이전 값을 접근할 수 있게 해줌

    dbJSweets.forEach((document) => {
      const jsweetObject = {
        ...document.data(),
        // ... (= spread attribute 기능) && document.data()는 데이터를 가져와서 풀어내는 것
        // 즉, ...은 데이터의 내용물
        id: document.id,
      };
      setJSweets((prev) => [jsweetObject, ...prev]);
    });
  };
  useEffect(() => {
    getJSweets();
  }, []);
  const onSubmit = async (event) => {
    // async -> await가 promise로 리턴하니까 넣어줌
    event.preventDefault();
    await dbService.collection("jsweets").add({
      // dbService.collection.add를 쓰기 위해선 firestore import 해주기 !
      // firebaseStore에 jsweet가 collection으로 생성됨
      // "jsweets"는 collectionPath 경로
      // add 는 그냥 data가 들어가는 거
      // 위를 합치면, 명시된 데이터를 담은 새로운 document를 collections에 추가하는 거
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
      <div>
        {jsweets.map((jsweet) => (
          <div key={jsweet.id}>
            <h4>{jsweet.jsweet}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
