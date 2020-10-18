import styled from 'styled-components';


export const ViewTableContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
`

export const InfoDisplayContainer = styled.div`
	display: flex;
	height: 100%;
`

export const TableStyle = styled.table`
	width: 100%;
	align-self: flex-start;

	table,th,td {
		border: 1px solid black;
  		border-collapse: collapse;
	}

	th, td {
		padding: 15px;
		text-align: center;
		max-width: 25vw;

		img {
			max-width: 9vw;
			cursor: pointer;
		}
	}

	&:hover {
		span {
			cursor: pointer;
		}
	}
`