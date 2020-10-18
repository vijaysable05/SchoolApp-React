import styled from 'styled-components';



export const BooksCirculatedContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
`

export const ModalHeading = styled.div`
	display: flex;
	height: 15%;
	margin-left: 10%;
	align-items: center;
	justify-content: space-between;
`

export const ModalBody = styled.div`
	display: flex;
	height: 80%;
	margin-top: 2%;
	justify-content: center;
	flex-direction: column;
`

export const EditSpan = styled.span`
	font-size: 2em;
	font-weight: bold;
	cursor: pointer;
`

export const ModalSpan = styled.span`
	height: 15%;
	font-size: 1.5rem;
	margin-left: 10%;
`

export const ModalButtons = styled.div`
	height: 15%;
	display: flex;
	justify-content: space-around;
	margin-bottom: 2%;
	
	button {
		width: 20%;
	}
`

export const TitleContainer = styled.div`
	display: flex;
	height: 10%;
	width: 100%;
	justify-content: center;
	align-items: center;
	border-bottom: 1px solid #80808030;

	span {
		font-size: 30px;
		font-weight: bold;
	}
`

export const UpperContainer = styled.div`
	display: flex;
	height: 15%;
	width: 100%;
	align-items: center;
	justify-content: flex-end;

	div {
		width: 20%;

		input {
			width: 100%;
			border: none;
			border-bottom: 1px solid black;
			background-color: #80808030;
		}
	}
`

export const BottomContainer = styled.div`
	display: flex;
	width: 100%;
	height: 75%;

	table {
		th {
			border: none;
			border-top: 1px solid black;
			border-bottom: 1px solid black;
		}

		td {
			border: none;
			border-bottom: 1px dashed black;
		}
	}
`