import React from 'react';
import {NavLink} from 'react-router-dom';

let SelectRow = ({list}) =>
    <div className="items">
        <NavLink to={`products/${list.name}`}>{list.name}</NavLink>
    </div>

export default SelectRow;