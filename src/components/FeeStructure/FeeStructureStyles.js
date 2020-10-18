import styled from 'styled-components';


export const FeeStructureContainer = styled.form`
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
`

export const UpperContainer = styled.div`
	display: flex;
	height: 20%;
	width: 100%;
	align-items: center;

	button {
		width: 15%;
		height: 40%;
		margin-left: 20px;
	}
`

export const UpperContainer2 = styled.div`
	display: flex;
	height: 15%;
	width: 100%;
	align-items: center;
	border-bottom: 1px solid #80808030;

	button {
		margin-left: 20px;
		width: 10%;
		height: 50%;
	}
`

export const FormContainer = styled.div`
	display: flex;
	width: 50%;
	justify-content: flex-end;

	div {
		width: 50%;

		input {
			width: 100%;
			font-size: 15px;
			border: none;
			border-bottom: 1px solid black;
		}
	}
`


export const SelectDiv = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	font-size: 1.1em;
	width: 50%;
	margin-left: 20px;

	select {
		height: 6vh;
		width: 30%;
		margin: 7px;
		border: none;
		background-color: #80808030;

		&:focus {
			outline: none;
		}
	}
`

export const SelectDiv2 = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	font-size: 1.1em;
	width: 40%;
	margin-left: 20px;

	select {
		height: 6vh;
		width: 40%;
		margin: 7px;
		border: none;
		background-color: #80808030;

		&:focus {
			outline: none;
		}
	}
`

export const BottomContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 80%;
	width: 100%;
`

