import { Injectable } from '@angular/core';
import { gql, Apollo } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private apollo: Apollo) {

  }

  //login using username and password
  login(username: string, password: string) {

    const login = gql`
  query login($inputs: UserInput!){
    login(userInput: $inputs) {
      token
    }
  }
  `

    const variables = {
      inputs: {
        username: username,
        password: password
      }
    }

    return this.apollo.query({
      query: login,
      variables
    })
  }





  //register using username and password
  register(username: string, password: string) {
    const createUser = gql`
   mutation createUser {
     createUser(inputs: {username:"${username}", password: "${password}"}) {
       token
     }
   }`
    return this.apollo.mutate({
      mutation: createUser
    })
  }

  logout() {
    let token = localStorage.getItem('token');

    const logout = gql`
    mutation logout ($token: String!) {
      logout(token: $token) {
        message
      }
    }
    `

    const variables = {
      token: token
    }
    return this.apollo.mutate({
      mutation: logout,
      variables
    })
  }


  logedIn() {
    return !!localStorage.getItem('token')
  }




}
