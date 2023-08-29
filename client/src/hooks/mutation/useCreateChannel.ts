import {useMutation} from "@apollo/client";
import {CREATE_CHANNEL} from "../../graphql/mutation/channel";
import {CreateChannelForm} from "../../components/pages/CreateChannel";

const useCreateChannel=()=>{
    const [CreateChannel,{loading, error}] = useMutation(CREATE_CHANNEL);

    const createChannel = async ({name, description}:CreateChannelForm)=>{
        const data = await CreateChannel({
            variables: { channel_name: name, description: description },
        })
        return data
    }

    return {createChannel, loading, error}
}

export {useCreateChannel}