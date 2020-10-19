import styled from 'styled-components';

export const ErrorBoundaryContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
	width: 100%;
	background: #1565C0; 
`

export const TitleContainer = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	height: 20%;
	width: 100%;
	color: white;

	span {
		font-size: 2em;
	}
`

export const ImgContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 80%;
	width: 100%;
	padding: 2%;

	img {
		height: 90%;
		width: 40%;
	}
`