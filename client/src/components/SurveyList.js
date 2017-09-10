import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';


class SurveyList extends Component {

    componentDidMount(){
        this.props.fetchSurvey();

    }

    renderSurveyList(){
        return (
            this.props.surveys.reverse().map((survey)=>{
                return (
                   <div className="card" key={survey._id}>
                       <div className="card-content">
                          <span className="card-title">{survey.title}</span>
                          <p>{survey.body}</p>
                          <p className="right">Sent on: {new Date(survey.dateSent).toLocaleDateString()}</p>
                       </div>
                       <div className="card-action">
                          <a>Yes: {survey.yes}</a>
                          <a>No: {survey.no}</a>
                      </div>
                   </div>

                );
            })

        );


    }


    render(){
      return  (
        <div>{this.renderSurveyList()}</div>
      )
    }
}

function mapPropsToState({surveys}){
    return {surveys};


}

export default connect(mapPropsToState, actions)(SurveyList);