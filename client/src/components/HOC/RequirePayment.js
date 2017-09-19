import React, { Component } from "react";
import { connect } from "react-redux";

export default ComposedComponent => {
    class PaymentVerification extends Component {
        static contextTypes = {
            router: React.PropTypes.object
        };

        componentWillMount() {
            if (!this.props.auth || this.props.auth.credits < 1) {
                this.context.router.history.push("/");
            }
        }

        render() {
            return <ComposedComponent {...this.props} />;
        }
    }

    function mapPropsToState({ auth }) {
        return { auth };
    }

    return connect(mapPropsToState)(PaymentVerification);
};