import {createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState:{
        dbUser : null,
        isFetching: false,
        error: false
    },
    reducers:{
       loadingStart:(state) => {
        state.isFetching=true
       },
       loadingSuccess:(state,action) => {
        state.isFetching=false;
        state.dbUser=action.payload
       },
       loadingFailure:(state) => {
        state.isFetching = false;
        state.error = true;
       },
    }
})

export const {loadingStart, loadingSuccess, loadingFailure} = userSlice.actions
export default userSlice.reducer