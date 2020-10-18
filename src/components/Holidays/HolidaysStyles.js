import styled from 'styled-components';



export const HolidaysContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
`

export const TitleContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 7%;
	width: 100%;

	span {
		font-size: 30px;
		font-weight: bold;
		margin-bottom: 10px;
	}
`

export const UpperContainer = styled.div`
	display: flex;
	width: 100%;
`

export const BottomContainer = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
	margin: 2% 0;

	button {
		width: 8%;
		height: 70%;
	}
`
