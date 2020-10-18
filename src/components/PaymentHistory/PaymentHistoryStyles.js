import styled from 'styled-components';


export const PaymentHistoryContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
`

export const UpperContainer = styled.div`
	display: flex;
	height: 20%;
	width: 100%;
`

export const FormContainer = styled.form`
	display: flex;
	width: 100%;
	justify-content: flex-end;

	div {
		width: 30%;

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
	width: 60%;
	margin-left: 20px;

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

export const BottomContainer = styled.div`
	display: flex;
	height: 80%;
	width: 100%;
`

