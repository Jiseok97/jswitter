import { authService, dbService } from "fbase";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

export default ({ userObj }) => {
  // useHistory() -> history 상수를 만들어 push 함
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  const getMyJSweets = async () => {
    const jsweets = await dbService
      .collection("jsweets")
      // query 문
      .where("creatorId", "==", userObj.uid) // where() => 필터링 방법
      .orderBy("createdAt") // orderBy() => 결과를 어떠한 순서에 따라 필터링
      .get();
    console.log(jsweets.docs.map((doc) => doc.data()));
  };
  useEffect(() => {
    getMyJSweets();
  }, []);
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};
