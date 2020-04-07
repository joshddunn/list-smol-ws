import React, { Component } from 'react';
import {
  Button,
  Input,
  Modal,
  Header,
  Icon
} from 'semantic-ui-react';

class NewListModal extends Component {

  render() {
    return (
      <Modal basic open={this.props.open} size='small'>
        <Header icon='plus' content='New List' />
        <Modal.Content>
          <p>
            Provide a list name then click Add.
          </p>
          <Input
            className="List-input List-modal-input"
            placeholder="List name"
            value={this.props.name}
            onChange={this.props.onChange}
          />
          <div className="List-Modal-error">
            {this.props.error}
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' inverted onClick={this.props.onClickCancel}>
            <Icon name='remove' /> Cancel
          </Button>
          <Button color='green' inverted onClick={this.props.onClickConfirm}>
            <Icon name='checkmark' /> Add
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default NewListModal;
