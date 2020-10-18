import styled from 'styled-components';

export const ContactPageContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
	width: 100vw;
`

export const ContactPageContainer2 = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
	width: 100vw;
	background: #1565C0;
`

export const ContactFormContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 85%;
	width: 70%;
	background: white;
`

export const ImageContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 50%;
	height: 90%;

	img {
		width: 100%;
		height: 100%;
	}
`

export const ContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 50%;
	height: 90%;
`

export const TitleContainer = styled.div`
	display: flex;
	width: 100%;
	height: 20%;
	justify-content: center;
	align-items: center;
	padding-left: 10%;

	span {
		font-size: 2em;
		font-weight: bold;
	}
`

export const FormContainer = styled.form`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 80%;
	align-items: center;
`

export const FieldContainer = styled.div`
	display: flex;
	width: 100%;
	height: 20%;
	align-items: center;
	justify-content: center;

	div {
		width: 70%;
		
		justify-content: space-between;

		input {
			width: 75%;
			border: none;
			border-bottom: 1px solid black;
			background-color: #80808030;
		}
	}
`

export const FieldContainer2 = styled.div`
	display: flex;
	width: 70%;
	height: 25%;
	margin-top: 4%;
	
	justify-content: space-between;

	textarea {
		width: 77%;
		border: none;
		border-bottom: 1px solid black;
		background-color: #80808030;

	    overflow: auto;
	    outline: none;

	    -webkit-box-shadow: none;
	    -moz-box-shadow: none;
	    box-shadow: none;

	    resize: none;
	}
`

export const ButtonContainer = styled.div`
	display: flex;
	width: 100%;
	height: 25%;
	align-items: center;
	justify-content: center;
	padding-left: 13%;

	button {
		width: 20%;
	}
`