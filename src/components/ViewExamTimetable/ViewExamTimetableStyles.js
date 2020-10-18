import styled from 'styled-components';



export const ViewExamTimetableContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
`

export const UpperContainer = styled.div`
	display: flex;
	height: 15%;
	width: 100%;
	justify-content: space-between;
	border-bottom: 1px solid #80808030;

	button {
		height: 50%;
	}
`

export const AddExamContainer = styled.div`
	display: flex;
	align-items: center;
	width: 45%;

	button {
		width: 30%;
	}
`

export const ClassContainer = styled.div`
	display: flex;
	width: 45%;
	align-items: center;

	button {
		margin: 0 2%;
		height: 45%;
		width: 15%;
	}
`

// export const DeleteUpdateContainer = styled.div`
// 	display: flex;
// 	width: 100%;
// 	height: 15%;
// 	justify-content: flex-end;
// 	align-items: center;

// 	button {
// 		width: 10%;
// 		height: 50%;
// 		margin: 2%;
// 	}
// `

export const TableContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 73%;
`

export const SelectDiv = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	font-size: 1.1em;
	width: 50%;

	select {
		height: 5vh;
		width: 100%;
		margin: 7px;
		border: none;
		background-color: #80808030;

		&:focus {
			outline: none;
		}
	}
`

export const ButtonDiv3 = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: flex-end;

	button {
		width: 10%;
		margin: 2%;
	}
`

