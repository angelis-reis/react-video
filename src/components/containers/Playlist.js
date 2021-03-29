import React from 'react'
import PlaylistHeader from '../PlaylistHeader'
import PlaylistItems from '../containers/PlaylistItems'
import NightMode from '../NightMode'
import StyledPlaylist from '../styles/StyledPlaylist'

const Playlist = ({ videos, active, nightModeCallback, nightMode }) => (

    <StyledPlaylist >  {/* ao envolver os componentes em um styledComponent eu aplico o stilo   nos componenetes */}

        <NightMode nightModeCallback={nightModeCallback} nightMode={nightMode} />
        <PlaylistHeader active={active} total={videos.length}/>
        <PlaylistItems video={videos} active={active} />

    </ StyledPlaylist >
)


export default Playlist