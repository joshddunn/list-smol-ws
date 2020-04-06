import React, { Component } from 'react';
import { Checkbox, Button, Input } from 'semantic-ui-react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    const items = window.localStorage.getItem("items") || "[]";
    this.state = { items: JSON.parse(items), input: "" };
  }

  render() {
    return (
      <div className="List">
        {this.itemInput()}
        {this.listItems()}
      </div>
    );
  }

  groupedItems() {
    return this.state.items.reduce((hash, item) => {
      const key = item.category;
      hash[key] = (hash[key] || []).concat(item);
      return hash;
    }, {});
  }

  itemInput() {
    return (
      <div className="List-header">
        <div className="List-header-input">
          <form onSubmit={this.addItem.bind(this)}>
            <Input
              className="List-input"
              placeholder="Add items"
              value={this.state.input}
              onChange={e => this.setState({input: e.target.value})}
            />
          </form>
        </div>
        <div className="List-header-button">
          <Button
            className="List-button"
            onClick={this.deleteChecked.bind(this)}
            basic
            color='red'
          >
            Clean
          </Button>
        </div>
      </div>
    );
  }

  addItem(evt) {
    if (this.state.items.find(item => item.name === this.state.input)) {
      // do some sort of error messaging
    } else {
      const newItems = [
        ...this.state.items,
        { name: this.state.input, checked: false, category: "Default" }
      ];
      this.setState({ items: newItems, input: "" });
      window.localStorage.setItem("items", JSON.stringify(newItems));
    }
    evt.preventDefault();
  }

  listItems() {
    const mappedItems = [];
    const groupedItems = this.groupedItems();
    Object.keys(groupedItems).forEach((key, index) => {
      // mappedItems.push(this.listCategory(key));
      mappedItems.push(groupedItems[key].map(item => this.listItem(item)));
    });
    return mappedItems;
  }

  listItem(item) {
    return (
      <div className="List-item" key={`item-${item.name}`}>
        <Checkbox
          className="List-checkbox"
          key={item.name}
          checked={item.checked}
          onChange={e => this.updateChecked(item.name, e)}
          label={item.checked ? <label className="List-crossed">{item.name}</label> : item.name}
        />
      </div>
    );
  }

  listCategory(name) {
    return (
      <div key={`category-${name}`}>
        {name}
      </div>
    );
  }

  updateChecked(name, evt) {
    const items = this.state.items;
    const index = items.findIndex(item => item.name === name);
    const item = items[index];

    item.checked = !item.checked;
    items[index] = item;

    this.setState({items: items});
    window.localStorage.setItem("items", JSON.stringify(items));
  }

  deleteChecked() {
    if (window.confirm("Cleaning your list will remove all checked items. This is not reversible. Are you sure?")) {
      const filteredItems = this.state.items.filter(item => !item.checked);
      this.setState({items: filteredItems});
      window.localStorage.setItem("items", JSON.stringify(filteredItems));
    }
  }
}

export default App;
