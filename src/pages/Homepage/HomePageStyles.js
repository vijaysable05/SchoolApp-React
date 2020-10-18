import styled from 'styled-components';

export const HomePageContainer = styled.div`
	display: flex;
	flex-direction: column;
	background: #1565C0; 
	height: 100vh;
	width: 100%;
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
`

export const Title = styled.div`
	display: flex;
	justify-content: center;
	padding-left: 2%;
	padding-top: 2%;
	height: 8%;

	span {
		font-size: 2em;
		font-weight: bold;
		color: white;
	}
`

export const Content = styled.div`
	display: flex;
	flex-wrap: wrap;
	height: 18%;
	padding: 2%;

	span {
		font-size: 1.5em;
		color: white;
	}
`

export const GridContent = styled.div`
	height: 60%;
	width: 100%;
	display: grid;
	justify-content: center;
	padding: 1%;
	padding-bottom: 2%;
	grid-template-columns: repeat(3, 30%);
	grid-template-rows: repeat(3, 33.33%);
	grid-gap: 5% 2%;
`

export const GridCells = styled.div`
	display: flex;
	background: #0D47A1;
	color: white;
	border-radius: 10px;
	// box-shadow: 5px 10px #888888;
	transition: width 2s, height 4s;

	&:hover {
		box-shadow: 5px 10px 5px black;
	}
`

export const GridDiv1 = styled.div`
	display: flex;
	justify-content: center;
	padding: 1%;
	height: 100%;
	width: 40%;
`

export const GridDiv2 = styled.div`
	height: 100%;
	width: 60%;
`

export const GridDiv2Div1 = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 40%;
	width: 100%;
`

export const GridDiv2Div2 = styled.div`
	display: flex;
	flex-direction: column;
	padding-left: 5%;
	flex-wrap: wrap;
	height: 60%;
	width: 100%;
`

export const HomePageContainer2 = styled.div`
	display: flex;
	flex-direction: column;
	background: #1565C0; 
	height: 100%;
	width: 100%;
	background-position: center;
	background-repeat: no-repeat;
	background-size: auto;
`

export const TitleContainer = styled.div`
	display: flex;
	height: 15%;
	width: 100%;
	justify-content: center;
	align-items: center;
	padding: 1%;

	span {
		font-size: 2em;
		font-weight: bold;
		color: white;
	}
`

export const ContentContainer1 = styled.div`
	display: flex;
	height: 20vh;
	width: 100%;
	justify-content: center;
	align-items: center;
	padding: 0 2%;

	span {
		font-size: 1.5em;
		color: white;
		align-self: flex-start;
	}
`

export const ContentContainer2 = styled.div`
	display: flex;
	height: auto;
	width: 95%;
	justify-content: center;
	align-items: center;
	padding: 0 2%;
	margin: 2%;
	background: #0D47A1;
`

export const ImageContainer = styled.div`
	display: flex;
	width: 40%;
	height: 100%;
	padding: 1%;
`

export const ContentContentContainer = styled.div`
	display: flex;
	width: 60%;
	height: 100%;
	padding: 1%;
	justify-content: center;

	span {
		font-size: 1.2em;
		color: white;
		align-self: flex-start;
	}
`