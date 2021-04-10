import React, { useState, createContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
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

const playlistId = 'PLXA_TifFgaBAu0l39GWyJVVr0azXpV9wz';

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
			<BrowserRouter basename='/react-videoplayer'>
				{' '}
				{/* usar o basename se o player for
			ficar em uma subpasta na  minha aplicação    */}
				<>
					<Switch>
						<Route exact path='/' component={WbnPlayer} />
						<Route
							exact
							path='/:activeVideo'
							component={WbnPlayer}
						/>
					</Switch>
					<GlobalStyle />{' '}
					{/* ao chamar um componente globalStyle dentor do BrowserRouter eu aplico o stylo global em toda a aplicação  */}
				</>
			</BrowserRouter>
		</VideosContext.Provider>
	);
};
export default App;
