import styled from 'styled-components';



export const ViewAttendanceContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
`

export const UpperContainer = styled.div`
	display: flex;
	align-items: center;
	height: 15%;
	width: 100%;
	border-top: 1px solid #80808030;
	border-bottom: 1px solid #80808030;

	button {
		margin-right: 20px;
		height: 50%;
		width: 10%;
	}
`

export const BottomContainer = styled.div`
	display: flex;
	width: 100%;
	height: 85%;
`

// export const SelectDiv = styled.div`
// 	display: flex;
// 	justify-content: flex-start;
// 	align-items: center;
// 	font-size: 1.1em;
// 	width: 60%;
// 	height: 100%;

// 	select {
// 		height: 45%;
// 		width: 20%;
// 		margin-right: 2%;
// 		border: none;
// 		background-color: #80808030;

// 		&:focus {
// 			outline: none;
// 		}
// 	}
// `
