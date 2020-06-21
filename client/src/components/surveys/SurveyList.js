import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

class SurveyList extends Component {
    componentDidMount() {
        this.props.fetchSurveys();
    }

    // the following when dateSent (on backend new Date()) received by frontend is a String now
    // so create new Date() again and formate properly

    // .reverse() makes newest survey on top on frontend dashboard display
    renderSurveys(){
        return this.props.surveys.reverse().map(survey=>{
            return (
                <div className="card darken-1" key={survey._id}>
                    <div className="card-content">
                        <span className="card-title">{survey.title}</span>
                        <p>
                            {survey.body}
                        </p>
                        <p className="right">
                            Sent On: {new Date(survey.dateSent).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="card-action">
                        <a href="">Yes: {survey.yes}</a>
                        <a href="">No: {survey.no}</a>
                    </div>
                </div>
            );
        });
    }

    render () {
        return (
            <div>
                {this.renderSurveys()}
            </div>
        );
    }
}

function mapStatetoProps( { surveys } ) {
    return { surveys };
}

export default connect(mapStatetoProps, { fetchSurveys })(SurveyList);