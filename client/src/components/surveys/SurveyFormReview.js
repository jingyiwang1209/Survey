import React from 'react';
import { connect } from 'react-redux';
import FIELDS from './formFields';
import * as actions from '../../actions';
import { withRouter } from 'react-router';



const SurveyReview = ({onCancel, formValues, submitSurvey, history}) => {

    const renderFields =()=> {
       return FIELDS.map((field) => {
          return (<div key={field.name}><label>{field.label}:</label> {formValues[field.name]}</div>);

        });

    }


    return (
        <div>
         <h5>Please confirm your entries:</h5>
         <div>
         {renderFields()}
         </div>
         <button className='yellow darken-3 btn-flat white-text' onClick={onCancel}>Cancel</button>
         <button className='green btn-flat right white-text' onClick={()=> submitSurvey(formValues, history)}>Send Survey<i className='material-icons right'>email</i></button>
        </div>

    );
};


function mapStateToProps(state){
    // console.log(state.form.surveyForm.values);
    return {
         formValues:state.form.surveyForm.values
    }


}

export default connect(mapStateToProps, actions)(withRouter(SurveyReview));