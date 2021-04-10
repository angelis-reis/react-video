import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { VideosContext } from './App';
import ApiKey from '../../sensitive/ApiKey';

const playlistId = 'PLXA_TifFgaBAu0l39GWyJVVr0azXpV9wz';

function youtubeUrlMaker(videoId) {
	const embed = 'https://www.youtube.com/embed/';
	const youtubeUrl = embed.concat(videoId);
	return youtubeUrl;
}

const VideoList = () => {
	const { youtubePlaylist, setYoutubePlaylist } = useContext(VideosContext);
	const { youtubePlaylistTitle, setYoutubePlaylistTitle } = useContext(
		VideosContext
	);
	const { videoIdList, setVideoIdList } = useContext(VideosContext);
	const { videosInformations, setVideosInformations } = useContext(
		VideosContext
	);
	const { videosFinalList, setVideosFinalList } = useContext(VideosContext);

	useEffect(() => {
		/* buscando a playlist de vídeos */

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

		async function fetchPlaylistTitle() {
			try {
				const requestPlayListTitle = await axios.get(
					`https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&id=${playlistId}&key=${ApiKey}`
				);

				/* setYoutubePlaylist(request.data.items.contentDetails.videoId) */
				setYoutubePlaylistTitle(
					requestPlayListTitle.data.items[0].snippet.localized.title
				);
			} catch (err) {
				console.log('Erro: ', err.response?.data?.error);
			}
		}
		fetchPlaylistTitle();
	}, []);

	useEffect(() => {
		/* criando um array com os videosId da playlist de vídeos */
		/* console.log("youtubePlaylist: ", youtubePlaylist) */
		var video;
		var videoList = [];
		youtubePlaylist.map((vid) => {
			video = vid.contentDetails.videoId;
			videoList.push(video);
		});
		setVideoIdList(videoList);
	}, [youtubePlaylist]);
	/* console.log('Koca:videoIdList ', videoIdList); */

	useEffect(() => {
		/* buscando informações de cada vídeo da lista */
		/* console.log("youtubePlaylist: ", youtubePlaylist) */

		var videoInfoList = [];

		videoIdList.map((vidInfo) => {
			async function fetchVideosInfo() {
				try {
					const requestVideoInfos = await axios.get(
						`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2C%20contentDetails%2C%20player&id=${vidInfo}&key=${ApiKey}`
					);
					/* setYoutubePlaylist(request.data.items.contentDetails.videoId) */
					/* console.log('Koca: requestVideoInfos ', requestVideoInfos.data.items[0]); */

					videoInfoList.push(requestVideoInfos.data.items[0]);
				} catch (err) {
					console.log('Erro: ', err.response?.data?.error);
				}
			}
			fetchVideosInfo();
			setVideosInformations(videoInfoList);
		});
	}, [videoIdList]);

	useEffect(() => {
		setTimeout(() => {
			const videosFinalList = [];

			videosInformations.map((vid, index) => {
				const url = youtubeUrlMaker(vid.id);
				const video = `&quot;num&quot;:${index},&quot;title&quot;:&quot;${vid.snippet.localized.title}&quot;,&quot;id&quot;:&quot;${vid.id}&quot;,&quot;duration&quot;:&quot;{ vid.contentDetails.duration }&quot;,&quot;video&quot;:&quot;${url};`;

				/* console.log('Koca: video ', video); */

				videosFinalList.push(video);

				setVideosFinalList(videosFinalList);
			});
		}, 500);
	}, [videosInformations]);

	/* console.log('Koca: videosFinalList ', videosFinalList); */

	console.log('Koca: YoutubePlaylistTitle ', youtubePlaylistTitle);

	return null;
};

export default VideoList;
