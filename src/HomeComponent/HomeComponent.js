import React from "react";
import PropTypes from 'prop-types';
import Service from "../services";

export class HomeComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      initialPosts:[],
      finalPosts:[],
      error:null,
      showAddForm: false,
      form:{
        title:'',
        body:'',
      }
     };
  }

  componentDidMount(){
    Service.getPostsApiData().then((posts) => {
      console.log(posts);
      this.setState({initialPosts:posts.data,finalPosts:posts.data})
    }).catch((error) => {
      console.log('errors',error.message);
      this.setState({error:error.message});
    })
  }

  submitFormHandler = (e) => {
    e.preventDefault();
    Service.submitAddForm(this.state.form).then(response => {
      console.log('success',response);
    }).catch(error => {
      console.log('error',error);
      this.setState({error:error.message});
    });
  }

  changehandler = (e) => {
    let updatedPosts = this.state.initialPosts;
    updatedPosts = updatedPosts.filter(post => {
      return post.title.includes(e.target.value);

    });
    this.setState({finalPosts:updatedPosts})
  }

  deleteHandler = (id) => {
    let updatedPosts = this.state.finalPosts;
    updatedPosts = updatedPosts.filter((post) => {
      // return post.title.includes(e.target.value);
      return (post.id !== id);

    });
    this.setState({finalPosts:updatedPosts})
    console.log(id);
  }

  handleChange = (e)=> {
    var form = this.state.form;
    form[e.target.name] = e.target.value;
    this.setState({form:form});
  }

  addPostHandler = () => {
    this.setState({showAddForm:true});
  }

  // submitFormHandler = (e) => {
  //   e.preventDefault();
  //   this.props.submitAddForm(this.state.form);
  // }

  render(){
    const errorMsg = this.state.error
    return (
      <div>
        <h2>HomeComponent Header</h2>
        <div>
          Item Counts : <span  className="font-weight-bold">{this.state.finalPosts.length}</span>
          <button onClick={this.addPostHandler}  type="button" className="btn btn-primary float-right mb-2">Add Post</button>
        </div>
        {this.state.showAddForm &&
        <div className="">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Title:</label>
              <input type="text" name='title' className="form-control" value={this.state.form.title} onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <label>Body:</label>
              <input type="text" name='body' className="form-control" value={this.state.form.body} onChange={this.handleChange} />
            </div>
            <input type="submit" value="Submit" className="btn btn-primary" onClick={this.submitFormHandler} />
          </form>
        </div>}
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">Search</span>
          </div>
          <input onChange={this.changehandler} type="text" className="form-control" placeholder="Search Posts..." />
        </div>
        {errorMsg &&
        <div className="alert alert-danger" role="alert">
          {errorMsg}
        </div>}
        <div className="container">
          <ul className="list-group text-left row">
            {
              this.state.finalPosts.map((item,index) => {
                return (<li className="list-group-item" key={item.id}>{item.title}
                    <button onClick={() => this.deleteHandler(item.id)} type="button" className="close" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                </li>)
              })
            }
          </ul>
          </div>
      </div>
    )
  }
}

HomeComponent.propTypes = {
  onComponentMount: PropTypes.func,
  posts: PropTypes.object,
};

HomeComponent.defaultProps = {
  posts: {
    data:[],
    error:null
  },
};

export default HomeComponent;
