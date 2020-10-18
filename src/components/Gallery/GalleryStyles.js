import styled from 'styled-components';



export const GalleryContainer = styled.div`
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
	align-items: center;
	height: 15%;
	width: 100%;
	border-top: 1px solid #80808030;
	border-bottom: 1px solid #80808030;

	button {
		margin-right: 20px;
		height: 42%;
		width: 10%;
	}
`

export const BottomContainer = styled.div`
	display: flex;
	width: 100%;
	height: 78%;
`


