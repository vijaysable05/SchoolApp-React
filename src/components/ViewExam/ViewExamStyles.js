import styled from 'styled-components';

export const ViewExamContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
`

export const UpperContainer = styled.div`
	display: flex;
	height: 15%;
	width: 100%;
	align-items: center;
	justify-content: space-between;

	button {
		width: 10%;
		height: 50%;
	}

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

