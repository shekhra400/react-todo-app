import axios from "axios";

export const API_ENDPOINT_DUMMY_BASE_URL = 'https://jsonplaceholder.typicode.com/';

export default {
  fetchPosts : () => {
    return axios.get(API_ENDPOINT_DUMMY_BASE_URL + 'posts?_limit=10');
  },
  getPostsApiData : function() {
    try {
      return new Promise((resolve,reject) => {
        this.fetchPosts().then(data => {
          if(data.status === 200){
            resolve(data);
          }else{
            reject(data);
          }
      })
    });

    } catch (error) {
      return error;
    }
  }
}
