import { combineReducers } from 'redux';
import PostsReducer from './reducer_posts';
import BlogsReducer from './reducer_blogs';
import CategoriesReducer from './reducer_categories';
import { reducer as formReducer } from 'redux-form';

//console.log(CategoriesReducer()); 
const rootReducer = combineReducers({
  blogs: BlogsReducer,
  categories: CategoriesReducer,
  posts: PostsReducer,
  form: formReducer
});

export default rootReducer;
