import { Injectable } from '@angular/core';
import { gql, Apollo } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class ApisService {

  constructor(private apollo: Apollo) { }

  // get all chats
  getConversations() {
    let token = localStorage.getItem('token')
    const getConversations = gql`
    query getConversations {
      getConversations(token: "${token}") {
        _id
        date
        userOne
        userTwo
      }
    }

    `
    return this.apollo.query({ query: getConversations })
  }

  // get single chat
  getCoversation(coversationId: string) {
    let token = localStorage.getItem('token')
    const getConversation = gql`
    query getConversation {
      conversation(_id: "${coversationId}", token: "${token}") {
        date
        userOne
        userTwo
        messages {
          author
          conversationId
          date
          message
        }
      }
    }


    `
    return this.apollo.query({ query: getConversation })
  }
  // send message
  sendMessgae(message: string, targetedUser: string) {
    const sendMessage = gql`
    mutation sendMessage($inputs: MessageInputData!){
      sendMessage(messageInput: $inputs) {
        message
      }
    }
    `

    const variables = {
      inputs: {
        message: message,
        targetUsername: targetedUser,
        token: localStorage.getItem('token')
      }
    }

    return this.apollo.mutate({
      mutation: sendMessage,
      variables
    })


  }

  // subscribe
  subscribeMessage(conversationId: string) {
    let token = localStorage.getItem('token')
    const subscribeMessage = gql`
    subscription subscribeMessage {
      message(conversationId: "${conversationId}", token: "${token}") {
        _id
        author
        conversationId
        date
        message
      }
    }
    `
    return this.apollo.subscribe({
      query: subscribeMessage
    })
  }

  //delete conversation
  deleteConversation(conversationid: string) {
    let token = localStorage.getItem('token')
    const deleteConversation = gql`
    mutation deleteConversation {

      deleteConversation(conversationId: "${conversationid}", token: "${token}") {
        message
      }
    }

    `

    return this.apollo.mutate({
      mutation: deleteConversation,

    })


  }
  // get all users
  getUsers() {
    let token = localStorage.getItem('token')
    const getUsers = gql`
    query users {
      users(token: "${token}")
    }


    `
    return this.apollo.query({ query: getUsers })
  }


}
