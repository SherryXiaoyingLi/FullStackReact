import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
// let you interact w/ env using browser dom; exist other types react-router
// BrowserRouter: look at current url and change component at a given time; expect only one child component
// Route: set up the pairing rule between address/path in app and component

// following shows syntax to write a functional component (except Header, an imported class component)
import Header from './Header';
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;
const Landing = () => <h2>Landing</h2>;

const App = () => {
    return (
        // div here for css only
        <div> 
            <BrowserRouter>
                <div>
                    <Header />
                    <Route exact path = "/" component = {Landing}/> 
                    <Route exact path = "/surveys" component = {Dashboard}/>
                    <Route path = "/surveys/new" component = {SurveyNew}/>
                </div>
            </BrowserRouter>
        </div>
        
    );
};
// notice <BrowserRouter> takes one child component <div> here
// <Header /> a functional component, to make it visible all time, just don't specify a route with <Route> for this component
// path = '/' is root route
// ** react-router compares current address to all <Route>, if matches multiple, e.g. '/' and '/surveys' will render both components, so need exact = {true} or just pass in prop exact

export default App;