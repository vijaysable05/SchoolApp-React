import styled from 'styled-components';


export const ViewBusesContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
`

export const UpperContainer = styled.div`
	display: flex;
	width: 100%;
	height: 15%;
	border-bottom: 1px solid #80808030;
	align-items: center;
	justify-content: space-between;

	div {
		width: 20%;

		input {
			width: 100%;
			border: none;
			border-bottom: 1px solid black;
			background-color: #80808030;
			font-size: 15px;
		}
	}

	button {
		margin: 20px;
		height: 50%;
		width: 10%;
	}
`

export const BottomContainer = styled.div`
	display: flex;
	width: 100%;
	height: 85%;

	table {
		margin-top: 10px;

		th {
			border: none;
			border-top: 1px solid black;
			border-bottom: 1px solid black;
		}

		tr {
			border: none;
			border-bottom: 1px dashed black;
		}

		td {
			border: none;
		}
		
	}
`
