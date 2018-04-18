import React from 'react';
import SupList from './SupList';

const sups = [
    {id:1, author: 'Dylan', body:'Lorem ipsum', time: new Date(), image: "#"},
    {id:2, author: 'Roaper', body:'SIIIINF', time: new Date(), image: "#"},
    {id:3, author: 'Minna', body:'Ding dong', time: new Date(), image: "#"},
    {id:4, author: 'Joker', body:'FEEEEEE', time: new Date(), image: "../images/illia.jpg"}
]

let AllUsersScreen = () => {
    return( 
    <SupList sups={sups} />
    )
}

export default AllUsersScreen;
