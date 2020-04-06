import React, { Component } from 'react';
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
        <button className="List-DeleteChecked" onClick={this.deleteChecked.bind(this)}>Delete Checked</button>
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
      <div className="List-Input">
        <form onSubmit={this.addItem.bind(this)}>
          <input
            className="List-Input-Text"
            type="text"
            placeholder="Add items"
            value={this.state.input}
            onChange={e => this.setState({input: e.target.value})}
          />
        </form>
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
      <div className="List-ListItem" key={`item-${item.name}`}>
        <div className="List-ListItem-Checkbox">
          <input
            type="checkbox"
            key={item.name}
            checked={item.checked}
            onChange={e => this.updateChecked(item.name, e)}
          />
        </div>
        <div className="List-ListItem-Label">
          {item.checked ? <span className="List-ListItem-LabelCrossed">{item.name}</span> : item.name}
        </div>
      </div>
    );
  }

  listCategory(name) {
    return (
      <div className="List-ListCategory" key={`category-${name}`}>
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
    if (window.confirm("Are you sure?")) {
      const filteredItems = this.state.items.filter(item => !item.checked);
      this.setState({items: filteredItems});
      window.localStorage.setItem("items", JSON.stringify(filteredItems));
    }
  }
}

export default App;
