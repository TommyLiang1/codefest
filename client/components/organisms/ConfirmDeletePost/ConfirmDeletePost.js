import React from "react";
import PropTypes from "prop-types";

import Card from "react-bulma-companion/lib/Card";
import Content from "react-bulma-companion/lib/Content";

export default function ConfirmDeletePost({ closeModal, deletePost }) {
  return (
    <Card>
      <Card.Content>
        <Content className="has-text-centered">
          Are you sure you wanted to delete this item?
        </Content>
      </Card.Content>
      <Card.Footer>
        <Card.FooterItem onClick={closeModal} onKeyPress={closeModal}>
          Cancel
        </Card.FooterItem>
        <Card.FooterItem onClick={deletePost} onKeyPress={deletePost}>
          Delete
        </Card.FooterItem>
      </Card.Footer>
    </Card>
  );
}

ConfirmDeletePost.propTypes = {
  closeModal: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};
