import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
    renderContent(){
        switch(this.props.auth) {
            case null:
                return;
            case false:
                return <li><a href="/auth/google">Login With Google</a></li>;
                    // *notice the syntax here*
            default:
                // since what's returned will get wrapped in a <ul>
                // return not a <ul> or <div> of things but array (need key)
                return [
                <li key="1"><Payments /></li>,
                <li key="3" style={{margin: '0 10px'}}> 
                    Credits: {this.props.auth.credits}
                </li>,
                <li key="2"><a href="/api/logout">Logout</a></li>
                ];
                // the margin style above top bottom 0 px, left right 10 px
        }
    }

    render(){
        // console.log(this.props); // console log this.props equivalent to current state.props, will include props set in combineReducers since mapToState on Header component
        return (
        <nav>
            <div className ="nav-wrapper">
              <Link 
                to={this.props.auth ? '/surveys' : '/'} 
                className ="left brand-logo"
                >
                    Emaily
              </Link>
              <ul className ="right">
                {this.renderContent()}
             </ul>
            </div>
        </nav>
        );
    }
}
// class component 

// function gets called with entire state out of redux store
// return obj that will be passed to Header component as a prop (1st arg of connect), i.e. map set state to component as a prop so can use this.props.auth
// since combineReducers have authReducer assigned to auth, the entire redux store's state will have a prop called 'auth'
function mapStateToProps(state) {
    return {auth: state.auth};
}

// or just write below, equivalent to above
// function mapStateToProps({auth}) {
//     return {auth};
// }


export default connect(mapStateToProps)(Header);