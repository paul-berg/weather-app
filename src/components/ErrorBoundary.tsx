import {Component, ErrorInfo, ReactNode} from 'react';

interface Props {
	children ?: ReactNode
}

interface State {
	hasError: boolean,
}



class ErrorBoundary extends Component<Props, State> {
	state: State = { hasError: false }  

	componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		console.error('Uncaught error:', error, errorInfo);
		console.log('err');
		
	}
	
	static getDerivedStateFromError(_: Error): State {
		console.log(_);		
		return { hasError: true }
	}
	
	render() {
			const { hasError } = this.state
			const { children } = this.props
			hasError && <div>Sorry... there was an error</div>
			return children
	}
}

export default ErrorBoundary;
