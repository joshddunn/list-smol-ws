import React, { Component } from 'react';
import {
  Button,
  Modal,
  Header,
  Icon,
  Checkbox,
} from 'semantic-ui-react';

class SettingsModal extends Component {

  render() {
    return (
      <Modal basic open={this.props.open} size='small'>
        <Header icon='setting' content='Settings' />
        <Modal.Content>
          <p>
            Settings will apply across all lists.
          </p>
          <Checkbox
            className="List-settings-label"
            toggle
            label="Sort alphabetically"
            checked={this.props.sortAlphabeticallyValue}
            onChange={this.props.onChangeSortAlphabetically}
          />
          <Checkbox
            className="List-settings-label"
            toggle
            label="Put checked items at bottom of list"
            checked={this.props.buryCheckedItemsValue}
            onChange={this.props.onChangeBuryCheckedItems}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' inverted onClick={this.props.onClickClose}>
            <Icon name='checkmark' /> Close
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default SettingsModal;
