import React from "react";
import PropTypes from "prop-types";

import Modal from "react-bulma-companion/lib/Modal";

import ConfirmDeletePost from "_organisms/ConfirmDeletePost";

export default function ConfirmModal({ confirm, closeModal, deletePost }) {
  return (
    <Modal className="confirm-modal" active={confirm}>
      <Modal.Background />
      <Modal.Content>
        <ConfirmDeletePost closeModal={closeModal} deletePost={deletePost} />
      </Modal.Content>
      <Modal.Close size="large" aria-label="close" onClick={closeModal} />
    </Modal>
  );
}

ConfirmModal.propTypes = {
  confirm: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};
