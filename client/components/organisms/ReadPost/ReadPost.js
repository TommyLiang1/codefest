import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import R from "ramda";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons/faExclamationTriangle";

import Box from "react-bulma-companion/lib/Box";
import Title from "react-bulma-companion/lib/Title";
import Field from "react-bulma-companion/lib/Field";
import Control from "react-bulma-companion/lib/Control";
import Label from "react-bulma-companion/lib/Label";
import Input from "react-bulma-companion/lib/Input";
import Icon from "react-bulma-companion/lib/Icon";
import Help from "react-bulma-companion/lib/Help";
import Button from "react-bulma-companion/lib/Button";
import { attemptGetUser, attemptUpdateUser } from "_thunks/user";

import { attemptUpdatePost } from "_thunks/posts";
import "../../../styles/home.scss";
import Post from "_molecules/Post";

export default function ReadPosts() {
  const dispatch = useDispatch();
  const { user } = useSelector(R.pick(["user"]));
  const { posts } = useSelector(R.pick(["posts"]));
  console.log(posts);
  return (
    <Box className="readposts">
      <div>{posts[0]}</div>
    </Box>
  );
}
