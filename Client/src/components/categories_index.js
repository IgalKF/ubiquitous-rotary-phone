import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchCategories,deleteCategory } from '../actions/index';
import { Link } from 'react-router';

class CategoriesIndex extends Component {
  static contextTypes = {
    router: PropTypes.object
  }
  componentWillMount() {
    this.props.fetchCategories();
  }
  deleteCategoryHandler = (id) =>{

    this.props.deleteCategory(id)
    .then(()=>{
      this.props.fetchCategories();
    });
  }
  renderCategories = () => {
  // console.log(this.props.posts);

  const categories = [...this.props.categories];
    return categories.map((category,index) => {
      const p = ( 
        <li className="list-group-item m-3" key={category.id}>
            <strong>{category.name}</strong>
            <button onClick={this.deleteCategoryHandler.bind(this,category.id)}
             className='float-right btn btn-danger btn-circle'>-</button>
        </li>
        )
      return p;
    });
  }

  render () {
    return (
      <div>
          <Link className='' to="/">Back To Blogs</Link>
          <ul>
            {this.renderCategories()}
          </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {...state, categories: state.categories.all }
}

export default connect(mapStateToProps, { fetchCategories,deleteCategory })(CategoriesIndex);
