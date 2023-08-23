import { gql } from '@apollo/client';

const GET_USER_SEARCH = gql(`
    query GetUserByPhone($search:String!) {
        getUserByPhone(phone: $search) {
            _id
            created_at
            email
            firstName
            lastName
            username
            phone
        }
    }
`);

const GET_USER_BY_ACCESS_TOKEN = gql(`
    query GetUserById {
        getUserById {
            _id
            created_at
            email
            firstName
            lastName
            username
            channels {
                _id
                channel_name
                channel_type
                created_at
                description
            }
            phone
            chats {
                _id
                created_at
            }
        }
    }
`);

export { GET_USER_SEARCH, GET_USER_BY_ACCESS_TOKEN };
