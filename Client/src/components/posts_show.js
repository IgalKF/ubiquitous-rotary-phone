import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions/index';
import { Link } from 'react-router';

class PostsShow extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  componentWillMount() {
    this.props.fetchPost(this.props.params.id);
  }

  onDeleteClick(id) {
    this.props.deletePost(this.props.params.id)
      .then(() => { this.context.router.push('/blogs/'+id); });
  }

  render() {
    const { post } = this.props;
    
    // equivalent to: const post = this.props.post;

    if (!post) {
      return <div>Loading...</div>;
    }
    const firstPost ={...post[0]};
    let cats = '';
    firstPost.categories.map((category,index)=>{
     // console.log(category);
      cats = cats === '' ? cats + category.category :cats + ', ' + category.category;
    });
    console.log(firstPost);
    return (
      <div className="p-3 bg-primary text-white">
        <Link className='text-white' to={"/blogs/"+firstPost.blogId}>Back To Blog's Page</Link>
        <button
          className="btn btn-danger float-right"
          onClick={this.onDeleteClick.bind(this,firstPost.blogId)}>
          Delete Post
        </button>
        <h3>{firstPost.title}</h3>
        <h6>Categories: <a href='#' className='text-white'>{cats}</a></h6>
        <p className='card text-black bg-white p-3'>{firstPost.content}</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { post: state.posts.post };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
