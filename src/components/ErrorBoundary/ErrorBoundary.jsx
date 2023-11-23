import React, { Component } from 'react';
import StatusPage from '../../pages/StatusPage/StatusPage';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
        };
    }

    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error,
        };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by error boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <StatusPage title="Something went wrong" text="An error occurred in the application." />;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
