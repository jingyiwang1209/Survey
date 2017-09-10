import React, { Component } from "react";
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';
import {reduxForm} from 'redux-form';

class SurveyNew extends Component {
    constructor(props){
        super(props);
        this.state = {showReview: false};
    }

    renderContent(){
        if(this.state.showReview === false){
            return <SurveyForm onSubmitForm={()=>this.setState({showReview:true})} />
        }

       return <SurveyFormReview onCancel={()=>this.setState({showReview:false})}/>
    }


    render(){

        return(
            <div>
               {this.renderContent()}
            </div>
        );
    }
}

// So when SurveyNew component is unmounted, redux will destroy the SurveyForm.
// By default destoyOnUnmount: true
export default reduxForm({
    form:'surveyForm'
})(SurveyNew);