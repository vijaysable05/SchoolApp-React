import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const LoginPageContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
	width: 100vw;
	background: #1565C0;
`

export const LoginPage2Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	width: 100%;
`

export const LoginBoxContainer = styled.div`
	display: flex;
	align-items: center;
	height: 85%;
	width: 80%;
	background: white;
`

export const LoginImagesContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	width: 60%;
`

export const ImageContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 2%;
	margin-left: 1%;
	height: 80%;
	width: 33.33%;
	border: 1px solid #1565C0;

	input {
		align-self: flex-end;
		height: 5%;
		width: 20%;
		border: none;
	}

	label {
		height: 85%;
		width: 95%;

		img {
			height: 100%;
			width: 95%;
			cursor: pointer;
		}
	}

	span {
		font-size: 2rem;
		padding: 2%;
		font-weight: bold;
		height: 5%;
	}
`


export const LoginContentContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 40%;
`

export const ContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 70%;
	width: 90%;
`

export const Title = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 3rem;
	width: 90%;
	height: 20%;
	font-weight: bold;
	}
`

export const FormContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 90%;
	height: 60%;

	button {
    	width: 25%;
    	margin: 5%;
    }

	div {
		width: 100%;
		margin: 2%;
		justify-content: center;
		input {
			width: 60%;
			border: none;
			border-bottom: 1px solid black;
		}
	}
`

export const ErrorContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	color: red;
	font-weight: bold;
	width: 90%;
	height: 20%;
`

export const StyledLink = styled(Link)`
    text-decoration: none;
    width: 25%;
    margin: 10%;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }

    button {
    	width: 100%;
    }
`
