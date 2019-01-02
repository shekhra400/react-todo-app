import React from "react";
import PropTypes from 'prop-types';
import { isEqual, isEmpty} from 'lodash/fp';
import Service from "../services";

export class PostComponent extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props){
    super(props);
    this.state  = {currentPost:{},error:null};
  }
  componentDidMount(){
    const { id } = this.props.match.params;
    this.getCurrentPostData(id);
  }

  componentWillReceiveProps(nextProps){
    if(!isEqual(nextProps.match.params,this.props.match.params)){
      const { id } = nextProps.match.params;
      this.getCurrentPostData(id);
    }
  }

  getCurrentPostData = (id) => {
    Service.getCurrentPostsApi(id).then((currentPost) => {
      this.setState({currentPost:currentPost.data})
    }).catch((error) => {
      this.setState({error:error.message});
    })
  }

  render(){
    const { error: errorMsg,currentPost } = this.state;
    return (
      <div>
        <h2>PostComponent</h2>
        {errorMsg &&
        <div className="alert alert-danger" role="alert">
          {errorMsg}
        </div>}
        {!isEmpty(currentPost) && <div className="card">
            <ul className="list-group list-group-flush ">
                <li className="list-group-item">
                    <strong>Title</strong>
                </li>
                <li className="list-group-item">
                  {currentPost.title}
                </li>
                <li className="list-group-item" >
                    <strong>Description</strong>
                </li>
                <li className="list-group-item" >
                  {currentPost.body}
                </li>
            </ul>
        </div>}
      </div>
    )
  }

}

PostComponent.propTypes = {
  getCurrentPostData: PropTypes.func,
  post: PropTypes.object,
};

PostComponent.defaultProps = {
  post: {},
};

export default PostComponent;

