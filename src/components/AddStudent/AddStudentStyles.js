import styled from 'styled-components';


export const AddStudentContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
`

export const ProfilePicContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 20%;
	width: 100%;
`

export const FormContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	height: 80%;
	width: 100%;

		input {
			width: 60%;
			border: none;
			border-bottom: 1px solid black;
			background-color: #80808030;
	}
`

export const SelectDiv = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 1.1em;

	select {
		height: 5vh;
		width: 60%;
		margin: 7px;
		border: none;
		background-color: #80808030;

		&:focus {
			outline: none;
		}
	}
`

export const SelectDiv1 = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	font-size: 1.1em;
	width: 80%;

	select {
		height: 5vh;
		width: 10%;
		margin: 7px;
		border: none;
		background-color: #80808030;

		&:focus {
			outline: none;
		}
	}
`

export const ButtonDiv1 = styled.div`
	display: flex;
	justify-content: center;
	width: 20%;
	padding-top: 20px;

	button {
		width: 50%;
		margin: 2%;
	}
`

export const Div1 = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	justify-content: space-between;
	align-items: center;
	height: 8%;
`

export const TitleDiv = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	font-size: 30px;
	font-weight: bold;
	margin: 20px 0;
	height: 8%;
`

export const DivContainer = styled.div`
	display: flex;
	justify-content: flex-start
	align-items: center;
	height: 8%;

	div {
		width: 33%;
	}
`

export const ButtonDiv = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	padding-top: 0.3%;

	button {
		width: 10%;
		margin: 20px;
	}
`

export const ImageContainer = styled.div` 
	display: flex;
	justify-content: center;
	height: 100%;
	width: 100%;

		input {
			display: none;
		}

		label {
			height: 100%;
			width: 10%;
			background-position: center;
			background-repeat: no-repeat;
			background-size: cover;
			margin: 20px;
			border-radius: 100%;
			cursor: pointer;

			img {
				height: 80%;
				width: 100%;
			}

			&:focus {
				outline: none;
			}
		}
`

export const MessageContainer = styled.div`
	display: flex;
	with: 100%;
	height: 10%;
	margin-top: 5%;
	margin: 1%;
`


export const ModalHeading = styled.div`
	display: flex;
	height: 20%;
	margin-left: 10%;
	align-items: center;
	justify-content: space-between;
`

export const ModalBody = styled.div`
	display: flex;
	height: 80%;
	margin-top: 1%;
	justify-content: center;
	flex-direction: column;
`

export const EditSpan = styled.span`
	font-size: 2em;
	font-weight: bold;
	cursor: pointer;
`

export const ModalSpan = styled.span`
	display: flex;
	height: 30%;
	align-items: center;
	font-size: 1.5rem;
	margin-left: 10%;
`

export const ModalSpan2 = styled.span`
	display: flex;
	height: 70%;
	align-items: center;
	font-size: 1.5rem;
	margin-left: 10%;
`