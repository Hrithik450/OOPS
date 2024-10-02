import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    this.state = { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log("Error occured at :", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
