import styled from 'styled-components';



export const AddStockContainer = styled.div`
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

export const SearchContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 40%;
	height: 100%;
`

export const SearchTitleContainer = styled.div`
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

export const SearchInputFormContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	width: 100%;
	height: 30%;

	div {
		width: 60%;

		input {
			width: 100%;
			font-size: 15px;
			border: none;
			border-bottom: 1px solid black;
			background-color: #80808030;
		}
	}

	button {
		width: 20%;
		height: 20%;
		margin: 20px;
		font-size: 30px;
	}
`

export const NoteContainer = styled.div`
	display: flex;
	justify-content: center;
	width: 80%;
	height: 30%;
	margin-left: 10%;
	font-size: 15px;
`

export const MemberInfoContainer = styled.div`
	display: flex;
	height: 100%;
	width: 60%;
	flex-direction: column;
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
	width: 80%;
	height: 10%;
	justify-content: center;

	div {
		width: 30%;
		input {
			font-size: 15px;
			width: 100%;
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
		width: 13.5%;
		height: 50%;
	}
`



