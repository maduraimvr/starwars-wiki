import classes from './Auth.css';
import React,{Component} from 'react';
import Input from '../../components/BasicUI/Input/Input';
import Button from '../../components/BasicUI/Button/Button';
import * as actionTypes from '../../Store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/BasicUI/spinner/spinner';
import {Redirect} from 'react-router-dom'


class Auth extends  Component{
    state={
        controls:{
            email:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Enter your username'
                },
                value:'',
                validation:{
                        required:true                 
                },
                valid:false,
                touched:false
            },
            password:{
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'Enter your password'
                },
                value:'',
                validation:{
                        required:true                
                },
                valid:false,
                touched:false
            }
        }
    }

    checkValidity=(value, rules)=>{
        let isValid=true;
        
        if(!rules){
            return true;
        }
        if(rules.required){
            isValid= value.trim() !== "" && isValid
        }
        return isValid;
    }

    submitHandler=(e)=>{
        e.preventDefault();
        if(this.state.controls.email.valid && this.state.controls.password.valid) {
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value);
        }
    }
    inputChangedHandler=(event, inputIdentifier)=>{
        const updatedAuthForm={
            ...this.state.controls
        }
        const AuthformElements={
            ...this.state.controls[inputIdentifier]
        }
        AuthformElements.value= event.target.value;
        AuthformElements.touched= true;
        AuthformElements.valid= this.checkValidity(AuthformElements.value, AuthformElements.validation);
        updatedAuthForm[inputIdentifier]= AuthformElements;

        this.setState({
            controls:updatedAuthForm
        })
    }

    render(){
   
        let formElementsArray=[];
        for(let key in this.state.controls){
            formElementsArray.push({
                id:key,
                config:this.state.controls[key]
            })
        }
        let errorMessage= null;
        if(this.props.error){
            errorMessage=<p style={{color:'red',fontWeight:'bold'}}>{this.props.error}</p>
        }
        let form=( <form >
            {errorMessage}
            
            { formElementsArray.map((formElement)=>{
            return  <Input  key ={formElement.id} elementType={formElement.config.elementType} 
            elementConfig={formElement.config.elementConfig} 
            value={formElement.config.value} 
            changed={(event)=>this.inputChangedHandler(event,formElement.id)}
            Invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            isTouched={formElement.config.touched}/>
            })}
            <Button btnType="Success" clicked={(e)=>this.submitHandler(e)}>Submit</Button>
                
        </form>);
            if(this.props.loading){
                form=<Spinner/>
            }
           

           
            let authenticatedUser= null;
            if(this.props.isAuthenticated){
                authenticatedUser=<Redirect to="/searchPlanet"/>
            }
        return(
            <div>
            <div className={[classes["header"]].join(' ')}>
            <img src="https://miukimiu.github.io/star-wars-random-quotes/images/Star_Wars_Logo.svg" className="header__logo" alt="logo.svg"/>
             </div>
              {authenticatedUser}
                {form}
               </div>
        )
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        onAuth:(email,password)=> dispatch(actionTypes.auth(email,password))
    }
}
const mapStateToProps=(state)=>{
    return{
        loading:state.auth.loading,
        error:state.auth.error,
        searchProfile: state.auth.profileData,
        isAuthenticated: state.auth.token !== null
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth);