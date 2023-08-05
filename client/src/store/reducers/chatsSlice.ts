import {createSlice} from "@reduxjs/toolkit";
import {Chat} from "../../types/graphql";

type InitialChatState ={
    chat:Array<Chat>
}

const initialState:InitialChatState = {
    chat:[],
}

const chatsSlice = createSlice({
    name:'chats',
    initialState,
    reducers:{

    }
})

export default chatsSlice.reducer