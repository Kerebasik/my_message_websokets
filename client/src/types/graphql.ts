export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
    [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
    { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
    { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string
    String: string
    Boolean: boolean
    Int: number
    Float: number
    /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
    DateTime: string
    /** File upload scalar type */
    UploadFileScalar: File
}

export type AddUserToChannelInput = {
    /** Channel  */
    channel_id: Scalars["String"]
    /** User to add  */
    user_id: Scalars["String"]
}

export type AddUserToGroupInput = {
    /** Group  */
    group_id: Scalars["String"]
    /** User to add  */
    user_id: Scalars["String"]
}

export type BanUserFromChannelInput = {
    /** Channel  */
    channel_id: Scalars["String"]
    /** ID of user, who banned */
    subscriber_id: Scalars["String"]
}

export type Channel = {
    __typename?: "Channel"
    _id: Scalars["ID"]
    /** Banned users */
    ban_list: Array<User>
    /** Channel admins */
    channel_admins: Array<User>
    /** Channel name  */
    channel_name: Scalars["String"]
    /** Channel creation date  */
    created_at: Scalars["DateTime"]
    /** Creator of the channel  */
    creator: User
    /** Channel description  */
    description?: Maybe<Scalars["String"]>
    /** Channel polls */
    polls: Array<Poll>
    /** Channel posts */
    posts: Array<Post>
    /** Channel subscribers */
    subscribers: Array<User>
}

export type Chat = {
    __typename?: "Chat"
    _id: Scalars["ID"]
    /** User creation date  */
    created_at: Scalars["DateTime"]
    /** First companion in the chat  */
    first_companion: User
    /** Group messages */
    messages: Array<Message>
    /** Second companion in the chat  */
    second_companion: User
}

export type CreateChannelInput = {
    /** Channel name  */
    channel_name: Scalars["String"]
    /** Group description */
    description?: Maybe<Scalars["String"]>
}

export type CreateChatInput = {
    /** First companion in the chat */
    first_companion: Scalars["String"]
    /** Second companion in the chat */
    second_companion?: Maybe<Scalars["String"]>
}

export type CreateGroupInput = {
    /** Group description */
    description?: Maybe<Scalars["String"]>
    /** Group name  */
    group_name: Scalars["String"]
}

export type CreateMessageInput = {
    /** Files of the message */
    files?: Maybe<Array<Scalars["String"]>>
    /** Receiver of the message */
    receiver: Scalars["String"]
    /** Receiver type */
    receiver_model?: Maybe<Scalars["String"]>
    /** Text of the message */
    text?: Maybe<Scalars["String"]>
}

export type CreatePollInput = {
    /** Text of the message */
    options?: Maybe<Array<Scalars["String"]>>
    /** Question of the pool */
    question: Scalars["String"]
    /** Group or channel, where pool will be placed */
    receiver: Scalars["String"]
    /** Type of the receiver, group or channel */
    receiver_type: Scalars["String"]
    /** Text of the message */
    text?: Maybe<Scalars["String"]>
}

export type CreatePostInput = {
    /** Channel for the post  */
    channel: Scalars["String"]
    /** Post text */
    text: Scalars["String"]
}

export type CreateUserInput = {
    /** last name of the user */
    bio?: Maybe<Scalars["String"]>
    /** email of the user */
    email: Scalars["String"]
    /** first name of the user */
    firstName: Scalars["String"]
    /** last name of the user */
    lastName: Scalars["String"]
    /** password of the user */
    password: Scalars["String"]
    /** phone of the user */
    phone: Scalars["String"]
}

export type File = {
    __typename?: "File"
    _id: Scalars["ID"]
    /** User creation date  */
    created_at: Scalars["DateTime"]
    /** Key of the file  */
    key: Scalars["String"]
    /** Group messages */
    place: PlaceType
    /** Type of the file  */
    type: Scalars["String"]
    /** URL of the file  */
    url: Scalars["String"]
}

export type Group = {
    __typename?: "Group"
    _id: Scalars["ID"]
    /** User creation date  */
    created_at: Scalars["DateTime"]
    /** User description  */
    description?: Maybe<Scalars["String"]>
    /** Group name  */
    group_name: Scalars["String"]
    /** Group members */
    members: Array<User>
    /** Group messages */
    messages: Array<Message>
    /** Group polls */
    polls: Array<Poll>
}

export type LoggedUserOutput = {
    __typename?: "LoggedUserOutput"
    /** Generated access_token of the user */
    access_token: Scalars["String"]
}

export type LoginUserInput = {
    /** email of the user */
    email: Scalars["String"]
    /** password of the user */
    password: Scalars["String"]
}

export type Message = {
    __typename?: "Message"
    _id: Scalars["ID"]
    /** Message creation date  */
    created_at: Scalars["DateTime"]
    /** Uploaded files of the message */
    files: Array<File>
    /** User receiver */
    receiver: ReceiverType
    /** User sender */
    sender: User
    /** Text of the message */
    text: Scalars["String"]
    /** Message update date  */
    updated_at: Scalars["DateTime"]
}

export type Mutation = {
    __typename?: "Mutation"
    addUserToAdminPool: Channel
    addUserToChannel: Channel
    addUserToGroup: Group
    banUserFromChannel: Channel
    createChannel: Channel
    createChat: Chat
    createGroup: Group
    createPoll: Group
    createPost: Post
    deleteMessageById: Message
    loginUser: LoggedUserOutput
    registerUser: User
    removeUserFromGroup: Group
    removeVoteFromPoll: PollOption
    sendCommentToPost: Post
    sendMessageToChat: Chat
    sendMessageToGroup: Group
    updateMessageById: Message
    votePoll: PollOption
}

export type MutationAddUserToAdminPoolArgs = {
    input: AddUserToChannelInput
}

export type MutationAddUserToChannelArgs = {
    addUserToChannelInput: AddUserToChannelInput
}

export type MutationAddUserToGroupArgs = {
    addUserToGroupInput: AddUserToGroupInput
}

export type MutationBanUserFromChannelArgs = {
    input: BanUserFromChannelInput
}

export type MutationCreateChannelArgs = {
    createChannelInput: CreateChannelInput
}

export type MutationCreateChatArgs = {
    createChatInput: CreateChatInput
}

export type MutationCreateGroupArgs = {
    createGroupInput: CreateGroupInput
}

export type MutationCreatePollArgs = {
    input: CreatePollInput
}

export type MutationCreatePostArgs = {
    input: CreatePostInput
}

export type MutationDeleteMessageByIdArgs = {
    id: Scalars["String"]
}

export type MutationLoginUserArgs = {
    loginUserInput: LoginUserInput
}

export type MutationRegisterUserArgs = {
    registerUserInput: CreateUserInput
}

export type MutationRemoveUserFromGroupArgs = {
    removeUserFromGroup: AddUserToGroupInput
}

export type MutationRemoveVoteFromPollArgs = {
    id: Scalars["String"]
}

export type MutationSendCommentToPostArgs = {
    input: CreateMessageInput
}

export type MutationSendMessageToChatArgs = {
    createMessageInput: CreateMessageInput
}

export type MutationSendMessageToGroupArgs = {
    input: CreateMessageInput
}

export type MutationUpdateMessageByIdArgs = {
    updateMessageByIdInput: UpdateMessageInput
}

export type MutationVotePollArgs = {
    id: Scalars["String"]
}

export type PlaceType = Channel | Group | Message | Post | User

export type Poll = {
    __typename?: "Poll"
    _id: Scalars["ID"]
    /** Message creation date  */
    created_at: Scalars["DateTime"]
    /** Poll options */
    options: Array<PollOption>
    /** Question of the poll */
    question: Scalars["String"]
    /** Poll receiver */
    receiver: PollReceiverType
    /** Message update date  */
    updated_at: Scalars["DateTime"]
}

export type PollOption = {
    __typename?: "PollOption"
    _id: Scalars["ID"]
    /** Message creation date  */
    created_at: Scalars["DateTime"]
    /** User sender */
    poll: Poll
    /** Question of the poll */
    text: Scalars["String"]
    /** Message update date  */
    updated_at: Scalars["DateTime"]
    /** Option votes */
    votes: Array<User>
}

export type PollReceiverType = Channel | Group

export type Post = {
    __typename?: "Post"
    _id: Scalars["ID"]
    /** Channel for the post */
    channel: Channel
    /** Post comments */
    comments: Array<Message>
    /** Post creation date  */
    created_at: Scalars["DateTime"]
    /** Text of the post */
    text: Scalars["String"]
    /** Post update date  */
    updated_at: Scalars["DateTime"]
}

export type Query = {
    __typename?: "Query"
    getAllChannelsByPartialName: Channel
    getChannelById: Channel
    getChannelByName: Channel
    getGroupById: Group
    getUserByEmail: User
    getUserById: User
    getUserByPhone: User
}

export type QueryGetAllChannelsByPartialNameArgs = {
    query: Scalars["String"]
}

export type QueryGetChannelByIdArgs = {
    id: Scalars["String"]
}

export type QueryGetChannelByNameArgs = {
    name: Scalars["String"]
}

export type QueryGetGroupByIdArgs = {
    id: Scalars["String"]
}

export type QueryGetUserByEmailArgs = {
    email: Scalars["String"]
}

export type QueryGetUserByPhoneArgs = {
    phone: Scalars["String"]
}

export type ReceiverType = Chat | Group | Post

export type UpdateMessageInput = {
    /** Id of the message */
    message_id: Scalars["String"]
    /** Text of the message */
    text: Scalars["String"]
}

export type User = {
    __typename?: Scalars["String"]
    _id: Scalars["ID"]
    /** User biography  */
    bio: Scalars["String"]
    /** User channels */
    channels: Array<Channel>
    /** User chats */
    chats: Array<Chat>
    /** User creation date  */
    created_at: Scalars["DateTime"]
    /** User email  */
    email: Scalars["String"]
    /** User firstName  */
    firstName: Scalars["String"]
    /** User groups */
    groups: Array<Group>
    /** User lastName  */
    lastName: Scalars["String"]
    /** User phone  */
    phone: Scalars["String"]
    /** User nickname  */
    username: Scalars["String"]
}