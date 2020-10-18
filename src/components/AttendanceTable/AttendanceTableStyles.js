import styled from 'styled-components';



export const AttendanceTableContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
`

export const UpperContainer = styled.div`
	display: flex;
	align-items: center;
	height: 18%;
	width: 100%;
	border-top: 1px solid #80808030;
	border-bottom: 1px solid #80808030;

	button {
		margin-left: 2%;
		height: 45%;
		width: 7%;
	}
`

export const SpanContainer = styled.div`
	justify-self: flex-end;
	display: flex;
	width: 70%;
	align-items: center;
	padding-left: 20%;

	span {
		width: 15%;
		font-weight: bold;
		margin: 0 1%;
	}
`

export const BottomContainer = styled.div`
	display: flex;
	width: 100%;
	height: 82%;
`

export const TableContainer = styled.div`
	display: flex;
	width: 100%;
	overflow-x: scroll;
	height: 100%;

		th {
			border: 1px solid #80808030;
			border-top: 1px solid black;
			border-bottom: 1px solid black;
			font-weight: bold;
		}

		thead tr th:first-child,
		tbody tr td:first-child {
		  min-width: 15em;
		  word-break: break-all;
		}

		td {
			border: 1px solid #80808030;
			border-bottom: 1px dashed #80808030;
		}
`

export const SelectDiv = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	font-size: 1.1em;
	width: 30%;
	height: 100%;

	select {
		height: 45%;
		width: 40%;
		margin-right: 2%;
		border: none;
		background-color: #80808030;

		&:focus {
			outline: none;
		}
	}
`
