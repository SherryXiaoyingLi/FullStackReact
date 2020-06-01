import React from 'react';
import {Link} from 'react-router-dom';
import SurveyList from './surveys/SurveyList';

// below <i> to use all icons available at materialize.css; replace the words with provided words
// ** (not self included in materilize.css module, need include link at /public/index.html)
const Dashboard = () => {
    return (
        <div>
            <SurveyList />
            <div className="fixed-action-btn">
                <Link to="/surveys/new" className="btn-floating btn-large red">
                    <i className="material-icons"> add </i>
                 </Link>   
            </div>
        </div>
    );
};
export default Dashboard;