import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import R from "ramda";

import Section from "react-bulma-companion/lib/Section";
import Container from "react-bulma-companion/lib/Container";

import "../../../styles/home.scss";

export default function MakePost() {
  const dispatch = useDispatch();
  const { user } = useSelector(R.pick(["user"]));

  return (
    <div>
      Hello World
      {/* <input type = "text" placeholder="What's on your mind?"></input> */}
      <div id="question">Hi {user.usernameCase}, what are you thinking?</div>
      <div id="lr">
        <div id="post">
          Hello World!
          {/* {this.state.loading ? <div>loading...</div> : <div>person...</div>} */}
        </div>
      </div>
      <button id="respond">Submit Post</button>
    </div>
  );
}
