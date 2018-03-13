import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchBlogs } from '../actions/index';
import { Link } from 'react-router';
import Posts from './posts_index';

class BlogsIndex extends Component {

  componentWillMount() {
    this.props.fetchBlogs();
  }
  renderBlogs = () => {
  // console.log(this.props.posts);
  const blogs = [...this.props.blogs];
    return blogs.map((blog,index) => {
      const p = ( 
        <li className="list-group-item m-3" key={blog.id}>
          <Link to={"blogs/" + blog.id}>
            <span className="float-right">*</span>
            <strong>{blog.title}</strong>
          </Link>
        </li>
        )
      return p;
    });
  }

  render () {
    return (
      <div>
          <h3 className='text-blue mb-3'>Welcome to 'Not Interesting Blogs'!</h3>
          <Link className='btn btn-success'
          to='blogs/new'
          >Create a Blog</Link>
          <Link className='btn btn-info ml-3'
          to='categories'
          >Manage Categories</Link>
          <ul>
            {this.renderBlogs()}
          </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {...state, blogs: state.blogs.all }
}

export default connect(mapStateToProps, { fetchBlogs })(BlogsIndex);
