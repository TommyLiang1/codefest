import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { Switch, Route } from "react-router";

import R from "ramda";

import Section from "react-bulma-companion/lib/Section";
import Container from "react-bulma-companion/lib/Container";
import ReadPosts from "_organisms/ReadPost";
import { attemptGetPosts } from "_thunks/posts";
import { attemptGetComments, attemptAddComment } from "_thunks/comments";
import useKeyPress from "_hooks/useKeyPress";

import "../../../styles/home.scss";

export default function ReadPost() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { user } = useSelector(R.pick(["user"]));
  const [text, setText] = useState("");

  useEffect(() => {
    if (R.isEmpty(user)) {
      dispatch(push("/login"));
    } else {
      dispatch(attemptGetPosts())
        .catch(R.identity)
        .then(() => setLoading(false));
    }
  }, []);
  //attemptAddComment(text)
  const handleAddComment = () => {
    if (text) {
      dispatch(attemptAddComment(text));
      setText("");
    }
  };

  useKeyPress("Enter", handleAddComment);

  const updateText = (e) => setText(e.target.value);

  return (
    !loading && (
      <div>
        <div id="lr">
          <ReadPosts />
        </div>
        <div className="post">
          <input
            className="textbox"
            value={text}
            placeholder="Add comment?"
            onChange={updateText}
          />
        </div>
        <button id="respond" onClick={handleAddComment}>
          Respond
        </button>
      </div>
    )
  );
}
