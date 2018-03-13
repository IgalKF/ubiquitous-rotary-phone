import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchBlog,deleteBlog } from '../actions/index';
import { Link } from 'react-router';
import Posts from './posts_index';

class BlogsShow extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  componentWillMount = () => {
    
    this.props.fetchBlog(this.props.params.id);
  }

  deleteBlogHandler = () => {
    this.props.deleteBlog(this.props.params.id)
      .then(() => { this.context.router.push('/'); });
  }

  render() {
    const {blog}  = this.props;
    if(!blog)
    return(
      <div>loading...</div>
    );
    if(blog[0].id != this.props.params.id){
    return(
      <div>loading...</div>
    );
  }
    const showBlog = {...blog[0]};
    return(
      <div className='bg-primary card p-3 '>
        <Link className='text-white' to="/">Back To Blogs</Link>
        <h1 className='text-white text-center'>{showBlog.title}</h1>
        <Posts blogid={this.props.params.id}/>
        <div>
          <br/>
          <button className='btn btn-danger' onClick={this.deleteBlogHandler.bind(this)}>
            Delete Blog
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { blog: state.blogs.blog };
}

export default connect(mapStateToProps, { fetchBlog,deleteBlog })(BlogsShow);
