import * as actionTypes from './actionTypes';
import axios from 'axios'

export const planetOptionStart=()=>{
    return {
        type:actionTypes.PLANET_OPTION_START
    }
}
export const planetOptionSuccess=(res)=>{
    return {
        type:actionTypes.PLANET_OPTION_SUCCESS,
        response:res
    }
}
export const planetOptionFail=(error)=>{
    return{
        type:actionTypes.PLANET_OPTION_FAIL,
        error:error
    }
}
export const planets=()=>{
    return dispatch=>{
        dispatch(planetOptionStart());

        axios.get('https://swapi.co/api/planets/')
        .then((res)=>{
            dispatch(planetOptionSuccess(res))
        })
        .catch((err)=>{
            dispatch(planetOptionFail(err));
        })
    }
}

export const planetinfoStart=()=>{
    return{
        type:actionTypes.PLANET_INFO_START
    }
}
export const planetinfoSuccess=(res)=>{
    return {
        type: actionTypes.PLANET_INFO_SUCCESS,
        response:res
    }
}
export const planetinfoFail=(err)=>{
    return{
        type: actionTypes.PLANET_OPTION_FAIL,
        error:err
    }
}

export const planetInfo=(url)=>{
    const planetUrl= url;
    if(planetUrl){
        return dispatch=>{
            dispatch(planetinfoStart());
            axios.get(url)
            .then((res)=>{
                dispatch(planetinfoSuccess(res))
            })
            .catch((err)=>{
                dispatch(planetinfoFail(err));
            })
        }
    }
    
}