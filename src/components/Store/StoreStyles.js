import styled from 'styled-components';



export const StoreContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
`

export const TitleContainer = styled.div`
	display: flex;
	width: 100%;
	height: 8%;
	justify-content: center;
	align-items: center;
	border-bottom: 1px solid #80808030;

	span {
		font-size: 30px;
		font-weight: bold;
	}
`

export const UpperContainer = styled.div`
	display: flex;
	width: 100%;
	height: 12%;
	align-items: center;
	border-bottom: 1px solid #80808030;

	button {
		width: 10%;
		height: 50%;
		margin-right: 2%;
	}
`

export const BottomContainer = styled.div`
	display: flex;
	width: 100%;
	height: 80%;
`