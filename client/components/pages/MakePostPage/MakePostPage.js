import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import R from "ramda";

import Section from "react-bulma-companion/lib/Section";
import Container from "react-bulma-companion/lib/Container";
import { attemptAddPost } from "../../../store/thunks/posts";
import useKeyPress from "_hooks/useKeyPress";

import "../../../styles/home.scss";

export default function MakePost() {
  const dispatch = useDispatch();

  const [text, setText] = useState("");
  const { user } = useSelector(R.pick(["user"]));

  const handleAddPost = () => {
    if (text) {
      dispatch(attemptAddPost(text));
      setText("");
    }
  };

  useKeyPress("Enter", handleAddPost);

  const updateText = (e) => setText(e.target.value);

  return (
    <div>
      <div id="question">Hi {user.usernameCase}, what are you thinking?</div>
      <div id="lr">
        <div id="post">
          <input value={text} onChange={updateText} />
        </div>
      </div>
      <button id="respond" onClick={handleAddPost}>
        Add Post
      </button>
    </div>
  );
}
