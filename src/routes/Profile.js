import { authService } from "fbase";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default ({ refreshUser, userObj }) => {
  // useHistory() -> history 상수를 만들어 push 함
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const onLogOutClick = () => {
    authService.signOut();
    // authService.currentUser.uid -> userObj를 소스 공유 없이 할 경우 uid 가져오는 방법
    history.push("/");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="Display name"
          value={newDisplayName}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

//     // query 문
// const getMyJSweets = async () => {
//   const jsweets = await dbService
//     .collection("jsweets")
//     .where("creatorId", "==", userObj.uid) // where() => 필터링 방법
//     .orderBy("createdAt") // orderBy() => 결과를 어떠한 순서에 따라 필터링
//     .get();
//   console.log(jsweets.docs.map((doc) => doc.data()));
// };
// useEffect(() => {
//   getMyJSweets();
// }, []);
