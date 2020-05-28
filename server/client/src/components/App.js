import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
// let you interact w/ env using browser dom; exist other types react-router
// BrowserRouter: look at current url and change component at a given time; expect only one child component
// Route: set up the pairing rule between address/path in app and component
import {connect } from 'react-redux';
// give certain component the ability to call action creators
import * as actions from '../actions';
// way to take all the action defined and put them into actions

// following shows syntax to write a functional component (not Header, an imported class component)
import Header from './Header';
import Landing from './Landing';

const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;


// const App = () => {
//     return (
//         // div here for css only, the "contianer" className is for leaving space left and right
//         // on frontend, need to specify for material.css at root div of application
//         <div className="container"> 
//             <BrowserRouter>
//                 <div>
//                     <Header />
//                     <Route exact path = "/" component = {Landing}/> 
//                     <Route exact path = "/surveys" component = {Dashboard}/>
//                     <Route path = "/surveys/new" component = {SurveyNew}/>
//                 </div>
//             </BrowserRouter>
//         </div>
        
//     );
// };

// notice <BrowserRouter> takes one child component <div> here
// <Header /> a functional component, to make it visible all time, just don't specify a route with <Route> for this component
// path = '/' is root route
// ** react-router compares current address to all <Route>, if matches multiple, e.g. '/' and '/surveys' will render both components, so need exact = {true} or just pass in prop exact

// refactor below b/c want to add support function to a class based component
class App extends Component {
    componentDidMount(){
        this.props.fetchUser();
    }
    // ** instance of component *has* rendered, go to fetch user check if logged in 
    // ( automatically call action creators when the app boots up)
    // preferred location for initial ajax request instead of before component rendered (componentWillMount)
    // time different b/w this and componentWillMount is none, and componentWillMount may get called multiple times

    render(){
    // div here for css only, the "contianer" className is for leaving space left and right
    // on frontend, need to specify for material.css at root div of application
    return (

        <div className="container"> 
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
    }
};
export default connect(null, actions)(App);
// 1st arg: mapToState arg
// 2nd arg: all the actions we want to wire up with the component App
// all the actions are passed to component App as a prop