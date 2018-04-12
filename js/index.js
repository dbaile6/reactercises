let h = React.createElement;
let r = ReactDOM.render;
let main = document.querySelector('.react-container');



let blogs = [
    { id: '1', title: 'Blogpost1', author: 'Blogpost2', date: '4-11-18', body: `dingdong`, image: 'https://cdn.stocksnap.io/img-thumbs/960w/R6ZD36GIPB.jpg', isBeingEdited: false },
    { id: '2', title: 'Information Age', author: 'J White', date: '4-11-18', body: `dooo`, image: 'https://cdn.stocksnap.io/img-thumbs/960w/7QH4K6AESO.jpg', isBeingEdited: false },
    { id: '3', title: 'The Call of the Blog', author: 'Jason John', date: '4-11-18', body: `doooo`, image: 'https://cdn.stocksnap.io/img-thumbs/960w/UA6XPI0IM9.jpg', isBeingEdited: false },
]

let removeBlog = (blogToDelete) => {
    let { id } = blogToDelete;
    blogs = blogs.filter((blog) => blog.id !== id);
    renderToPage();
}

let editBlog = (blogToEdit) => {
    let blog = blogs.find((blog) => blog.id === blogToEdit.id)
    blog.isBeingEdited = !blog.isBeingEdited;
    renderToPage();
}

let createEditBlog = ({ blog }) => h('input', { type: 'text', name: 'title', placeholder: `${blog.title}` });

//Definition of elements
let createTitle = ({ title }) => 
h('h1', 
{ className: 'header' }, 
`${title}`);

let createImage = ({ image }) => 
h('img', 
{ src: image });

let createAuthor = ({ author }) => h(
'h3', 
null, 
`Written By: 
${author}`);

let createDate = ({ date }) => 
h('h3', 
null, 
`Date: ${date}`);

let createBody = ({ body }) => 
h('p', 
null, 
`${body}`);

//Creates format for blog post

let BlogPost = (blog) => h('div', { className: 'post' }, [
    h(createTitle, { title: blog.title }),
    h(createImage, { image: blog.image }),
    h(createAuthor, { author: blog.author }, []),
    h(createDate, { date: blog.date }, []),
    h(createBody, { body: blog.body }, []),
    h(DeleteBlogButton, blog),
    h(EditBlogButton, blog),
    // h(demoBlogButton, blog)
]);
///
// 

//Functions to manipulate content... reactively!!!!!

let DeleteBlogButton = (blog) => h('button', {
    className: 'delete',
    onClick: () => removeBlog(blog)
},
    'Remove Blog');

let EditBlogButton = (blog) => h('button', {
    className: 'edit',
    onClick: () =>
        editBlog(blog)
},
    'Edit Blog');

let updateTitle = (blogToUpdate, event) => {
    let blog = blogs.find((blog) => blog.id === blogToUpdate.id)
    blog.title = event.target.value;
    renderToPage();
};

let updateAuthor = (blogToUpdate, event) => {
    let blog = blogs.find((blog) => blog.id === blogToUpdate.id)
    blog.author = event.target.value;
    renderToPage();
};

let updateBody = (blogToUpdate, event) => {
    let blog = blogs.find((blog) => blog.id === blogToUpdate.id)
    blog.body = event.target.value;
    renderToPage();
};

// let demoBlogButton = (blog) => h('button', {className:'demo', 
// onClick: () => 
// console.log('Hi there!') }, 
// 'Demo',);

let editBlogPost = (blog) => h('form', { className: 'edit-form' }, [
    h('input', { name: 'title', value: blog.title, onChange: (event) => updateTitle(blog, event) }),
    h(Image, { image: blog.image }),
    h('input', { name: 'author', value: blog.author, onChange: (event) => updateAuthor(blog, event) }),
    h(createDate, { date: blog.date }, []),
    h('input', { name: 'body', value: blog.body, onChange: (event) => updateBody(blog, event) }),
    h(DeleteBlogButton, blog),
    h(EditBlogButton, blog),
]);

// Rendering and to go

let BlogList = ({ blogs }) => h('div', { className: 'post-list' }, blogs);

let renderToPage = () => {
    let newBlogList = [];
    blogs.forEach((blog) => {
        if (blog.isBeingEdited === false) {
            let newBlog = h(BlogPost, blog);
            newBlogList.push(newBlog);

        } else {
            let newBlog = h(editBlogPost, blog);
            newBlogList.push(newBlog);
        }
    });
    let allBlogs = h(BlogList, { blogs: newBlogList });
    ReactDOM.render(allBlogs, main);
};

renderToPage();