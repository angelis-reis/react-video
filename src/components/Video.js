import React from 'react'
import ReactPlayer from 'react-player'
import styled from "styled-components";

const StyledVideo = styled.div`
  position: relative;
  -webkit-box-flex: 2;
  -ms-flex: 2 0 900px;
  flex: 2 0 900px;
  margin-right: 8px;

  @media screen and (max-width: 1200px) {
    width: 100%;
    display: block;
  }
`

const StyledVideoWraper = styled.div `
	width: 100%;
	padding-bottom: 56.25%;
	position: relative;
`

const Video = ({ active, autoplay, endCallback, progressCallback}) => (

	<StyledVideo>
		<StyledVideoWraper>
			<ReactPlayer
				width="100%"
				height="100%"
				style = {{position: "absolute", top: "0"}}
				playing = {autoplay}
				controls={true}
				url = {active.video}
				onEnded = {endCallback}
				onProgress = {progressCallback}
			/>
		</StyledVideoWraper>
	</StyledVideo>
)

export default Video