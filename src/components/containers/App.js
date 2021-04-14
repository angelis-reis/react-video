import React, { useState, createContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import VideoList from './VideoList';
import WbnPlayer from './WbnPlayer';

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }
    body {
        font-size: 10px;
        font-family: 'Hind', sans-serif;
    }
`;
// const playlistId = 'PLXA_TifFgaBAu0l39GWyJVVr0azXpV9wz';
export const VideosContext = createContext();

const App = () => {
	const [youtubePlaylist, setYoutubePlaylist] = useState([]);
	const [videoIdList, setVideoIdList] = useState([]);
	const [videosInformations, setVideosInformations] = useState([]);
	const [youtubePlaylistTitle, setYoutubePlaylistTitle] = useState([]);
	const [videosFinalList, setVideosFinalList] = useState([]);
	/* console.log('Koca: videosInformations ', videosInformations); */

	return (
		<VideosContext.Provider
			value={{
				youtubePlaylist,
				setYoutubePlaylist,
				videosInformations,
				videoIdList,
				setVideoIdList,
				setVideosInformations,
				youtubePlaylistTitle,
				setYoutubePlaylistTitle,
				videosFinalList,
				setVideosFinalList
			}}
		>
			<VideoList />
		</VideosContext.Provider>
	);
};
export default App;
