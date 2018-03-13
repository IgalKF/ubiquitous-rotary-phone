import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import PostsIndex from './components/posts_index';
import BlogsIndex from './components/blogs_index';
import PostsNew from './components/posts_new';
import PostsShow from './components/posts_show';
import BlogsShow from './components/blogs_show';
import BlogsNew from './components/blogs_new';
import CategoriesIndex from './components/categories_index';

export default (
  <Route path="/" component={App} >
    <IndexRoute component={BlogsIndex}/>
    <Route path="posts/new/:id" component={PostsNew} />
    <Route path="blogs/new" component={BlogsNew} />
    <Route path="posts/:id" component={PostsShow} />
    <Route path="blogs/:id" component={BlogsShow} />
    <Route path="categories" component={CategoriesIndex} />
    <Route component={PostsIndex} />
  </Route>
);

// The route posts/:id matches with this.props.params.id
