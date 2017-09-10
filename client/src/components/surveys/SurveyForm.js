import React, { Component } from "react";
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import { Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';

import FIELDS from './formFields';

class SurveyForm extends Component {

    renderFields(){
        return FIELDS.map(({label,name}) =>
            <Field key={name} name={name} type='text' component={SurveyField} label={label} />
        )
    }


    render(){
        return(
            <div>
              <form onSubmit={this.props.handleSubmit(this.props.onSubmitForm)}>
                {this.renderFields()}
                <Link className='white-text red btn-flat' to='/surveys'> Cancel </Link>
                <button type='submit' className='white-text teal btn-flat right'> Next <i className="material-icons right">navigate_next</i></button>
              </form>
            </div>
        );
    }
}


// value:{title:'123'}
//!!! Be careful when to use [] and when to use .!!!
// const values = {title:'123', name:'ji'}
// values.title: "123"
// values[title]: VM250:1 Uncaught ReferenceError: title is not defined
// values['title']: "123"
const validate = values => {
  const errors={};
// here we can use values.emails or values['emails']
  errors.recipients=validateEmails(values.recipients||'');
// {name}:field.name: here field.name has '', so we use values[name and errors[name]]
  FIELDS.forEach(({name})=>{
    if(!values[name]){
        errors[name]='Please provide a value';
        console.log('errors',errors)
    }
  })

  return errors
}


export default reduxForm({
    form:'surveyForm',
    destroyOnUnmount: false,
    validate
})(SurveyForm);