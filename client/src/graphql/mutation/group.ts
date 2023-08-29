import {gql} from "@apollo/client";

const CREATE_GROUP = gql(`
mutation CreateGroup($group_name:String!, $description:String!) {
    createGroup(createGroupInput: {description: $description, group_name: $group_name}) {
        _id
        created_at
        description
        group_name
        group_type
    }
}

`)


export {CREATE_GROUP}