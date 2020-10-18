import styled from 'styled-components';



export const ShowPhotosContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;
`

export const UpperContainer = styled.div`
	display: flex;
	width: 100%;
	height: 15%;
	align-items: center;
	justify-content: flex-end;

	button {
		height: 50%;
		width: 10%;
	}
`

export const BottomContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	height: 85%;
`

export const ImageContainer = styled.div`
	display: flex;
	margin: 20px 5px;
	justify-content: space-between;
	width: 20%;
	height: 40%;
	flex-direction: column;
	align-items: center;
`

export const PhotoContainer = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	height: 80%;
	cursor: pointer;
	align-items: center;

	img {
		cursor: pointer;
	}
`

export const DeleteContainer = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	height: 20%;
	align-items: center;

	img {
		cursor: pointer;
	}
`