import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
      await storageService.refFromURL(jsweetObj.attachmentUrl).delete(); // url에서 reference 얻는 방법(refFromURL)
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
    <div className="jsweet">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container jsweetEdit">
            <input
              type="text"
              placeholder="Edit your jsweet"
              value={newJSweet}
              required
              autoFocus
              onChange={onChange}
              classname="formInput"
            />
            <input type="submit" value="Update JSweet" className="formBtn" />
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <>
          <h4>{jsweetObj.text}</h4>
          {jsweetObj.attachmentUrl && <img src={jsweetObj.attachmentUrl} />}
          {isOwner && (
            <div class="jsweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default JSweet;
