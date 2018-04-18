import React from 'react';
import moment from 'moment';

let Sup = ({sup}) =>
<div className="sup-container">
    <h3 className="sup-body">{sup.body}</h3>
    <p className="sup-author-time">{sup.author} | {moment(sup.time).fromNow()}</p>
</div>

export default Sup;


