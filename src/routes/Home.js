import JSweet from "components/JSweet";
import { dbService, storageService } from "fbase";
import React, { useEffect, useState } from "react";
import JSweetFactory from "components/JSweetFactory";

const Home = ({ userObj }) => {
  const [jsweets, setJSweets] = useState([]); // 배열로
  // component가 mount 될 때, getJSweets를 실행
  // getJSweets는 dbService를 불러와서 colletion("jsweets"), 그리고 get을 써서 다 가져옴

  useEffect(() => {
    dbService.collection("jsweets").onSnapshot((snapshot) => {
      // onSnapshot (= listener) : DB의 변화를 실시간으로 알려줌(realtime)
      // doc가 우리가 가지고 있는 jsweets 배열(게시물)
      const jsweetArray = snapshot.docs.map((doc) => ({
        // 새로운 snapshot을 배열을 만들어 state에 배열을 집어 넣음
        // 모든 아이템은 아래 형태로 받음
        id: doc.id,
        ...doc.data(),
      }));
      setJSweets(jsweetArray);
    });
  }, []);

  // submit 할 때마다 document를 생성
  return (
    <div className="container">
      <JSweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {jsweets.map((jsweet) => (
          <JSweet
            key={jsweet.id}
            jsweetObj={jsweet} // jsweetObj는 jweet의 모든 데이터 (author, text, createdAt)
            isOwner={jsweet.creatorId === userObj.uid}
          /> // isOwner는 true || false 값 가짐, 글쓴이(만든사람 === 만든 사람 ID)만 볼 수 있게 하기 위함
        ))}
      </div>
    </div>
  );
};
export default Home;
