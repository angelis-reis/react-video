import React, { useContext, useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Video from '../Video';
import Playlist from './Playlist';
import { VideosContext } from './App';

const StyledWbnPlayer = styled.div`
	background: ${(props) => props.theme.bgcolor};
	border: ${(props) => props.theme.border};
	max-width: 1800px;
	margin: 30px auto;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	flex-direction: row;
	max-height: 863px;
	transition: all 0.5s ease;

	@media screen and (max-width: 1200px) {
		display: block;
		max-height: 10000px;
	}
`;

const theme = {
	bgcolor: '#353535',
	bgColorItem: '#414141',
	bgColorItemActive: '#405c63',
	bgColorPlayed: '#526d4e',
	border: 'none',
	borderPlayed: 'none',
	color: '#fff'
};

const themeLight = {
	bgcolor: '#fff',
	bgColorItem: '#fff',
	bgColorItemActive: '#80a7b1',
	bgColorPlayed: '#7d9979',
	border: '1px solid #353535',
	borderPlayed: 'none',
	color: '#353535'
};

/* 0: {…}
​​
    duration: "10:51"
    ​​
    id: "ghI-gMi1DPc"
    ​​
    num: 1
    ​​
    played: true
    ​​
    title: "Introduction and setup"
    ​​
    video: "https://www.youtube.com/embed/Cn1wH2bK3e8" */

function WbnPlayer({ match, history, location }) {


	const videos = JSON.parse(document.querySelector('[name="videos"]').value);
	const savedState = JSON.parse(localStorage.getItem(`${videos.playlistId}`));

	const {
		youtubePlaylist,
		setYoutubePlaylist,
		youtubePlaylistTitle,
		setYoutubePlaylistTitlevideoIdList,
		setVideoIdList,
		videosInformations,
		setVideosInformations,
		videosFinalList
	} = useContext(VideosContext);

	var timestamp5 = new Date().getTime();
	console.log('Koca: state.video ', timestamp5);

	const [state, setState] = useState({
		videos: savedState ? savedState.videos : videos.playlist,
		activeVideo: savedState ? savedState.activeVideo : videos.playlist[0],
		nightMode: savedState ? savedState.nightMode : true,
		playlistId: savedState ? savedState.playlistId : youtubePlaylistTitle,
		autoplay: false

		// videos: savedState ? savedState.videos : videos.playlist,
		// activeVideo: savedState ? savedState.activeVideo : videos.playlist[0],
		// nightMode: savedState ? savedState.nightMode : true,
		// playlistId: savedState ? savedState.playlistId : youtubePlaylistTitle,
		// autoplay: false
	});



	useEffect(() => {
		// console.log('Koca: useeffect 1');
		// console.log('Koca: activeVideo ', state.activeVideo);
		localStorage.setItem(
			`${state.playlistId}`,
			JSON.stringify({
				...state
			})
		);
	}, [state]);

	useEffect(() => {
		// console.log('Koca: useeffect 2');
		// console.log('Koca: activeVideo ', state.activeVideo);
		const videoId = match.params.activeVideo;
		if (videoId !== undefined) {
			const newActiveVideo = state.videos.findIndex(
				(video) => video.id === videoId
			);

			setState((prev) => ({
				...prev,
				activeVideo: prev.videos[newActiveVideo],
				autoplay: location.autoplay
			}));
		} else {
			history.push({
				pathname: `/${state.activeVideo.id}`,
				autoplay: false
			});
		}
	}, [
		history,
		location.autoplay,
		match.params.activeVideo,
		state.activeVideo.id,
		state.videos
	]);

	const endCallback = () => {
		const videoId = match.params.activeVideo;

		const currentVideoIndex = state.videos.findIndex(
			(video) => video.id === videoId
		);

		const nextVideo =
			currentVideoIndex === state.videos.length - 1
				? 0
				: currentVideoIndex + 1;

		history.push({
			pathname: `${state.videos[nextVideo].id}`,
			autoplay: false
		});
	};

	/* opções de callback de progresso */
	/* const progressCallback = e => {
        if(e.playedSeconds > 10 && e.playedSeconds < 11) {
            console.log("progressCallback")
            setState({
                ...state,
                videos: state.videos.map( element => {
                    return element.id === state.activeVideo.id
                    ? {...element, played: true}
                    : element
                } )
            })
        }
    } */

	const progressCallback = (e) => {
		if (e.playedSeconds > 10 && e.playedSeconds < 11) {
			const videos = [...state.videos];
			const playedVideo = videos.find(
				(video) => video.id === state.activeVideo.id
			);
			playedVideo.played = true;
			setState({
				...state,
				videos
			});
		}
	};

	const nightModeCallback = () => {
		setState((prevState) => ({
			...prevState,
			nightMode: !prevState.nightMode
		}));
	};

	// console.log('Koca: videosFinalList ', videosFinalList[0]);

	return (
		<ThemeProvider theme={state.nightMode ? theme : themeLight}>
			{state.videos !== null ? (
				<StyledWbnPlayer>
					<Video
						active={state.activeVideo}
						autoplay={state.autoplay}
						endCallback={endCallback}
						progressCallback={progressCallback}
					/>
					<Playlist
						videos={state.videos}
						active={state.activeVideo}
						nightModeCallback={nightModeCallback}
						nightMode={state.nightMode}
					/>

				</StyledWbnPlayer>
			) : null}
		</ThemeProvider>
	);
};

export default WbnPlayer;
