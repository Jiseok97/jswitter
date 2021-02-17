import { dbService, storageService } from "fbase";
import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";

const JSweetFactory = ({ userObj }) => {
  const [jsweet, setJSweet] = useState(""); // form을 위한 state
  const [attachment, setAttachment] = useState("");
  // jsweets 가져오는 방법(게시물)
  // (1) Array를 통해 onSnapshot으로 setJSweets하는 방법 (현 방식,(realtime))
  // (2) forEach를 쓰는 방법 ( 구방식, query 이용하는 듯 )
  const onSubmit = async (event) => {
    // async -> await가 promise로 리턴하니까 넣어줌
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const jsweetObj = {
      text: jsweet, //우리의 document의 key
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await dbService.collection("jsweets").add(jsweetObj);
    // dbService.collection.add를 쓰기 위해선 firestore import 해주기 !
    // firebaseStore에 jsweet가 collection으로 생성됨
    // "jsweets"는 collectionPath 경로
    // add 는 그냥 data가 들어가는 거
    // 위를 합치면, 명시된 데이터를 담은 새로운 document를 collections에 추가하는 거

    setJSweet(""); // submit 하고 나면, setJSweet() 해주기
    setAttachment("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event; // event 안에 있는 target 안에 있는 value를 가져옴
    setJSweet(value);
  };
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event; // event 안에서 target 안으로 가서 파일을 받아 오는 것 의미
    const theFile = files[0]; // 1) 파일을 갖고
    const reader = new FileReader(); // 2) reader을 만들고
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile); // 3) readAsDataURL 을 사용해서 파일을 읽기
  };
  const onClearAttachment = () => setAttachment(null);
  return (
    <form onSubmit={onSubmit}>
      <input
        value={jsweet}
        onChange={onChange}
        type="text"
        placeholder="What's on your mind?"
        maxLength={120}
      />
      <input type="file" accept="image/*" onChange={onFileChange} />
      <input type="submit" value="JSweet" />
      {attachment && (
        <div>
          <img src={attachment} width="80px" height="80px" />
          <button onClick={onClearAttachment}>Clear</button>
        </div>
      )}
    </form>
  );
};

export default JSweetFactory;
