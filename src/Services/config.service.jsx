import { browserHistory } from 'react-router'

export default class Config {
  constructor(){
    this.url = window.location.origin
    if(this.url.indexOf('execute') !== -1){
      this.url = this.url.substring(0,this.url.length-1)
    }
  }

  getAuthCallback(){
    return this.url+'/user';
  }

  getUserDetails(user) {
    return fetch(this.url+'/user-details/'+user);
  }

  postUserDetails(user, body, callback) {
    return fetch('/user-details/'+user,this.getHeadersWithBody(body))
  }

  getUserTopic(user, topic) {
    return fetch(this.url+'/user-details/'+user+'/topic/'+topic);
  }

  postUserTopic(user, topic, body) {
    return fetch('/user-details/'+user+'/topic/'+topic,this.getHeadersWithBody(body))
  }

  getUserTopicPostList(user, topic, post, postList) {
    return fetch(this.url+'/user-details/'+user+'/topic/'+topic+'/post/'+post+'/extra/'+postList);
  }

  postUserTopicOnPost(user, topic, post, body) {
    return fetch('/user-details/'+user+'/topic/'+topic+'/post/'+post,this.getHeadersWithBody(body))
  }

  getHeadersWithBody(body){
    return {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(body)
    }
  }
}
