import React, { Component } from 'react';
import {
  Button,
  Modal,
  Header,
  Icon
} from 'semantic-ui-react';

class DeleteListModal extends Component {

  render() {
    return (
      <Modal basic open={this.props.open} size='small'>
        <Header icon='delete' content='Delete List' />
        <Modal.Content>
          <p>
            Deleting this list will remove all associated list items. Do you want to proceed?
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' inverted onClick={this.props.onClickCancel}>
            <Icon name='remove' /> No
          </Button>
          <Button color='green' inverted onClick={this.props.onClickConfirm}>
            <Icon name='checkmark' /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default DeleteListModal;
