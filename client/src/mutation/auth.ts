import {gql} from "@apollo/client";

export const REGISTRATION = gql(`
mutation RegisterUser($email: String!, $firstName:String!, $lastName:String!, $password:String!, $phone:String!) {
    registerUser(
        registerUserInput: {email: $email, firstName: $firstName, lastName: $lastName, password: $password, phone: $phone}
    ) {
        _id
        email
        firstName
        lastName
        phone
    }
  }
`);

export const LOGIN = gql(`
mutation LoginUser($email:String!, $password:String!) {
    loginUser(loginUserInput: {email: $email, password: $password}) {
        access_token
    }
}
`)