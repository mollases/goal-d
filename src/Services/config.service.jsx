import { browserHistory } from 'react-router'
export default class Config{
  constructor(){
    let host = window.location.hostname
    if(host === 'localhost' || host === '127.0.0.1') {
      this.url = ''
    } else {
      this.url = 'https://j7emm0qr8e.execute-api.us-west-2.amazonaws.com/prod/goal-d-user-details'
    }
  }

  getUrl(c,args){
    switch(c){
      case 'getTopic':{
        return this.url+'/user-details/'+args[0]+'/topic/'+args[1]
      }
    }
  }
}
