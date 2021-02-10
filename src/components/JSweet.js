import { dbService } from "fbase";
import React, { useState } from "react";

// isOwner => 내가 주인이면 이 버튼 fragment 들을 볼 수 있음
const JSweet = ({ jsweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false); // editing(수정) 모드인지 아닌지 구분
  const [newJSweet, setNewJSweet] = useState(jsweetObj.text); // input의 값(text) 수정 -> newJSweet을 수정하는 것
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this jsweet?");
    if (ok) {
      // delete jsweet
      // doc 경로는 firebase보면 됨 ( document -> collection -> jsweet의 아이디)
      await dbService.doc(`jsweets/${jsweetObj.id}`).delete();
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`jsweets/${jsweetObj.id}`).update({
      text: newJSweet,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewJSweet(value);
  };
  return (
    <div>
      <h4>{jsweetObj.text}</h4>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your jsweet"
              value={newJSweet}
              required
              onChange={onChange}
            />
            <input type="submit" value="Update JSweet" />
          </form>
          <button onClick={toggleEditing}>Cancle</button>
        </>
      ) : (
        <>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete JSweet</button>
              <button onClick={toggleEditing}>Edit JSweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default JSweet;
