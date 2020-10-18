import styled from 'styled-components';



export const AddBookContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
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
	justify-content: space-between;
	border-bottom: 1px solid #80808030;

	button {
		width: 10%;
		height: 40%;
	}
`

export const BottomContainer = styled.div`
	display: flex;
	width: 100%;
	height: 75%;
	justify-content: center;
`

export const AddNewBookContainer = styled.div`
	display: flex;
	width: 40%;
	height: 100%;
	justify-content: center;
	align-items: flex-start;
`

export const ButtonAndSearchContainer = styled.div`
	display: flex;
	width: 100%;
	height: 20%;
	align-items: center;
	justify-content: center;

	button {
		width: 15%;
		height: 35%;
		margin-left: 20px;
		font-size: 30px;
	}

	div {
		width: 50%;

		input {
			width: 100%;
			font-size: 15px;
			border: none;
			border-bottom: 1px solid black;
			background-color: #80808030;
		}
	}
`

export const BookInfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 60%;
	height: 100%;
`

export const SubTitleContainer = styled.div`
	display: flex;
	width: 100%;
	height: 10%;
	align-items: center;

	span {
		font-size: 20px;
		font-weight: bold;
	}
`

export const FormContainer = styled.div`
	display: flex;
	width: 100%;
	height: 10%;

	div {
		width: 40%;
		margin-right: 10px;

		input {
			width: 100%;
			font-size: 15px;
			border: none;
			border-bottom: 1px solid black;
			background-color: #80808030;
		}
	}
`

export const ButtonContainer = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	height: 20%;

	button {
		height: 40%;
		width: 20%;
		margin: 10px;
	}
`
