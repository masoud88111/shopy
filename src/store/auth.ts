import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store/index';
import User, { UserType } from '@/models/user';
import { KeyedMutator } from 'swr';

interface AuthState {
    loading? : boolean 
    phoneVerifyToken? : string,
    user? : UserType,
    userMutate? : KeyedMutator<UserType>
}

const initialState : AuthState = {
    loading : true,
    phoneVerifyToken : undefined,
    user : undefined,
    userMutate: undefined
}

export const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        updatePhoneVerifyToken: (state , action : PayloadAction<string|undefined>) => {
            state.phoneVerifyToken = action.payload;
        },
        updateUser : (state , action : PayloadAction<UserType>) => {
            state.user = action.payload
        },
        updateLoading : (state , action: PayloadAction<boolean> ) => {
            state.loading = action.payload;
        },
        setUserMutator : (state , action: PayloadAction<KeyedMutator<UserType>> ) => {
            state.userMutate = action.payload;
        },
    }
})


export const { updatePhoneVerifyToken , updateUser , updateLoading , setUserMutator} = authSlice.actions;

export const getUserMutator = (state : RootState) => state.auth.userMutate
export const selectPhoneVerifyToken = (state : RootState) => state.auth.phoneVerifyToken
export const selectUser = (state : RootState) => new User(state.auth.user)
export const selectUserLoading = (state : RootState) => state.auth.loading;

export default authSlice.reducer;