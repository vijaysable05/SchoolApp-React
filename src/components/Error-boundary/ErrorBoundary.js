import React from 'react';

import {ErrorBoundaryContainer, TitleContainer, ImgContainer} from './ErrorBoundaryStyles.js';

import img from './broke.png'


class ErrorBoundary extends React.Component {
	constructor() {
		super()
		this.state = {
			hasError: false
		}
	}

	static getDerivedStateFromError(error) {
		// process the error
		return { hasError: true }
	}

	componentDidCatch(error, info) {
		console.log(error)
	}

	render() {
		if(this.state.hasError){
		return (
			<ErrorBoundaryContainer>
			<TitleContainer> <span>Something went Wrong!</span> <span>Please try again later. . .</span></TitleContainer>
			<ImgContainer>
				<img src={img} alt="img"/>
			</ImgContainer>
			</ErrorBoundaryContainer>
			)
		}
		return this.props.children
	}
}



export default ErrorBoundary;