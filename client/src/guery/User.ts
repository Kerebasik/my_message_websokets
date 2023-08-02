import {gql} from "@apollo/client";

const GET_USER_SEARCH = gql(`
    query GetUserByPhone($search:String!) {
        getUserByPhone(phone: $search) {
            firstName
            lastName
        }
    }
`)

const GET_USER_BY_ACCESS_TOKEN = gql(`
    query GetUserById {
        getUserById {
            _id
            created_at
            email
            firstName
            lastName
            phone
            chats {
                _id
                created_at
            }
        }
    }
`)


export default {
    GET_USER_SEARCH,
    GET_USER_BY_ACCESS_TOKEN
}