import React from "react";
import PropTypes from 'prop-types';
import Service from "../services";

export class HomeComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      initialPosts:[],
      finalPosts:[],
      error:null,    };
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

  // componentWillReceiveProps(nextProps){
  //   if(this.props.posts !== nextProps.posts){
  //     this.setState({initialPosts:nextProps.posts.data,finalPosts:nextProps.posts.data})
  //   }
  // }

  changehandler = (e) => {
    let updatedPosts = this.state.initialPosts;
    console.log(e.target.value,updatedPosts);
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

  render(){
    const errorMsg = this.state.error
    return (
      <div>
        <h2>HomeComponent Header</h2>
        <div>Item Counts : <span  className="font-weight-bold">{this.state.finalPosts.length}</span></div>
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
