import React from 'react';
import AppContext from '../appContext';
import { Component } from 'react';
import { connect } from 'react-redux';
import { matchRoutes } from 'react-router-config';
import { withRouter } from 'react-router-dom';
import {Utils} from '../utils'
class Authorization extends Component {
    constructor(props, context) {
        super(props);
        const { routes } = context;
        this.state = {
            accessGranted: true,
            routes,
        };
        // this.hasPermission = this.hasPermission.bind(this)
    }

    componentDidMount() {
        if (!this.state.accessGranted) {
            this.redirectRoute();
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.accessGranted !== this.state.accessGranted;
    }

    componentDidUpdate() {
        if (!this.state.accessGranted) {
            this.redirectRoute();
        }
    }

    static getDerivedStateFromProps(props, state) {
        const { location, userData, routes } = props;
        const { pathname } = location;

        const matched = routes ? matchRoutes(routes, pathname)[0] : false;
        // if (matched && userData) {
            console.info('custom1:', matched.route);
            console.info('custom2:', userData ? userData.role: '');
        //     let b = this.hasPermission(matched.route.auth, userData.role);
        // }
        return {
            accessGranted: matched ? Utils.hasPermission(matched.route.auth, userData ? userData.role : 'guest' ) : true,
        };
    }
    redirectRoute() {
        const { location, userData, history } = this.props;
        const { pathname, state } = location;
        const redirectUrl = state && state.redirectUrl ? state.redirectUrl : '/';
        if (!userData.role || userData.role.length === 0) {
            history.push({
                pathname: '/sportsbetting',
                state: { redirectUrl: pathname },
            });
        } else {
            history.push({
                pathname: redirectUrl,
            });
        }
    }

    render() {
        console.info('Fuse Authorization rendered', this.state.accessGranted);
        return this.state.accessGranted ? <>{this.props.children}</> : null;
    }
}

function mapStateToProps({ authReducers }) {
    return {
        userData: authReducers.authReducer.user,
    };
}

Authorization.contextType = AppContext;

export default withRouter(connect(mapStateToProps)(Authorization));
