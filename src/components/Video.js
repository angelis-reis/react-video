import React from 'react'
import ReactPlayer from 'react-player'
import StyledVideoWraper from "./styles/StyledVideoWraper" 
import StyledVideo from "./styles/StyledVideo" 

const Video = ({ active, autoplay, endCallback, progressCallback}) => (
        <StyledVideo>
            <StyledVideoWraper>
                <ReactPlayer
                    width="100%"
                    height="100%"
                    style = {{position: "absolute", top: "0"}}
                    playing = {true}
                    url = {active.video}
                    onEnd = {endCallback}
                    onProgress = {progressCallback}
                />
            </StyledVideoWraper>
        </StyledVideo>
)


export default Video