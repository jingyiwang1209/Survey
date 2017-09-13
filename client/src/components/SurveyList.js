import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import _ from "lodash";

class SurveyList extends Component {
  renderSurveyList() {
    const sortedArray = _.orderBy(
      this.props.surveys,
      this.props.by,
      this.props.rule
    );

    return sortedArray.map(survey => {
      if (survey.title.indexOf(this.props.term) === -1) {
        return;
      }

      return (
        <div className="card" key={survey._id}>
          <span
            className="btn-flat red right"
            onClick={() => this.props.deleteSurvey(survey._id)}
          >
            Delete
          </span>

          <div className="card-content">
            <span className="card-title">{survey.title}</span>
            <p>{survey.body}</p>
            <p className="right">
              Sent on: {new Date(survey.dateSent).toLocaleDateString()}
            </p>
          </div>
          <div className="card-action">
            <a>Yes: {survey.yes}</a>
            <a>No: {survey.no}</a>
            <a>Last responded: {survey.lastResponded? new Date(survey.lastResponded).toLocaleDateString(): "Not yet"}</a>
          </div>
        </div>
      );
    });
  }

  render() {
    return <div>{this.renderSurveyList()}</div>;
  }
}

function mapPropsToState({ surveys }) {
  return { surveys };
}

export default connect(mapPropsToState, actions)(SurveyList);