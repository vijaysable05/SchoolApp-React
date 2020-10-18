import styled from 'styled-components';



export const LeaveRequestContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
`

export const Title = styled.div`
	display: flex;
	width: 100%;
	height: 10%;
	justify-content: center;
	align-items: center;
	margin-bottom: 3%;

	span {
		font-size: 30px;
		font-weight: bold;
	}
`

export const FormNoteContainer = styled.div` 
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 80%;
`

export const FormContainer = styled.form`
	display: flex;
	flex-direction: column;
	width: 50%;
	height: 100%;
`

export const InputContainer1 = styled.div`
	display: flex;
	width: 100%;
`
export const InputContainer2 = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 10px 0;

	input {
		width: 50%;
		margin-left: 0;
		margin-bottom: 3%;
	}

	textarea {
		width: 99%;
		 &:focus {
		 	outline: none;
		 }
	}
`

// export const InputContainer3 = styled.div`
// 	display: flex;
// 	align-items: center;
// 	width: 100%;
// 	padding: 10px 0;

// 	div {
// 		height: 100%;
// 		width: 5%;
// 	}

// 	input[type=checkbox] {
// 		height: 100%;
// 		width: 80%;
		
// 		&:hover {
// 			cursor: pointer;
// 		}
// 	}

// 	span {
// 		font-size: 16px;
// 	}
// `
export const InputContainer4 = styled.div`
	display: flex;
	width: 100%;
	padding: 10px 0;

	button {
		width: 15%;
	}
`

export const NoteContainer = styled.div`
	display: flex;
	width: 40%;
	height: 100%;
	padding-left: 20px;
	padding-top: 10px;
`
// export const SelectDiv = styled.div`
// 	display: flex;
// 	justify-content: space-between;
// 	align-items: center;
// 	font-size: 1.1em;
// 	width: 100%;

// 	select {
// 		height: 5vh;
// 		width: 30%;
// 		margin: 7px;
// 		border: none;
// 		background-color: #80808030;

// 		&:focus {
// 			outline: none;
// 		}
// 	}
// `

export const Span1 = styled.span` 
	font-size: 17px;
	font-weight: bold;
	width: 20%;
`

export const Span2 = styled.span` 
	font-size: 15px;
	width: 80%;
`

export const MessageContainer = styled.div`
	display: flex;
	with: 100%;
	height: 10%;
	margin-top: 5%;
	margin: 1%;
`