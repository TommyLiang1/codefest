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

import {
  attemptToggleCompletePost,
  attemptUpdatePost,
  attemptDeletePost,
} from "_thunks/posts";
import ConfirmModal from "_organisms/ConfirmModal";

const fromNow = (date) =>
  formatDistanceToNow(parseISO(date), { addSuffix: true });

export default function Post({
  id,
  user,
  text,
  tags,
  user_visibility,
  comm_visibility,
  exp_visibility,
  completed,
  created_at,
  updated_at,
  comments,
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
  const editPost = () => setEdit(true);

  const cancelEdit = () => {
    setEdit(false);
    setCurrentText(text);
  };

  const handleUpdatePost = () => {
    if (currentText) {
      dispatch(attemptUpdatePost(id, currentText)).then(() => setEdit(false));
    }
  };

  const toggleCompletePost = () => dispatch(attemptToggleCompletePost(id));

  const deletePost = () => dispatch(attemptDeletePost(id));

  return (
    <li className="todo box">
      <article className="media">
        <figure className="media-left">
          <span
            className="icon"
            onClick={toggleCompletePost}
            onKeyPress={toggleCompletePost}
          >
            {completed ? (
              <FontAwesomeIcon icon={faCheckSquare} size="lg" />
            ) : (
              <FontAwesomeIcon icon={faSquare} size="lg" />
            )}
          </span>
        </figure>
        <div className="media-content">
          <div className="content">
            <p>
              <small>{`created ${createdMessage}`}</small>
            </p>
            {edit ? (
              <textarea
                className="textarea"
                value={currentText}
                onChange={updateText}
              />
            ) : (
              <p>{text}</p>
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
                  onClick={handleUpdatePost}
                  onKeyPress={handleUpdatePost}
                >
                  <FontAwesomeIcon icon={faSave} size="lg" />
                </span>
              ) : (
                <span
                  className="icon space-right"
                  onClick={editPost}
                  onKeyPress={editPost}
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
                  <FontAwesomeIcon icon={faTrashAlt} size="lg" />
                </span>
              )}
            </div>
          </nav>
        </div>
      </article>
    </li>
  );
}

Post.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  user_visibility: PropTypes.bool,
  comm_visibility: PropTypes.bool,
  exp_visibility: PropTypes.bool,
  completed: PropTypes.bool.isRequired,
  created_at: PropTypes.string.isRequired,
  updated_at: PropTypes.string,
  comments: PropTypes.array.isRequired,
};

Post.defaultProps = {
  updated_at: null,
};
