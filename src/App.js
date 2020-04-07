import React, { Component } from 'react';
import {
  Checkbox,
  Button,
  Input,
  Dropdown,
  Menu,
} from 'semantic-ui-react';

import NewListModal from './NewListModal';
import CleanListModal from './CleanListModal';
import DeleteListModal from './DeleteListModal';

import { colorOptions, defaultColorOption } from './colorOptions';

import './App.css';

class App extends Component {
  constructor() {
    super();

    const items = JSON.parse(window.localStorage.getItem("items") || "[]");
    const categories = JSON.parse(window.localStorage.getItem("categories") || "[\"Default\"]");
    const color = window.localStorage.getItem("color") || defaultColorOption;
    const category = window.localStorage.getItem("category") || "Default";

    this.state = {
      input: "",
      name: "",
      error: "",
      cleanOpen: false,
      deleteOpen: false,
      newOpen: false,
      items,
      categories,
      color,
      category
    };
  }

  render() {
    return (
      <div className="List">
        {this.header()}
        <div className="List-items">
          {this.listItems()}
        </div>
        <CleanListModal
          open={this.state.cleanOpen}
          onClickCancel={e => this.setState({ cleanOpen: false })}
          onClickConfirm={this.cleanList.bind(this)}
        />
        <DeleteListModal
          open={this.state.deleteOpen}
          onClickCancel={e => this.setState({ deleteOpen: false })}
          onClickConfirm={this.deleteList.bind(this)}
        />
        <NewListModal
          open={this.state.newOpen}
          name={this.state.name}
          error={this.state.error}
          onChange={e => this.setState({ name: e.target.value })}
          onClickCancel={e => this.setState({ newOpen: false, name: "", error: "" })}
          onClickConfirm={this.newList.bind(this)}
        />
      </div>
    );
  }

  groupedItems() {
    const hash = {}
    colorOptions.forEach(option => hash[option.value] = []);

    this.state.items
      .filter(i => this.state.category === i.category)
      .forEach(item => {
        const key = item.color || defaultColorOption;
        hash[key] = (hash[key] || []).concat(item);
      });

    return hash;
  }

  header() {
    return (
      <div>
        <div className="List-header">
          <div className="List-header-input-left">
            <Menu compact className="List-header-input-menu">
              <Dropdown
                selection
                basic
                value={this.state.category}
                options={this.state.categories.map(c => { return { key: c, text: c, value: c }})}
                onChange={this.changeCategory.bind(this)}
              />
            </Menu>
          </div>
          <div className="List-header-input-right">
           <Button.Group className="List-header-button">
             <Button onClick={e => this.setState({ cleanOpen: true })}>Clean</Button>
              <Dropdown
                className='button icon'
                floating
                trigger={<React.Fragment />}
              >
                <Dropdown.Menu>
                  <Dropdown.Item
                    text="New"
                    icon="plus"
                    value="new"
                    onClick={e => this.setState({ newOpen: true })}
                  />
                  <Dropdown.Item
                    text="Delete"
                    icon="delete"
                    value="delete"
                    disabled={this.state.categories.length === 1}
                    onClick={e => this.setState({ deleteOpen: true })}
                  />
                </Dropdown.Menu>
              </Dropdown>
            </Button.Group>
          </div>
        </div>
        <div>
          <form onSubmit={this.addItem.bind(this)}>
            <Input
              className="List-input"
              placeholder="Add items"
              value={this.state.input}
              onChange={e => this.setState({ input: e.target.value })}
            />
          </form>
        </div>
      </div>
    );
  }

  // label={<Dropdown value={this.state.color} options={colorOptions} onChange={this.changeColor.bind(this)} />}

  changeColor(evt, { value }) {
    this.setState({ color: value });
    window.localStorage.setItem("color", value);
  }

  changeCategory(evt, { value }) {
    this.setState({ category: value });
    window.localStorage.setItem("category", value);
  }

  addItem(evt) {
    if (!this.state.input) {
      console.log("error creating item -- no name");
      this.setState({ input: "" });
    } else if (this.state.items.find(item => item.name === this.state.input && item.category === this.state.category)) {
      console.log("error creating item -- duplicate name");
      this.setState({ input: "" });
    } else {
      const newItems = [
        ...this.state.items,
        { name: this.state.input, checked: false, category: this.state.category, color: this.state.color }
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
      mappedItems.push(groupedItems[key].map(item => this.listItem(item)));
    });
    return mappedItems;
  }

  listItem(item) {
    // <div className={`List-item ${item.color}`} key={`item-${item.name}`}>
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

  updateChecked(name, evt) {
    const items = this.state.items;
    const index = items.findIndex(item => item.name === name);
    const item = items[index];

    item.checked = !item.checked;
    items[index] = item;

    this.setState({items: items});
    window.localStorage.setItem("items", JSON.stringify(items));
  }

  cleanList() {
    const filteredItems = this.state.items.filter(item => item.category !== this.state.category || !item.checked);
    this.setState({items: filteredItems});
    window.localStorage.setItem("items", JSON.stringify(filteredItems));
    this.setState({ cleanOpen: false });
  }

  deleteList() {
    const filteredItems = this.state.items.filter(item => item.category !== this.state.category);
    window.localStorage.setItem("items", JSON.stringify(filteredItems));

    const filteredCategories = this.state.categories.filter(item => item !== this.state.category);
    window.localStorage.setItem("categories", JSON.stringify(filteredCategories));

    window.localStorage.setItem("category", filteredCategories[0]);

    this.setState({
      category: filteredCategories[0],
      deleteOpen: false,
      categories: filteredCategories,
      items: filteredItems,
    });
  }

  newList() {
    if (!this.state.name) {
      console.log("error creating list -- no name");
      this.setState({ error: "* A list name is required" });
    } else if (this.state.categories.find(item => item === this.state.name)) {
      this.setState({ error: `* You already have a list named ${this.state.name}` });
      console.log("error creating list -- duplicate name");
    } else {
      const newCategories = [...this.state.categories, this.state.name];
      this.setState({ categories: newCategories, category: this.state.name, newOpen: false });
      window.localStorage.setItem("categories", JSON.stringify(newCategories));
      this.setState({ name: "", error: "" });
    }
  }
}

export default App;
