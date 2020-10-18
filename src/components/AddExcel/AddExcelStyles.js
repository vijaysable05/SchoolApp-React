import styled from 'styled-components';



export const AddExcelContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
`

export const Title = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

		span {
			font-size: 30px;
			font-weight: bold;
		}
`

export const FormContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 70%;
	width: 100%;

	form {
		display: flex;
		flex-direction:column;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: 100%;
	}
`

export const DescDiv = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 20%;

	span {
		font-size: 20px;
	}

	p {
		font-size: 15px;
	}
`

export const Input = styled.div`
	display: flex;
	flex-direction: column;
	border: 2px dashed black;
	height: 100%;
	width: 40%;
	justify-content: center;
	align-items: center;

	input {
		display: none;
	}

	label {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 80%;
	}

	img {
		height: 80%;
		width: 40%;
		cursor: pointer;
	}
`

export const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	width: 40%;
	padding-top: 20px;

	button {
		width: 30%;
		margin: 20px;
	}
`

export const ButtonContainer1 = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 10%;
	width: 100%;
	padding-bottom: 15px;

	a {
		height: 100%;
		width: 20%;
		color: black;
	}

	button {
		height: 100%;
		width: 100%;
		color: black;

		&:hover {
			background-color: #80808066;
			border: none;
		}
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
	width: 40%;
	padding: 10px;

	select {
		height: 5vh;
		width: 50%;
		margin: 7px;
		border: none;
		background-color: #80808030;

		&:focus {
			outline: none;
		}
	}
`
