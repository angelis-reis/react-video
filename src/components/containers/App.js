import React, { useEffect, useState } from 'react'
import axios from "axios";
import WbnPlayer from './WbnPlayer'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import GlobalStyle from '../styles/GlobalStyle'

const App = () => {

	const [youtubePlaylist, setYoutubePlaylist] = useState([])
	

	useEffect(() => {  /* buscando a playlist de vídeos */
		
		async function fetchData(){
			try{
				const request =  await axios.get("https://youtube.googleapis.com/youtube/v3/playlistItems?part=id%2C%20contentDetails%2C%20status&maxResults=50&playlistId=PLAMoi5Bosmp0JjEmmRebON5Ai1MgS1qyf&key=AIzaSyCU6mKJFznpRYM-Qn5JIbNkjVqqPlflx4Q")

				setYoutubePlaylist(request.data)

			} 
			catch(err) {
				console.log("Erro: ", err.response?.data?.error) 
			}
		}
		fetchData()

	}, [])


	console.log('Koca: ',youtubePlaylist.items );

	
	

	


	
	
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
