import styled from 'styled-components';



export const LeaveContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
`

export const TitleContainer = styled.div`
	display: flex;
	height: 10%;
	width: 100%;
	justify-content: center;
	align-items: center;

	span {
		font-size: 30px;
		font-weight: bold;
	}	
`

export const FormContainer = styled.div`
	display: flex;
	height: 60%;
	width: 100%;
`

export const UpperContainer = styled.div`
	display: flex;
	height: 10%;
	width: 100%;
	flex-direction: column;
	border-bottom: 1px solid black;
`

export const LeavesListContainer = styled.div`
	display: flex;
	width: 100%;
	height: 80%;
	padding-top: 20px;
`

export const Leaves = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 50%;
`

export const IndividualLeave = styled.div`
	display: flex;
	height: 100%;
	width: 50%;
`

export const SelectDiv = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 1.1em;
	width: 20%;

	select {
		height: 5vh;
		width: 60%;
		margin: 7px;
		border: none;
		background-color: #80808030;

		&:focus {
			outline: none;
		}
	}
`

export const LeavesTab = styled.div`
	display: flex;
	flex-direction: column;
	height: 25%;
	width: 80%;
	border-bottom: 1px dashed black;
`

export const ImageAndInfoContainer = styled.div`
	display: flex;
	width: 100%;
	height: 50%;
	align-items: center;
	padding: 10px;
	justify-content: space-between;

	img {
		height: 100%;
		width: 15%;
		border-radius: 100%;
		padding-right: 20px;
	}

	button {
		width: 20%;
	}
`

export const Span1 = styled.span`
	font-weight: bold;
`

export const ReasonContainer = styled.div`
	display: flex;
	align-items: center;
	height: 20%;
	width: 100%;
	padding: 10px;
	font-size: 14px;
`

export const DateAndStatusContainer = styled.div`
	display: flex;
	width: 100%;
	height: 30%;
	justify-content: space-between;
	align-items: center;
	padding: 10px;
`

export const TabInfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 50%;
	height: 100%;
`

export const LeavesTab2 = styled.div`
	display: flex;
	width: 90%;
	height: 60%;
	flex-direction: column;
`

export const ImageAndInfoContainer2 = styled.div`
	display: flex;
	width: 100%;
	height: 30%;
	align-items: center;
	padding: 10px;
	justify-content: space-between;

	img {
		height: 100%;
		width: 15%;
		border-radius: 100%;
		padding-right: 20px;
	}
`

export const TabInfoContainer2 = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 80%;
	height: 100%;
	font-size: 15px;
`

export const ReasonContainer2 = styled.div`
	display: flex;
	align-items: center;
	height: 20%;
	width: 100%;
	padding: 10px;
	font-size: 17px;
`

export const DescriptionContainer = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	max-height: 100%;
	width: 100%;
	padding: 10px;
	font-size: 15px;
`

export const StartEndDateContainer = styled.div`
	display: flex;
	width: 100%;
	height: 20%;
	justify-content: space-between;
	align-items: center;
	padding: 10px;
`

export const StatusContainer = styled.div`
	display: flex;
	width: 100%;
	height: 30%;
	justify-content: space-around;
	align-items: center;
	padding: 10px;

	button {
		width: 30%;
	}
`