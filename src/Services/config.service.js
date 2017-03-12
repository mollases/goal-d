import Auth0Lock from 'auth0-lock'
import { browserHistory } from 'react-router'

export default class Config{
  getUrl(c,args){
    switch(c){
      case 'getTopic':{
        return '/user-details/'+args[0]+'/topic/'+args[1]
      }
    }
  }
}
