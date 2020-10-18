import styled from 'styled-components';



export const AcceptPaymentContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
	font-size: 15px;
`

export const UpperContainer = styled.div`
	display: flex;
	width: 100%;
	height: 17%;
	align-items: center;
	border-bottom: 1px solid black;

	button {
		width: 10%;
		height: 40%;
		margin-left: 20px;
	}

	.css-2b097c-container {
		width: 30%;
		margin: 2%;
	}

`

export const BottomContainer = styled.div`
	display: flex;
	width: 100%;
	height: 83%;
`

export const StudentInfoContainer = styled.div` 
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 30%;
	padding: 20px;

	div {
		flex-direction: column;
		align-items: flex-start;
		margin-bottom: 20px;

		label {
			margin: 0;
		}

		input {
			margin: 0;
			border: none;
		}
	}

	img {
		margin-left: 30%;
		margin-bottom: 10px;
		height: 17%;
		width: 25%;
	}
`


export const FeesFormContainer = styled.form`
	display: flex;
	flex-direction: column;
	width: 70%;
	height: 100%;
`

export const FeesDisplayContainer = styled.div` 
	display: flex;
	width: 100%;
	height: 20%;
	border-bottom: 1px dashed black;
`

export const FeesDisplay = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 30%;
	height: 100%;
`

export const Span1 = styled.span` 
	font-weight: bold;
`

export const FormContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 80%;
	width: 100%;
`

export const FormTitle = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	height: 15%;

	span {
		font-size: 20px;
	}
`

export const Form = styled.div`
	display: flex;
	width: 100%;
	height: 20%;
	align-items: center;
`

export const AmountForm = styled.div`
	width: 40%;

	div {
		width: 100%;

		input {
			width: 100%;
		}
	}
`

export const SelectDiv = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	width: 100%;

	select {
		height: 5vh;
		width: 40%;
		margin: 7px;
		border: none;
		background-color: #80808030;
		margin-left: 20px;

		&:focus {
			outline: none;
		}
	}
`

export const FeesConcessionContainer = styled.div`
	display: flex;
	width: 100%;
	height: 30%;
	align-items: center;

	input {
		margin-left: 20px;
	}

	button {
		margin-left: 20px;
		width: 17%;
		height: 33%;
	}
`

export const ConfirmDiv = styled.div`
	display: flex;
	width: 100%;
	height: 10%;

	button {
		width: 17%;
	}
`