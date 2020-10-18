import styled from 'styled-components';



export const ShowVideosContainer = styled.div`
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
	width: 100%;
	height: 85%;
	flex-wrap: wrap;
`

export const VideoContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin: 20px 5px;
	justify-content: center;
	width: 20%;
	height: 40%;
	margin: 2%;

	video {
		width: 100%;
		height: 80%;
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
		height: 80%;
		width: 10%;
		cursor: pointer;
	}
`