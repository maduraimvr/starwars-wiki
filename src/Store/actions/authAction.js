import * as actionTypes from './actionTypes';
import axios from 'axios'
import { isNullOrUndefined } from 'util';

export const authStart=()=>{
    return{
        type:actionTypes.AUTH_START
    }
}

export const authSuccess=(token,id,profile)=>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        idToken:token,
        userId:id,
        profileData:profile
    }
}

export const authFail=(error)=>{
    return{
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}
export const authLogout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('profileData');
    return {
        type:actionTypes.AUTH_LOGOUT
    }
}
export const checkAuthTimeOut=(expiresTime)=>{
    return dispatch=>{
        setTimeout(()=>dispatch(authLogout()),expiresTime *1000)
    }
}
export const auth=(email,password)=>{
    return dispatch=>{
        dispatch(authStart());
    const fullUrl = 'https://swapi.co/api/people/?search='+email;
       let url=fullUrl;
       let errorMsg;
        axios.get(url)
        .then(res=>{
            const count = isNullOrUndefined(res.data.count)? 0:res.data.count;
            if(count>0){
                if(res.data.results[0].birth_year===password){
                res.data={
                    ...res.data,
                    expiresIn:1200,
                    authToken:true
                }; 
            
            const expirationDate= new Date(new Date().getTime() + res.data.expiresIn *1000);
            localStorage.setItem('token', res.data.authToken);
            localStorage.setItem('userId', res.data.results[0].name); 
            localStorage.setItem('expirationDate',expirationDate);
            localStorage.setItem('profileData',JSON.stringify(res.data.results[0])); 
            dispatch(authSuccess(res.data.authToken,  res.data.results[0].name,res.data.results[0]));
            dispatch(checkAuthTimeOut(res.data.expiresIn));}
            else{
                errorMsg ='Entered username and password did not match';
                dispatch(authFail(errorMsg));
              }
            }else{
                errorMsg= 'user not found';
              dispatch(authFail(errorMsg));
            }
        })
        .catch(
            error=>{
                dispatch(authFail(error.message));
            }
        )
         
    }
}
export const authCheckStatus= ()=>{
    const token=  localStorage.getItem('token');
    const userId=localStorage.getItem('userId');
    const profileData=JSON.parse(localStorage.getItem('profileData')); 
    const expireTime=new Date(localStorage.getItem('expirationDate'));   
    return dispatch=>{
        if(!token){
            dispatch(authLogout());
        }
        else{
            if(expireTime <= new Date()){
                dispatch(authLogout());
            }
            else{
                dispatch(authSuccess(token, userId,profileData));
                dispatch(checkAuthTimeOut((expireTime.getTime() - new Date().getTime()) /1000));
            }
        }
    }
}