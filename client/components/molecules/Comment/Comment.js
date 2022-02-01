import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { parseISO, formatDistanceToNow } from "date-fns";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons/faTrashAlt";
import { faBan } from "@fortawesome/free-solid-svg-icons/faBan";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons/faPencilAlt";
import { faSave } from "@fortawesome/free-solid-svg-icons/faSave";
import { faSquare } from "@fortawesome/free-regular-svg-icons/faSquare";
import { faCheckSquare } from "@fortawesome/free-regular-svg-icons/faCheckSquare";
import "../../../styles/home.scss";

import {
  attemptToggleCompleteComment,
  attemptUpdateComment,
} from "_thunks/comments";

import ConfirmModal from "_organisms/ConfirmModal";

const fromNow = (date) =>
  formatDistanceToNow(parseISO(date), { addSuffix: true });

export default function Comment({
  id,
  user,
  post,
  text,
  completed,
  created_at,
  updated_at,
}) {
  const dispatch = useDispatch();

  const [currentText, setCurrentText] = useState(text);
  const [edit, setEdit] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [updatedMessage, setUpdatedMessage] = useState("");
  const [createdMessage, setCreatedMessage] = useState("");

  const updateMessages = () => {
    // setUpdatedMessage(updated_at ? fromNow(updated_at) : "");
    // setCreatedMessage(fromNow(created_at));
  };

  useEffect(() => {
    updateMessages();
    const interval = window.setInterval(updateMessages, 1000);

    return () => clearInterval(interval);
  }, [updated_at]);

  const openModal = () => setConfirm(true);
  const closeModal = () => setConfirm(false);
  const updateText = (e) => setCurrentText(e.target.value);
  const editComment = () => setEdit(true);

  const cancelEdit = () => {
    setEdit(false);
    setCurrentText(text);
  };

  const handleUpdateComment = () => {
    if (currentText) {
      dispatch(attemptUpdateComment(id, currentText)).then(() => setEdit(false));
    }
  };

  const toggleCompleteComment = () => dispatch(attemptToggleCompleteComment(id));

  return (
    <li className="todo box">
      <article className="media">
        <div className="media-content">
          <div className="content">
            <p className="saved-text">
              <small>{`${createdMessage} `}</small>
            </p>
            {edit ? (
              <textarea
                className="textarea"
                value={currentText}
                onChange={updateText}
              />
            ) : (
              <p className="saved-text"> {text}</p>
            )}
          </div>

          <nav className="level is-mobile">
            <div className="level-left">
              {!!updated_at && <small>{`edited ${updatedMessage}`}</small>}
            </div>
            <div className="level-right">
              {edit ? (
                <span
                  className="icon space-right"
                  onClick={handleUpdateComment}
                  onKeyPress={handleUpdateComment}
                >
                  <FontAwesomeIcon icon={faSave} size="lg" />
                </span>
              ) : (
                <span
                  className="icon space-right"
                  onClick={editComment}
                  onKeyPress={editComment}
                >
                  <FontAwesomeIcon icon={faPencilAlt} size="lg" />
                </span>
              )}
              {edit ? (
                <span
                  className="icon"
                  onClick={cancelEdit}
                  onKeyPress={cancelEdit}
                >
                  <FontAwesomeIcon icon={faBan} size="lg" />
                </span>
              ) : (
                <span
                  className="icon"
                  onClick={openModal}
                  onKeyPress={cancelEdit}
                >
                </span>
              )}
            </div>
          </nav>
        </div>
      </article>
    </li>
  );
}

Comment.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  post: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  created_at: PropTypes.string,
  updated_at: PropTypes.string,
};

Comment.defaultProps = {
  updated_at: null,
};
