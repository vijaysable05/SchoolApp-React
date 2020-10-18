import styled from 'styled-components';


export const AddDivisionContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
`

export const SelectClassTitleContainer = styled.div`
	display: flex;
	width: 50%;
	height: 10%;
	align-items: center;

	span {
		font-size: 20px;
		font-weight: bold;
	}
`

export const ClassInputContainer = styled.div`
	display: flex;
	align-items: center;
	width: 15%;
	flex-direction: column;
	justify-content: center;
	margin: 0 2%;

	input {
		width: 100%;
		text-align: center;
		border: none;
		border-bottom: 1px solid black;
		background-color:#80808030;
	}
`

export const ClassInput = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	height: 100%;
`

export const ButtonContainer = styled.div`
	display: flex;
	width: 30%;
	align-items: center;

	button {
		width: 30%;
		margin: 1%;
	}
`

export const SelectDiv = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 1.1em;
	width: 30%;

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

export const ClassAndDivisionContainer = styled.div`
	display: flex;
	width: 100%;
`
