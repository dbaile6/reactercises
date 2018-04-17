import React from 'react';

let thePost = ( {blog, removeBlog, editBlog} ) => 
    <div>
        <h1 className="header">{`${blog.title}`}</h1>
        <h3>{`Written By: ${blog.userId}`}</h3>
        <p>{`${blog.body}`}</p>
        <button onClick= {() => removeBlog(blog)}>Remove Blog</button>
        <button onClick= {() => editBlog(blog)}>Edit Blog</button>
    </div>

export default thePost;

