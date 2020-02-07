import axios from 'axios'

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'User'

class AuthenticationService {

    

    registerSuccessfulLogin(userId,username ){
        sessionStorage.setItem('userId', userId)
        sessionStorage.setItem('username', username)
    }

    executeBasicAuthenticationService(username, password) {
       return axios.post('http://localhost:8080/signin', {
            username : username,
            password: password
          })
    }

    executeBasicRegistrationService(username, password) {
        return axios.post('http://localhost:8080/', {
             username : username,
             password: password
           })
     }

    logout() {
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('username');
    }

    isUserLoggedIn() {
        let userId = sessionStorage.getItem('userId')
        if (userId === null || userId == "-1") return false
        return true
    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem('username')
        console.log("method called");
        console.log("user ** "+user);
        if (user === null) return "";
        return user
    }

    getLoggedInUserId(){
        let userId = sessionStorage.getItem('userId');
        if(userId == null)return -1;
        return userId;
    }

    
}

export default new AuthenticationService()