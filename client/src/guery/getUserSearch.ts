import {gql} from "@apollo/client";

export const GET_USER_SEARCH = gql(`
    query GetUserByPhone($search:String!) {
        getUserByPhone(phone: $search) {
            firstName
            lastName
        }
    }
`)