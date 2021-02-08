import { dbService } from "fbase";
import React from "react";

// isOwner => 내가 주인이면 이 버튼 fragment 들을 볼 수 있음
const JSweet = ({ jsweetObj, isOwner }) => {
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this jsweet?");
    console.log(ok);
    if (ok) {
      // delete jsweet
      await dbService.doc(`jsweets/${jsweetObj.id}`).delete();
    }
  };
  return (
    <div>
      <h4>{jsweetObj.text}</h4>
      {isOwner && (
        <>
          <button onClick={onDeleteClick}>Delete JSweet</button>
          <button>Edit JSweet</button>
        </>
      )}
    </div>
  );
};

export default JSweet;
