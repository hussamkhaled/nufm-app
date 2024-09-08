import React, { Component } from 'react';
import { View, Text } from 'react-native';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  componentDidCatch(error, errorInfo) {
    // Update state with the error and errorInfo
    this.setState({ hasError: true, error: error });
    // You can also log the error to an error reporting service
    console.error('Error caught by error boundary:', error, errorInfo);
  }

  render() {
    // If there's an error, render a fallback UI
    if (this.state.hasError) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>An error occurred: {this.state.error.toString()}</Text>
        </View>
      );
    }
    // Otherwise, render the children as normal
    return this.props.children;
  }
}

export default ErrorBoundary;
