import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import dog from "../images/dog.png";

class Landing extends Component {
    renderContent = () => {
        if (this.props.auth) {
            return (
                <Link
                    to="/surveys"
                    className="brand-logo"
                    style={{ fontSize: "2rem" }}
                >
                    Go to my survey dashboard
                </Link>
            );
        } else {
            return (
                <p style={{ fontSize: "2rem" }}>
                    We collect feedback from your customers
                </p>
            );
        }
    };

    render() {
        return (
            <div style={{ textAlign: "center" }}>
                <div>
                    <img
                        src={dog}
                        className="dog"
                        style={{ maxWidth: "100%" }}
                    />
                </div>
                {this.renderContent()}
            </div>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Landing);