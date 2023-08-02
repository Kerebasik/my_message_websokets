import {createSlice} from "@reduxjs/toolkit";
import {User} from '../../types/graphql'

type InitialUserState = {
    user:User | undefined;
}

const initialState:InitialUserState={
    user:undefined
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{

    }
})

export default userSlice.reducer