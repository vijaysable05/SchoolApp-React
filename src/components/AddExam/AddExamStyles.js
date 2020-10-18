import styled from 'styled-components';



export const AddExamContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
`

export const UpperContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 15%;
	width: 100%;
	border-bottom: 1px solid #80808030;

	span {
		font-size: 25px;
		font-weight: bold;
		margin-left: 20px;
	}

	button {
		width: 10%;
		height: 50%;
		margin-right: 20px;
	}
`

export const BottomContainer = styled.div`
	display: flex;
	width: 100%;
	height: 85%;
`

export const ClassesContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 40%;
	height: 100%;
`

export const ManagerAndClassesTitleContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 20%;

	span {
		font-size: 20px;
		font-weight: bold;
	}
`

export const ClassesInputFormContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	width: 100%;
	height: 100%;

	div {
		width: 40%;
		display: flex;
		justify-content: space-between;

		input[type=checkbox] {
			height: 70%;
			width: 50%;
		}
	}



	button {
		width: 20%;
		height: 10%;
		margin: 20px;
		font-size: 30px;
	}
`

export const ExamInfoContainer = styled.div`
	display: flex;
	height: 100%;
	width: 60%;
	flex-direction: column;

	input {
			font-size: 15px;
			width: 60%;
			border: none;
			border-bottom: 1px solid black;
			background-color: #80808030;
	}
`

export const FormContainer2 = styled.div`
	display: flex;
	width: 100%;
	justify-content: center;
	align-items: center;

	div {
		width: 40%;
		height: 100%;

		input {
			font-size: 15px;
			width: 100%;
			border: none;
			border-bottom: 1px solid black;
			background-color: #80808030;
		}
	}
`

export const FormContainer3 = styled.div`
	display: flex;
	width: 100%;
	height: 10%;
	justify-content: center;

	div {
		width: 40%;

		label {
			width: 30%;
		}

		input {
			font-size: 15px;
			width: 70%;
			border: none;
			border-bottom: 1px solid black;
			background-color: #80808030;
		}
	}
`

export const FormContainer4 = styled.div`
	display: flex;
	width: 100%;
	justify-content: center;
	align-items: center;
	margin: 3% 0;

	div {
		width: 100%;
		justify-content: center;

		input {
			font-size: 15px;
			width: 40%;
			border: none;
			border-bottom: 1px solid black;
			background-color: #80808030;
		}
	}
`


export const SelectDiv = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	font-size: 15px;
	width: 40%;

	select {
		height: 5vh;
		width: 95%;
		border: none;
		background-color: #80808030;
		border-bottom: 1px solid black;

		&:focus {
			outline: none;
		}
	}
`

export const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	height: 15%;
	width: 100%;

	button {
		font-size: 15px;
		margin: 2%;
		width: 20%;
	}
`

export const RadioInput = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-between;
	font-size: 15px;

	input[type=radio] {
		height: 70%;
		width: 50%;
	}
`



