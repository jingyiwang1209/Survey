import React, { Component } from "react";
import { connect } from "react-redux";

export default ComposedComponent => {
    class Authentication extends Component {
        static contextTypes = {
            router: React.PropTypes.object
        };

        componentWillMount() {
            if (!this.props.auth) {
                this.context.router.history.push("/");
            }
        }

        componentWillUpdate(nextProps) {
            if (!nextProps.auth) {
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

    return connect(mapPropsToState)(Authentication);
};