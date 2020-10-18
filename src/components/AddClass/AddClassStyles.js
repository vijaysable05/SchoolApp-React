import styled from 'styled-components';


export const AddClassContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
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

export const UpperContainer = styled.div`
	display: flex;
	width: 100%;
	height: 13%;
	align-items: center;
	border-top: 1px solid #80808030;
	border-bottom: 1px solid #80808030;

	button {
		height: 50%;
		width: 10%;
		margin-right: 2%;
	}
`

export const BottomContainer = styled.div`
	display: flex;
	width: 100%;
	height: 77%;
`