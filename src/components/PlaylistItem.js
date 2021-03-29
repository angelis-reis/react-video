import React from 'react'
import StyledPlaylistItem from './styles/StyledPlaylistItem'

const PlaylistItem = ({ video, active, played }) => (
        <StyledPlaylistItem active={ active } played={ played }>
            <div className="wbn-player__video-nr">
                {video.num}
            </div>
            <div className="wbn-player__video-title">
                {video.name}
            </div>
            <div className="wbn-player__video-duration">
                {video.timer}
            </div>
            
        </StyledPlaylistItem>
)


export default PlaylistItem