import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility'

const initialState={
    error:null,
    token:null,
    userId:null,
    loading:false,
    profileData:null

}
const authSuccess=(state, action)=>{
    return updateObject(state,
        {
        token:action.idToken,
        userId:action.userId,
         error:null,
        loading:false,
        profileData:action.profileData
    })
}
const authFail=(state,action)=>{
    return updateObject(state, {
        error:action.error,
        loading:false
    })
}
const authLogout=(state)=>{
    return updateObject(state, {token:null, userId: null, profileData:null});
}
const authReducer=(state=initialState, action)=>{
    switch(action.type){
        case actionTypes.AUTH_START:return updateObject(state,{error:null,loading:true });
        case actionTypes.AUTH_SUCCESS:return authSuccess(state, action);
        case actionTypes.AUTH_FAIL:return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state);
        default: return state;
    }
}
export default authReducer ;