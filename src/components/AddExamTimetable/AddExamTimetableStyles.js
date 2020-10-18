import styled from 'styled-components';



export const AddExamTimetableContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;

	form {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}
`

export const UpperContainer = styled.div`
	display: flex;
	height: 15%;
	width: 100%;
	align-items: center;

	button {
		height: 50%;
		width: 10%;
	}
`

export const ClassContainer = styled.div`
	display: flex;
	width: 100%;
	height: 60%;
`

export const BottomContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 80%;
	width: 100%;
`

export const TableContainer = styled.div`
	display: flex;
	width: 100%;

	input {
		width: 100%;
		text-align: center;
		border: none;
		border-bottom: 1px solid black;
		background-color:#80808030;
	}
`

export const FormContainer = styled.div`
	display: flex;
	width: 100%;
	height: 10%;
`


export const SelectDiv = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	font-size: 1.1em;
	width: 40%;

	select {
		height: 5vh;
		width: 90%;
		margin: 7px;
		border: none;
		background-color: #80808030;

		&:focus {
			outline: none;
		}
	}
`

export const ButtonDiv = styled.div`
	display: flex;
	justify-content: center;
	width: 30%;

	button {
		width: 35%;
		margin: 20px;
	}
`

export const ButtonDiv2 = styled.div`
	display: flex;
	justify-content: flex-start;
	width: 100%;

	button {
		width: 10%;
		height: 90%;
		margin: 20px;
	}
`
