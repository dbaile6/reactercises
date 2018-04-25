import React, { Component } from 'react';
import SelectRow from './SelectRow';

let categories = [
  { "id": 1, "name": "Stickit" },
  { "id": 2, "name": "Stickthere" },
  { "id": 3, "name": "Boooer" },
  { "id": 4, "name": "Poolm"}
]

class Menu extends Component {
  render() {
    return (
      <div className="main-menu">
      {
            categories.map(list => <CategoryRow key={list.id} list={list}/>)
        }
    </div>
    );
  }
}

export default Menu;
