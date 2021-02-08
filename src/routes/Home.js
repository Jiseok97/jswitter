import JSweet from "components/JSweet";
import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
  const [jsweet, setJSweet] = useState("");
  const [jsweets, setJSweets] = useState([]); // 배열로
  // component가 mount 될 때, getJSweets를 실행
  // getJSweets는 dbService를 불러와서 colletion("jsweets"), 그리고 get을 써서 다 가져옴
  useEffect(() => {
    dbService.collection("jsweets").onSnapshot((snapshot) => {
      // onSnapshot (= listener) : DB의 변화를 실시간으로 알려줌(realtime)
      // doc가 우리가 가지고 있는 jsweets 배열(게시물)
      const jsweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setJSweets(jsweetArray);
    });
  }, []);

  // jsweets 가져오는 방법(게시물)
  // (1) Array를 통해 onSnapshot으로 setJSweets하는 방법 (현 방식,(realtime))
  // (2) forEach를 쓰는 방법 ( 구방식, query 이용하는 듯 )

  const onSubmit = async (event) => {
    // async -> await가 promise로 리턴하니까 넣어줌
    event.preventDefault();
    await dbService.collection("jsweets").add({
      // dbService.collection.add를 쓰기 위해선 firestore import 해주기 !
      // firebaseStore에 jsweet가 collection으로 생성됨
      // "jsweets"는 collectionPath 경로
      // add 는 그냥 data가 들어가는 거
      // 위를 합치면, 명시된 데이터를 담은 새로운 document를 collections에 추가하는 거
      text: jsweet, //우리의 document의 key
      createdAt: Date.now(),
      creatorId: userObj.uid,
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
          <JSweet
            key={jsweet.id}
            jsweetObj={jsweet}
            isOwner={jsweet.creatorId === userObj.uid}
          /> // isOwner는 true || false 값 가짐, 글쓴이만 볼 수 있게 하기 위함
        ))}
      </div>
    </div>
  );
};
export default Home;
