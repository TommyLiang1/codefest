import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { Switch, Route } from "react-router";

import R from "ramda";

import Section from "react-bulma-companion/lib/Section";
import Container from "react-bulma-companion/lib/Container";
import ReadPosts from "_organisms/ReadPost";
import { attemptGetPosts } from "_thunks/posts";

import "../../../styles/home.scss";

export default function ReadPost() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { user } = useSelector(R.pick(["user"]));

  useEffect(() => {
    if (R.isEmpty(user)) {
      dispatch(push("/login"));
    } else {
      dispatch(attemptGetPosts())
        .catch(R.identity)
        .then(() => setLoading(false));
    }
  }, []);

  return (
    !loading && (
      <div>
        <div id="lr">
          <ReadPosts />
        </div>
        <button id="respond">Respond</button>
      </div>
    )
  );
}
