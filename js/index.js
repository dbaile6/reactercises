const root = document.querySelector('.react-container');
const h = React.createElement;
const r = ReactDOM.render;

let Author = ({
        author
    }) =>
    h('h1', {}, `${author}`);

let Time = ({
    date
    }) =>
    h('p', 
    {className: 'time'}, 
    `${date}`)

let Content = ({
        content
    }) =>
    h('p', {}, `${content}`);

let Image = ({
        path
    }) =>
    h('img', {
        src: path,
        height: '100px',
        width: '100px'
    });


let blogS = ({
        author,
        content,
        path,
        date
    }) =>
    h('div', {}, [
        h(Author, {
            author
        }),
        h(Image, {
            path
        }),
        h(Content, {
            content
        }),
        h(Time, {
            date
        }),
    ]);

let list = h('div', null, [
    h(Author, {
        author: 'Dylan Bailey'
    }),
    h(blogS, {
        author: 'Title 5',
        content: 'Here we go!!!!!',
        date: '9/1/2018'
    }),
    h(blogS, {
        author: 'Title 9',
        content: 'Hiya!',
        date: '9/2/2018'
    }),
    h(blogS, {
        author: 'Heres an entry,',
        content: 'Lorem ipsum',
        date: '9/3/2018'
    }),
    h(blogS, {
        author: 'And another one!',
        content: 'Lorem ipdum',
        date: '9/4/2018'
    }),
]);

r(list, root);