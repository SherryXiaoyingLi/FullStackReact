// Stripe billing wrapper
import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
    render() {
        //debugger; // **way to add breakpoints

        // amount - default US cents (5 dollars)
        // token - call back func, called with token received Stripe api (onToken make more sense)
                // this (Payments component) has props handleToken (from actions) hooked using the below connect function
        // stripeKey - include this key every time communicate with stripe
        // <StripeCheckout> -  will return a Card obj with token, last four digit credit card, etc within 
        // <button> - child component if want to own styling of button; else just self closing StripeCheckout  
        return (
            <StripeCheckout
                name = "Emaily"
                description = "$5 for 5 email credits" 
                amount = {500} 
                token = {token => this.props.handleToken(token)} 
                stripeKey = {process.env.REACT_APP_STRIPE_KEY} 
                
            > 
                <button className = "btn">
                    ADD Credits
                </button>
            </StripeCheckout>
        );
    }
}

export default connect(null, actions) (Payments);