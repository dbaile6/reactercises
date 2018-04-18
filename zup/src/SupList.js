import React from 'react';
import Sup from './Sup';

let SupList = ({sups}) =>
<div>
    {
        sups.map(sup =>
        <Sup key={sup.id} sup={sup}/>)
    }
</div>

export default SupList;


