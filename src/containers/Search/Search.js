import React, {Component} from 'react';
import * as actionTypes from '../../Store/actions/index';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import classes from './Search.css';
import Planet from '../../components/Planet/planet';
import Planetdescription from '../../components/planetDescription/planetDescription'

const adminUser='Luke Skywalker';
export class SearchPlanet extends Component{
  state={
      suggestions: null,
      planetObject:{},
      inputValue:'',
      optionVisibility: false,
      TimeOut:60,
      Retry:15,
      isAdmin:false
  }

StartTimer(){
   setInterval(()=> {
    if(this.state.TimeOut === 0){
        this.setState({
            TimeOut: 60,
            Retry:15
        })
    }else{
        this.setState({
            TimeOut: this.state.TimeOut - 1
        })
    }
    }, 1000)
}


    componentDidMount(){
         this.props.planets();
         this.StartTimer();   
         if(this.props.userId===adminUser)
         { this.setState({isAdmin:true})};   
    }

    onOptionClickHandler=(url, val)=>{
        this.setState({
            inputValue:val,
            optionVisibility:false
        })
        this.props.optionClickHandler(url);
    }

    inputHandler = (e)=>{
        if(this.state.Retry >0 || this.state.isAdmin){
        let options=null,
            planetObj={};
            this.setState({
                inputValue: e.target.value,
                optionVisibility: e.target.value.length > 0,
                Retry:this.state.Retry-1
            });
            this.props.planets(e.target.value);
           
        if(!this.props.loading1){
            options=this.props.planetOption.data.results;
           let filterList= options.filter(entry=>(entry.population!=="unknown"))
            .sort((initial,second)=>parseInt(initial.population)-parseInt(second.population));
            let unknownList=options.filter(entry=>(entry.population==="unknown"));
            let dataList=[...unknownList,...filterList];
            for (var i=0; i<dataList.length; i++) {
                planetObj[dataList[i].name] = dataList[i].url;
              }
            
            const suggestionNames= Object.keys(planetObj).map(name=>{
                  return name
              })
            this.setState({
                planetObject:{...suggestionNames},
                suggestions:{...planetObj},

            })    
        }   
    }      
    }
    render(){
        let  people, peopleData= null;
            peopleData=  this.props.searchProfile;
            const fontColor={
                color: 'white'
            };
            people= (<div className='profileData' style={fontColor}><h1>Welcome {peopleData.name}</h1>
                    <h3>Your Profile details:</h3>
                    <ul className={classes.profileDetails}>
                        <li>Birth Year: {peopleData.birth_year}</li>
                        <li>Gender: {peopleData.gender}</li>
                        <li>Height: {peopleData.height}</li>
                    </ul>
                    </div>)
        let errorMessage= null;
        if(this.props.error){
            errorMessage=<p style={{color:'red',fontWeight:'bold'}}>{this.props.error.message}</p>
        }
        let warningMessage=null;
        if(this.state.Retry===0){
        warningMessage=<p style={{color:'orange'}}>Warning! you have been restricted to search. until {this.state.TimeOut} seconds...</p>
        }
        let authenticatedUser= null;
        if(!this.props.isAuthenticated){
            authenticatedUser=<Redirect to="/"/>
        }

        let suggestedOptions= null;
        if(this.state.planetObject){
            suggestedOptions=  Object.keys(this.state.planetObject).map((plnOpt,index)=>{
                   return <Planet key={plnOpt}  click={()=>this.onOptionClickHandler(this.state.suggestions[this.state.planetObject[plnOpt]], this.state.planetObject[plnOpt])}
                   planetval={this.state.planetObject[plnOpt]} index={index}/>
                   
               })    
        }
        return(
            <div className={classes.SearchPage}>
                {people}
                {warningMessage}
                {errorMessage}
                {authenticatedUser}
                <div className={classes.SearchBox}>
                <input type="text" placeholder="Enter some keyword"
                 onChange={this.inputHandler} value={this.state.inputValue}/>
                 {this.state.optionVisibility ? <ul>{suggestedOptions}</ul> : null}
                </div>
                {!this.props.planetinfoStart ?<Planetdescription planetInfo = {this.props.planetInfo.data}/> :null}
                
            </div>
            
        ) 
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        planets:(param)=>dispatch(actionTypes.planets(param)),
        optionClickHandler: (url)=> dispatch(actionTypes.planetInfo(url))
    }
}
const mapStateToProps=(state)=>{
    return{
        loading:state.sp.loading,
        loading1:state.sp.loading1,
        error:state.sp.error,
        searchProfile: state.auth.profileData,
        planetOption: state.sp.planetOption,
        isAuthenticated: state.auth.token !== null,
        planetInfo: state.sp.planetInfo,
        userId:state.auth.userId,
        planetinfoStart: state.sp.planetinfoStart
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchPlanet);