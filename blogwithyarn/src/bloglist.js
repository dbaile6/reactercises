import React from 'react';
let h = React.createElement;
let BlogListFunction = ({blogs}) => h('div', {className: 'post-list'}, blogs);

let BlogList = (blogs) => {
    let newBlogList = [];
    blogs.forEach( (blog) => {
    if (blog === blogBeingEdited ) {
        let newBlog = <EditableBlogPost key={blog.id} blog={blog} removeBlog={removeBlog} editBlog={editBlog} saveBlog={saveBlog} updateActions={updateActions} />;
        newBlogList.push(newBlog);
    } else {
        let newBlog = <BlogPost key={blog.id} blog={blog} removeBlog={removeBlog} editBlog={editBlog} saveBlog={saveBlog} updateActions={updateActions} />;
        newBlogList.push(newBlog);
    }
    });
    let allBlogs = h(BlogListFunction, {blogs: newBlogList});
    return allBlogs;
  }

  export default BlogList;