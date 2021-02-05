import React, { useState } from "react";

const Home = () => {
  const [jsweet, setJSweet] = useState("");
  const onSubmit = (event) => {
    event.preventDefault();
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
  };
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
    </div>
  );
};
export default Home;
