import React, { useEffect, useContext, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import { createGlobalStyle } from 'styled-components';
import WbnPlayer from './WbnPlayer';
import { VideosContext } from './App';
import ApiKey from '../../sensitive/ApiKey';

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

function youtubeUrlMaker(videoId) {
	const embed = 'https://www.youtube.com/embed/';
	const youtubeUrl = embed.concat(videoId);
	return youtubeUrl;
}

function convertDuration(t) {
	// dividing period from time
	const x = t.split('T');
	let duration = '';
	let time = {};
	let period = {};
	// just shortcuts
	const s = 'string';
	const v = 'variables';
	const l = 'letters';
	// store the information about ISO8601 duration format and the divided strings
	const d = {
		period: {
			string: x[0].substring(1, x[0].length),
			len: 4,
			// years, months, weeks, days
			letters: ['Y', 'M', 'W', 'D'],
			variables: {}
		},
		time: {
			string: x[1],
			len: 3,
			// hours, minutes, seconds
			letters: ['H', 'M', 'S'],
			variables: {}
		}
	};
	// in case the duration is a multiple of one day
	if (!d.time.string) {
		d.time.string = '';
	}

	for (const i in d) {
		const { len } = d[i];
		for (let j = 0; j < len; j++) {
			d[i][s] = d[i][s].split(d[i][l][j]);
			if (d[i][s].length > 1) {
				d[i][v][d[i][l][j]] = parseInt(d[i][s][0], 10);
				d[i][s] = d[i][s][1];
			} else {
				d[i][v][d[i][l][j]] = 0;
				d[i][s] = d[i][s][0];
			}
		}
	}
	period = d.period.variables;
	time = d.time.variables;
	time.H +=
		24 * period.D +
		24 * 7 * period.W +
		24 * 7 * 4 * period.M +
		24 * 7 * 4 * 12 * period.Y;

	if (time.H) {
		duration = `${time.H}:`;
		if (time.M < 10) {
			time.M = `0${time.M}`;
		}
	}

	if (time.S < 10) {
		time.S = `0${time.S}`;
	}

	duration += `${time.M}:${time.S}`;

	return duration;
}

function timeStamp(label) {
	const timestamp = new Date().getTime();
	console.log(`TimeStamp ${label}`, timestamp);
}

const VideoList = () => {
	let videoL = [];
	const video = [];
	const videoList = [];

	const { youtubePlaylist, setYoutubePlaylist } = useContext(VideosContext);
	const { youtubePlaylistTitle, setYoutubePlaylistTitle } = useContext(
		VideosContext
	);
	const { videoIdList, setVideoIdList } = useContext(VideosContext);
	const { videosInformations, setVideosInformations } = useContext(
		VideosContext
	);
	const { videosFinalList, setVideosFinalList } = useContext(VideosContext);

	const [showPlayer, setShowPlayer] = useState(false);

	useEffect(() => {
		// buscando a playlist de vídeos

		async function fetchPlaylist() {
			try {
				const requestPlayList = await axios.get(
					`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2C%20contentDetails&maxResults=50&playlistId=${playlistId}&key=${ApiKey}`
				);
				/* setYoutubePlaylist(request.data.items.contentDetails.videoId) */
				setYoutubePlaylist(requestPlayList.data.items);
			} catch (err) {
				console.log('Erro: ', err.response?.data?.error);
			}
		}
		fetchPlaylist();
		// timeStamp('playlist');

		async function fetchPlaylistTitle() {
			try {
				const requestPlayListTitle = await axios.get(
					`https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&id=${playlistId}&key=${ApiKey}`
				);
				setYoutubePlaylistTitle(
					requestPlayListTitle.data.items[0].snippet.localized.title
				);
			} catch (err) {
				console.log('Erro: ', err.response?.data?.error);
			}
		}
		fetchPlaylistTitle();
		// timeStamp('title');
	}, []);

	useEffect(() => {
		// criando um array com os videosId da playlist de vídeos

		youtubePlaylist.map((vid) => {
			videoL = vid.contentDetails.videoId;
			videoList.push(videoL);
		});

		setVideoIdList(videoList);
	}, [youtubePlaylist]);

	useEffect(() => {
		/* buscando informações de cada vídeo da lista */
		const videoInfoList = [];

		videoIdList.map((vidInfo) => {
			async function fetchVideosInfo() {
				try {
					const requestVideoInfos = await axios.get(
						`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2C%20contentDetails%2C%20player&id=${vidInfo}&key=${ApiKey}`
					);

					videoInfoList.push(requestVideoInfos.data.items[0]);
				} catch (err) {
					console.log('Erro: ', err.response?.data?.error);
				}
			}
			fetchVideosInfo();
		});

		setVideosInformations(videoInfoList);
	}, [videoIdList]);

	// useEffect(() => {
	// 	setTimeout(() => {
	// 		const videosFinalList = [];
	// 		videosInformations.map((vid, index) => {
	// 			const url = youtubeUrlMaker(vid.id);
	// 			const duration = convertDuration(vid.contentDetails.duration);
	// 			const video = `&quot;num&quot;:${index},&quot;title&quot;:&quot;${vid.snippet.localized.title}&quot;,&quot;id&quot;:&quot;${vid.id}&quot;,&quot;duration&quot;:&quot;${duration}&quot;,&quot;video&quot;:&quot;${url};`;
	// 			videosFinalList.push(video);
	// 			setVideosFinalList(videosFinalList);
	// 		});
	// 	}, 500);
	// }, [videosInformations]);

	useEffect(() => {
		videosInformations.map((vid, index) => {
			const url = youtubeUrlMaker(vid.id);
			const durations = convertDuration(vid.contentDetails.duration);

			video.push({
				duration: durations,
				id: vid.id,
				num: index,
				played: false,
				title: vid.snippet.localized.title,
				video: url
			});
		});
		setVideosFinalList(video);// verificar se aqui está funcionando
	}, [videosInformations]);

	useEffect(() => {
		console.log('Koca: videosFinalList ', videosFinalList);
		setShowPlayer(true);
	}, [videosFinalList]);

	return (
		<>
			{showPlayer ? (
				<BrowserRouter basename='/react-videoplayer'>
					{' '}
					{/* usar o basename se o player for
							ficar em uma subpasta na  minha aplicação    */}
					<Switch>
						<Route exact path='/' component={WbnPlayer} />
						<Route
							exact
							path='/:activeVideo'
							component={WbnPlayer}
						/>
					</Switch>
					<GlobalStyle />{' '}
				</BrowserRouter>
			) : (
				<h1>Carregando...</h1>
			)}
		</>
	);
};

export default VideoList;
