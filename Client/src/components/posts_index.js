import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { bindActionCreators } from 'redux';
import { fetchPosts } from '../actions/index';
import { Link } from 'react-router';

class PostsIndex extends Component {

  componentWillMount() {
   // console.log(this.props.blogid);
    this.props.fetchPosts(this.props.blogid);
  }
  shouldComponentUpdate = () => {
    return true;
  }
  renderPosts() {
    //console.log(this.props.posts);
   const posts = [...this.props.posts];
    return posts.map((post) => {
      let cats = '';
      post.categories.map((category,index)=>{
       // console.log(category);
        cats = cats === ''? cats + category.category :cats + ', ' + category.category;
      });
      let p = ( 
        <li className="list-group-item" key={post.id}>
          <Link to={"/posts/" + post.id}>
         
            <span className="float-right">{cats}</span>
            <strong>{post.title}</strong>
          </Link>
        </li>
        )
      return p;
    });
  }

  render () {
    return (
      <div className=" p-3 bg-white card">
        <h3 className='text-black'>Posts</h3>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
        <div className="text-xs-right"><br/>
          <Link to={"/posts/new/" + this.props.blogid} className="btn btn-success">
            Add a Post
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  //console.log(state.posts); 
  return {...state, posts: [...state.posts.all] }
}

// Original version
// function mapDispatchToProps(dispath) {
//   return bindActionCreators({ fetchPosts }, dispath);
// }

//export default connect(null, mapDispatchToProps)(PostsIndex);

// First refactor
//export default connect(null, { fetchPosts: fetchPosts })(PostsIndex);

// Second refactor: using ES6 sintax
export default connect(mapStateToProps, {fetchPosts })(PostsIndex);
