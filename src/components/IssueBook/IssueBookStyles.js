import styled from 'styled-components';



export const IssueBookContainer = styled.div`
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

export const BottomContainer = styled.div`
	display: flex;
	width: 100%;
	height: 90%;
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
	height: 15%;

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

	.css-2b097c-container {
		width: 60%;
		margin: 2%;
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

export const MemberInfoFormContainer = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	flex-direction: column;
`

export const ImageFormContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 15%;

	img {
		height: 100%;
		width: 15%;
	}
`

export const FormContainer1 = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	height: 15%;

	div {
		width: 25%;

		input {
			font-size: 15px;
			width: 100%;
			border: none;
			border-bottom: 1px solid black;
			background-color: #80808030;
		}
	}
`

export const FormContainer2 = styled.div`
	display: flex;
	width: 100%;
	height: 7%;
	justify-content: center;

	.css-2b097c-container {
		width: 50%;
		margin: 2%;
	}

`

export const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	height: 10%;
	width: 100%;

	button {
		font-size: 15px;
		margin: 2%;
		width: 13.5%;
		height: 60%;
	}
`