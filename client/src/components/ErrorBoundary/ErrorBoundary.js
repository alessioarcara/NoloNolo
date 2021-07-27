import { Component } from "react";
import Modal from "../UI/Modal/Modal";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false }
    }

    componentDidCatch(error, errorInfo) {
        this.state({ hasError: true })
    }

    render() {
        if (this.state.hasError) {
            return <Modal title="Error">Something went wrong!</Modal>
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
