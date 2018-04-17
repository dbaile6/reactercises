import React from 'react';

let edIt = ({blog, removeBlog, editBlog, saveBlog, updateActions}) => 
    <form className="edit-form"> 
        <input name="title" value={`${blog.title}`} onChange={ (event) => updateActions.updateTitle(blog, event)}></input>
        <h3>{`Written By: ${blog.userID}`}</h3>
        <input name="body" value={`${blog.body}`} onChange={ (event) => updateActions.updateBody(blog, event)}></input>
        <button onClick= {() => blog.removeBlog(blog.blog)}>Remove Blog</button>
        <button onClick= {() => blog.saveBlog(blog.blog)}>Save Blog</button>
    </form>;

export default edIt;