// here we use es6 modole instead of commonjs module because we will use webpack and babel, while for backend we can only use commonjs module.
import React, {Component} from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Dashboard from './Dashboard';
import Landing from './Landing';
import SurveyNew from './surveys/SurveyNew';
import RequireAuth from './HOC/RequireAuth';
import RequirePayment from './HOC/RequirePayment';

class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route exact path="/surveys" component={RequireAuth(Dashboard)} />
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/surveys/new" component={RequirePayment(SurveyNew)} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default connect(null, actions)(App);