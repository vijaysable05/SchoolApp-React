import styled from 'styled-components';


export const ExamContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
`

export const UpperContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 20%;
	border-bottom: 1px solid #80808030;
`

export const BottomContainer = styled.div`
	display: flex;
	width: 100%;
	height: 80%;
`

export const TitleContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 40%;
	border-bottom: 1px solid #80808030;

	span {
		font-size: 30px;
		font-weight: bold;
	}
`

export const ViewSelectionContainer = styled.div`
	display: flex;
	width: 100%;
	height: 60%;
	align-items: center;

	button {
		margin-right: 20px;
		height: 50%;
		width: 10%;
	}
`







