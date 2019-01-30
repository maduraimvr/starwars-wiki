import * as actionTypes from '../actions/actionTypes'

const initialState={
    loading: true,
    searchProfile: null,
    error:null,
    loading1: true,
    planetInfo:null,
    planetinfoStart:true,
    planetOption:null
}
const searchReducer=(state= initialState, action)=>{

    switch(action.type){
        case actionTypes.SEARCH_PROFILE_START:
        return {
            ...state,
            loading:true
        }
        case actionTypes.SEARCH_PROFILE_SUCCESS:
        return {
            ...state,
            searchProfile: action.response,
            loading:false
        }
        case actionTypes.SEARCH_PROFILE_FAIL:
        return{
            ...state,
            error: action.err,
            loading:false
        }
        case actionTypes.PLANET_OPTION_START:
        return{
            ...state,
            loading1:true
        }
        case actionTypes.PLANET_OPTION_SUCCESS:
        return{
            ...state,
            loading1:false,
            planetOption: action.response
        }
        case actionTypes.PLANET_OPTION_FAIL:
        return{
            ...state,
            loading1:false,
            error: action.error
        }
        case actionTypes.PLANET_INFO_START:
        return{
            ...state,
            planetinfoStart:true
        }
        case actionTypes.PLANET_INFO_SUCCESS:
        return{
            ...state,
            planetInfo: action.response,
            planetinfoStart:false
        }
        case actionTypes.PLANET_INFO_FAIL:
        return{
            ...state,
            error: action.error,
            planetinfoStart:false
        }
        default :
        return{
            ...state 
        }

    }
}
export default searchReducer;