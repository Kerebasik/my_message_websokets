import { gql } from '@apollo/client';

const CREATE_CHANNEL = gql(`
mutation CreateChannel($channel_name:String!, $description:String!) {
    createChannel(createChannelInput: {channel_name:$channel_name, description:$description}) {
        _id
        channel_name
        channel_type
        created_at
    }
}
`);

export { CREATE_CHANNEL };
