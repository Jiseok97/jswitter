import React from "react";

// isOwner => 내가 주인이면 이 버튼 fragment 들을 볼 수 있음
const JSweet = ({ jsweetObj, isOwner }) => (
  <div>
    <h4>{jsweetObj.text}</h4>
    {isOwner && (
      <>
        <button>Delete JSweet</button>
        <button>Edit JSweet</button>
      </>
    )}
  </div>
);

export default JSweet;
