import React, { Component } from 'react';
import './App.css';
import thePost from './posts.js';
import edIt from './edits.js';

let h = React.createElement;
let BlogList = ({blogs}) => h('div', {className: 'post-list'}, blogs);


class Page extends Component {
    constructor (props) {
		super(props);
		this.state = {blogs: [], blogBeingEdited: null}
    }

    componentDidMount() {
        this.fetchData();   
    } 
    
    fetchData () {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then(res => this.setState({blogs: res}) )
    }

    render () {
        let {blogs, blogBeingEdited} = this.state;
        
        let removeBlog = (blogToDelete) => {
            let { id } = blogToDelete;
            let removeBlogList = blogs.filter( (blog) => blog.id !== id);
            return this.setState({blogs: removeBlogList});
        }

        let editBlog = (blogToEdit) => {
            let editedBlog = blogs.find( (blog) => blog.id === blogToEdit.id);
            return this.setState({blogBeingEdited : editedBlog});
        }

        let saveBlog = (blogToSave) => {
            return this.setSetate({blogBeingEdited : null})
        }

        let updateTitle = (blogToUpdate, event) => {
            let blog = blogs.find( (blog) => blog.id === blogToUpdate.id)
            blog.title = event.target.value;
            return this.setState({blogBeingEdited:blogToUpdate})
        };
        
        let updateBody = (blogToUpdate, event) => {
            let blog = blogs.find( (blog) => blog.id === blogToUpdate.id)
            blog.body = event.target.value;
            return this.setState({blogBeingEdited:blogToUpdate})
        };

        let updateActions = {
            'updateTitle': updateTitle,
            'updateBody': updateBody
        }

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
        let allBlogs = h(BlogList, {blogs: newBlogList});
        return allBlogs;
    };
};

export default Page;