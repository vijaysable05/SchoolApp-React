import styled from 'styled-components';



export const AddAttendance2Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
`

// export const TitleContainer = styled.div`
// 	display: flex;
// 	justify-content: center;
// 	align-items: center;
// 	height: 7%;
// 	width: 100%;

// 	span {
// 		font-size: 30px;
// 		font-weight: bold;
// 		margin-bottom: 10px;
// 	}
// `

export const UpperContainer = styled.div`
	display: flex;
	align-items: center;
	height: 13%;
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
	height: 87%;
	flex-direction: column;

	 button {
	 	width: 10%;
	 	margin: 2%;
	 }
`

export const DateContainer = styled.div`
	display: flex;
	height: 15%;
	width: 100%;
	align-items: center;

	input {
		border: none;
		border-bottom: 1px solid black;
		background-color: #80808030;
	}
`

export const AttendanceContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 100%;
`

export const AttendanceFormContainer = styled.div`
	display: flex;
	align-items: center;
	width: 50%;
	padding-left: 2%;

	span {
		max-width: 50%;
		min-width: 20%;
	}
`

export const SelectDiv = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	font-size: 1.1em;
	width: 30%;

	select {
		height: 5vh;
		width: 90%;
		margin: 7px;
		border: none;
		background-color: #80808030;

		&:focus {
			outline: none;
		}
	}
`
