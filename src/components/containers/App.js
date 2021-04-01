import React, { useEffect, useState } from 'react'
import axios from "axios";
import WbnPlayer from './WbnPlayer'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import GlobalStyle from '../styles/GlobalStyle'


function youtubeUrlMaker(videoId) {


	const embed = "https://www.youtube.com/embed/"

	const id = "QH2-TGUlwu4"

	const youtubeUrl = embed.concat(videoId)


}

const App = () => {

	const [youtubePlaylist, setYoutubePlaylist] = useState([])	

	const [videoIdList, setVideoIdList] = useState([])

	const [videosInformations, setVideosInformations] = useState([])

	useEffect(() => {  /* buscando a playlist de vídeos */		

		async function fetchPlaylist(){
			try{
				/* const request =  await axios.get("https://youtube.googleapis.com/youtube/v3/playlistItems?part=id%2C%20contentDetails%2C%20status&maxResults=50&playlistId=PLAMoi5Bosmp0JjEmmRebON5Ai1MgS1qyf&key=AIzaSyCU6mKJFznpRYM-Qn5JIbNkjVqqPlflx4Q") */

				const request =  await axios.get("https://youtube.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&playlistId=PLAMoi5Bosmp0JjEmmRebON5Ai1MgS1qyf&key=AIzaSyCU6mKJFznpRYM-Qn5JIbNkjVqqPlflx4Q")

				/* setYoutubePlaylist(request.data.items.contentDetails.videoId) */

				setYoutubePlaylist(request.data.items)
				
			} 
			catch(err) {
				console.log("Erro: ", err.response?.data?.error) 
			}
		}
		fetchPlaylist()

		

		

	}, [])

	useEffect( () => {   /* criando um array com os videosId da playlist de vídeos */	

		/* console.log("youtubePlaylist: ", youtubePlaylist) */

		var video
		var videoList =[]

		youtubePlaylist.map((vid) =>{

			video =  vid.contentDetails.videoId
			videoList.push(video)
		})

		setVideoIdList(videoList)

		

	}, [youtubePlaylist])

	console.log('Koca:videoIdList ', videoIdList);


	useEffect( () => {   /* buscando informações de cada vídeo da lista */	


		/* console.log("youtubePlaylist: ", youtubePlaylist) */

		videoIdList.map((vidInfo) =>{

			async function fetchVideosInfo(){

				try{					
	
					const request =  await axios.get("https://youtube.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&playlistId=PLAMoi5Bosmp0JjEmmRebON5Ai1MgS1qyf&key=AIzaSyCU6mKJFznpRYM-Qn5JIbNkjVqqPlflx4Q")
	
					/* setYoutubePlaylist(request.data.items.contentDetails.videoId) */
	
					
					
				} 
				catch(err) {
					console.log("Erro: ", err.response?.data?.error) 
				}
			}
			
			fetchVideosInfo()


		})

		

		

	}, [videoIdList])

	

	

	
	
	
	return (

		<BrowserRouter basename="/react-videoplayer">   {/* usar o basename se o player for 
		ficar em uma subpasta na  minha aplicação    */}
			<>
			  <Switch>
				<Route exact path= "/" component={ WbnPlayer } />
				<Route exact path= "/:activeVideo" component={ WbnPlayer } />
			  </Switch> 
			  <GlobalStyle /> {/* ao chamar um componente globalStyle dentor do BrowserRouter eu aplico o stylo global em toda a aplicação  */}
			</>
		  </BrowserRouter>
	)
}

export default App;
